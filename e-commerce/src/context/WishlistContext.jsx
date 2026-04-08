import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Get wishlist key based on user
  const getWishlistKey = useCallback(() => {
    if (user?._id) {
      return `wishlist_${user._id}`;
    }
    return 'wishlist_guest';
  }, [user]);

  // Initialize wishlist on mount and handle user changes
  useEffect(() => {
    if (!initialized) {
      const wishlistKey = getWishlistKey();
      const savedWishlist = localStorage.getItem(wishlistKey);
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('Error parsing wishlist data:', error);
          setWishlistItems([]);
        }
      } else {
        setWishlistItems([]);
      }
      setInitialized(true);
    } else {
      // After initial load, handle user changes (login/logout)
      const currentKey = getWishlistKey();
      const savedWishlist = localStorage.getItem(currentKey);
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('Error parsing wishlist data:', error);
          setWishlistItems([]);
        }
      } else {
        setWishlistItems([]);
      }
    }
  }, [getWishlistKey, initialized]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (initialized) {
      const wishlistKey = getWishlistKey();
      localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, getWishlistKey, initialized]);

  // Merge guest wishlist into user wishlist when user logs in
  useEffect(() => {
    if (user?._id && initialized) {
      const userWishlistKey = `wishlist_${user._id}`;
      const guestWishlistKey = 'wishlist_guest';
      
      const guestWishlist = localStorage.getItem(guestWishlistKey);
      const userWishlist = localStorage.getItem(userWishlistKey);
      
      if (guestWishlist && guestWishlist !== userWishlist) {
        const parsedGuest = JSON.parse(guestWishlist);
        let mergedWishlist = parsedGuest;
        
        if (userWishlist) {
          const parsedUser = JSON.parse(userWishlist);
          // Merge: combine both lists, avoiding duplicates
          const allItems = [...parsedUser, ...parsedGuest];
          const uniqueItems = allItems.filter((item, index, self) =>
            index === self.findIndex(i => i.id === item.id)
          );
          mergedWishlist = uniqueItems;
        }
        
        // Save merged wishlist to user account
        localStorage.setItem(userWishlistKey, JSON.stringify(mergedWishlist));
        localStorage.removeItem(guestWishlistKey);
        
        // Update state with merged wishlist
        setWishlistItems(mergedWishlist);
      }
    }
  }, [user, initialized]);

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlistItems(items => {
      // Check if item already exists
      const exists = items.some(item => item.id === product.id);
      if (exists) {
        return items;
      }
      return [...items, { ...product, addedAt: new Date().toISOString() }];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Toggle item in wishlist
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  // Move item from wishlist to cart (requires cart context)
  const moveToCart = useCallback((productId, addToCartFn) => {
    const item = wishlistItems.find(i => i.id === productId);
    if (item) {
      addToCartFn(item);
      removeFromWishlist(productId);
      return true;
    }
    return false;
  }, [wishlistItems, removeFromWishlist]);

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    getWishlistCount,
    moveToCart
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};