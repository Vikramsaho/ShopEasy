import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile data
    const fetchUser = async (authToken) => {
        try {
            const res = await axios.get('http://localhost:5000/profile', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            return res.data.user;
        } catch (error) {
            console.error('Fetch user error:', error);
            throw error;
        }
    };

    // Refresh user data (fetches and updates state)
    const refreshUser = useCallback(async () => {
        if (token) {
            try {
                const userData = await fetchUser(token);
                setUser(userData);
            } catch (error) {
                console.error('Refresh user error:', error);
            }
        }
    }, [token]);

    // Login function
    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/login', {
                email,
                password
            });

            const { token: newToken, user: userData } = res.data;

            // Store token in localStorage
            localStorage.setItem('token', newToken);

            // Merge guest cart into user cart before setting user
            const guestCartId = localStorage.getItem('guestCartId');
            if (guestCartId) {
                const guestCartKey = `cart_${guestCartId}`;
                const guestCartItems = localStorage.getItem(guestCartKey);
                if (guestCartItems) {
                    const userCartKey = `cart_${userData._id}`;
                    const existingUserCart = localStorage.getItem(userCartKey);
                    let userCartItems = existingUserCart ? JSON.parse(existingUserCart) : [];

                    // Merge logic
                    const mergedCart = [...userCartItems];
                    const parsedGuest = JSON.parse(guestCartItems);
                    parsedGuest.forEach(guestItem => {
                        const existingIndex = mergedCart.findIndex(item => item.id === guestItem.id);
                        if (existingIndex >= 0) {
                            mergedCart[existingIndex].quantity += guestItem.quantity;
                        } else {
                            mergedCart.push({ ...guestItem });
                        }
                    });

                    // Save merged cart
                    localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
                    // Clean up guest cart
                    localStorage.removeItem(guestCartKey);
                    localStorage.removeItem('guestCartId');
                }
            }

            // Set state
            setToken(newToken);
            setUser(userData);

            return { success: true, message: res.data.message };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            return { success: false, message };
        }
    };

    // Logout function
    const logout = () => {
        // Clear user's cart from localStorage
        const userCartKey = `cart_${user?._id}`;
        if (userCartKey) {
            localStorage.removeItem(userCartKey);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('guestCartId');
        setToken(null);
        setUser(null);
    };

    // Check authentication on mount
    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const userData = await fetchUser(token);
                    setUser(userData);
                } catch (error) {
                    // Token invalid or expired
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };

        initAuth();
    }, [token]);

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        fetchUser: () => fetchUser(token),
        refreshUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};