import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const API_BASE_URL = 'http://localhost:5000';

const Profile = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hover, setHover] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();
  const { user, loading, logout, fetchUser } = useAuth();
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  // Fetch user orders (user-specific)
  const fetchUserOrders = async (authToken) => {
    try {
      setLoadingOrders(true);
      const response = await fetch(`${API_BASE_URL}/order/my-orders`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const result = await response.json();
      
      if (response.ok && result.success) {
        setUserOrders(result.data);
      } else {
        console.error('Failed to fetch orders:', result.message);
        setUserOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setUserOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Upload profile image
  const uploadProfileImage = async (imageUrl) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/profile/upload-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ imageUrl })
      });
      
      const result = await response.json();
      if (response.ok && result.success) {
        // Update user in AuthContext
        await fetchUser(token);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return { success: false, message: 'Failed to upload image' };
    }
  };

  // Handle image file selection
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert image to base64 (in production, upload to cloud storage)
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Image = event.target?.result;
      setImageUploading(true);
      const result = await uploadProfileImage(base64Image);
      setImageUploading(false);
      
      if (result.success) {
        alert('Profile image updated successfully!');
      } else {
        alert('Failed to update image: ' + result.message);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else {
        // Initialize edit form with user data
        setEditForm({
          fullName: user.fullName || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || ''
        });
        // Fetch user orders
        const token = localStorage.getItem('token');
        if (token) {
          fetchUserOrders(token);
        }
      }
    }
  }, [user, loading, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: editForm.fullName,
          phoneNumber: editForm.phoneNumber
        })
      });
      
      const result = await response.json();
      if (response.ok && result.success) {
        // Update user in AuthContext
        await fetchUser(token);
        setEditMode(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get items from wishlist that are not in cart
  const getWishlistItemsNotInCart = () => {
    return wishlistItems.filter(wishlistItem => {
      return !cartItems.some(cartItem => cartItem.id === wishlistItem.id);
    });
  };

  // Handle moving item from wishlist to cart
  const handleMoveToCart = (wishlistItem) => {
    addToCart({
      id: wishlistItem.id,
      price: wishlistItem.price,
      name: wishlistItem.name,
      image: wishlistItem.image,
      category: wishlistItem.category
    });
    removeFromWishlist(wishlistItem.id);
  };

  if (loading) {
    return (
      <main className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-sky-100'}`}>
        <div className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Loading profile...</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const buttonStyle = {
    width: hover ? "120px" : "40px",
    height: "40px",
    borderRadius: hover ? "50px" : "50%",
    backgroundColor: isDark ? hover ? "rgb(69, 205, 255)" : "rgb(66, 63, 63)" : hover ? "rgb(69, 205, 255)" : "rgb(155, 105, 105)",
    border: "none",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.164)",
    cursor: "pointer",
    transition: "all 0.3s",
    overflow: "hidden",
    position: "relative",
    textDecoration: "none",
    padding: "0 10px",
  };

  const iconStyle = {
    width: hover ? "20px" : "17px",
    transition: "0.3s",
    transform: hover ? "rotate(360deg)" : "rotate(0deg)",
  };

  const pathStyle = {
    fill: "white",
  };

  const textStyle = {
    color: "white",
    fontSize: hover ? "13px" : "0px",
    marginRight: hover ? "8px" : "0px",
    opacity: hover ? 1 : 0,
    transition: "0.3s",
    whiteSpace: "nowrap",
  };

  // Use real user data from AuthContext with profile image
  const userData = {
    name: user.fullName || 'N/A',
    email: user.email || 'N/A',
    phone: user.phoneNumber || 'N/A',
    location: "New York, USA",
    memberSince: "Jan 2023",
    avatar: user.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  };

  // Calculate stats from real orders
  const totalOrders = userOrders.length;
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  
  // Get wishlist items not in cart for stats
  const wishlistItemsNotInCart = getWishlistItemsNotInCart();
  
  const stats = [
    { label: "Total Orders", value: totalOrders.toString(), icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )},
    { label: "Wishlist Items", value: wishlistItemsNotInCart.length.toString(), icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )},
    { label: "Pending Deliveries", value: userOrders.filter(o => o.status === 'Pending' || o.status === 'Processing').length.toString(), icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )},
    { label: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  // Format orders for display
  const formatOrderDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700';
      case 'Processing': return isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700';
      case 'Shipped': return isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-700';
      case 'Pending': return isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700';
      case 'Returned': return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700';
      default: return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700';
    }
  };

  const recentOrders = userOrders.map(order => ({
    id: order.id,
    date: formatOrderDate(order.date),
    status: order.status,
    total: `₹${order.total.toLocaleString()}`,
    items: order.items.reduce((sum, item) => sum + item.quantity, 0)
  }));

  // Render wishlist items
  const renderWishlistItems = () => {
    if (wishlistItemsNotInCart.length === 0) {
      return (
        <div className="text-center py-12">
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No items in wishlist</p>
          <button 
            onClick={() => navigate('/products')}
            className={`mt-4 px-6 py-2 rounded-lg font-medium ${isDark ? 'bg-sky-600 text-white hover:bg-sky-500' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
          >
            Browse Products
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {wishlistItemsNotInCart.map((item, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-xl flex items-center gap-4 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-sky-50 border border-sky-100'}`}
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Category: {item.category || 'N/A'}
              </p>
              <p className={`text-xl font-black mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ₹{item.price.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleMoveToCart(item)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${isDark ? 'bg-sky-600 text-white hover:bg-sky-500' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
              >
                Move to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${isDark ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render settings tab
  const renderSettings = () => (
    <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-sky-200 shadow-sm'}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Account Settings</h3>
        {!editMode && (
          <button 
            onClick={() => setEditMode(true)}
            className={`text-sm font-semibold ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-sky-600 hover:text-sky-700'}`}
          >
            Edit Profile
          </button>
        )}
      </div>
      {!editMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Full Name</label>
            <p className={`mt-1 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{userData.name}</p>
          </div>
          <div>
            <label className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email Address</label>
            <p className={`mt-1 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{userData.email}</p>
          </div>
          <div>
            <label className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Phone</label>
            <p className={`mt-1 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{userData.phone}</p>
          </div>
          <div>
            <label className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Location</label>
            <p className={`mt-1 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{userData.location}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={editForm.fullName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700 text-white' 
                  : 'bg-white border border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleInputChange}
              disabled
              className={`w-full px-3 py-2 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700 text-gray-500' 
                  : 'bg-gray-100 border border-gray-300 text-gray-500'
              }`}
            />
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email cannot be changed</p>
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
            <input
              type="tel"
              name="phoneNumber"
              value={editForm.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700 text-white' 
                  : 'bg-white border border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                isDark 
                  ? 'bg-sky-600 hover:bg-sky-500 text-white' 
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <main className={`min-h-screen ${isDark ? 'bg-black' : 'bg-sky-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Profile Card */}
          <aside className="lg:col-span-3">
            <div className={`sticky top-28 rounded-2xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-sky-200 shadow-sm'}`}>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    src={userData.avatar} 
                    alt="User Avatar" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-sky-500 shadow-lg"
                  />
                  <label 
                    htmlFor="profile-image-upload"
                    className={`absolute bottom-0 right-0 w-8 h-8 bg-sky-500 hover:bg-sky-600 border-2 ${isDark ? 'border-gray-900' : 'border-white'} rounded-full flex items-center justify-center cursor-pointer transition-colors`}
                    title="Change profile picture"
                  >
                    {imageUploading ? (
                      <span className="text-xs text-white">...</span>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </label>
                  <input
                    type="file"
                    id="profile-image-upload"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={imageUploading}
                  />
                  <span className="absolute bottom-0 right-8 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                </div>
                {!editMode ? (
                  <>
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{userData.name}</h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{userData.email}</p>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{userData.phone}</p>
                    <span className={`mt-2 text-xs px-3 py-1 rounded-full ${isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-700'}`}>
                      Premium Member
                    </span>
                    <button
                      style={buttonStyle}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      onClick={() => setEditMode(true)}
                      className='m-3'
                    >
                      <span style={textStyle}>Edit</span>
                      <svg
                        style={iconStyle}
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          style={pathStyle}
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleEditSubmit} className="w-full space-y-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={editForm.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-lg text-sm ${
                          isDark 
                            ? 'bg-gray-800 border border-gray-700 text-white' 
                            : 'bg-white border border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        disabled
                        className={`w-full px-3 py-2 rounded-lg text-sm ${
                          isDark 
                            ? 'bg-gray-800 border border-gray-700 text-gray-500' 
                            : 'bg-gray-100 border border-gray-300 text-gray-500'
                        }`}
                      />
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email cannot be changed</p>
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={editForm.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-lg text-sm ${
                          isDark 
                            ? 'bg-gray-800 border border-gray-700 text-white' 
                            : 'bg-white border border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                          isDark 
                            ? 'bg-sky-600 hover:bg-sky-500 text-white' 
                            : 'bg-sky-600 hover:bg-sky-700 text-white'
                        }`}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                          isDark 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-8 space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { id: 'orders', label: 'My Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                  { id: 'wishlist', label: 'Wishlist', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                  { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? isDark ? 'bg-sky-600 text-white' : 'bg-sky-600 text-white'
                        : isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-sky-50 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Logout Button */}
              <div className="mt-8 pt-6 border-t border-gray-800 dark:border-gray-800">
                <button onClick={handleLogout} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-500 hover:bg-red-50'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="lg:col-span-9 space-y-8">
            
            {/* Welcome Banner */}
            <div className={`rounded-2xl p-6 sm:p-8 ${isDark ? 'bg-gradient-to-r from-sky-900/40 to-gray-900 border border-gray-800' : 'bg-gradient-to-r from-sky-600 to-sky-500'}`}>
              <h1 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-white'}`}>
                Welcome back, {userData.name.split(' ')[0]}!
              </h1>
              <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-sky-100'}`}>
                Here's what's happening with your account today.
              </p>
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className={`rounded-2xl p-5 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-sky-200 shadow-sm'}`}>
                      <div className={`inline-flex p-2 rounded-lg mb-3 ${isDark ? 'bg-gray-800 text-sky-400' : 'bg-sky-50 text-sky-600'}`}>
                        {stat.icon}
                      </div>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-sky-200 shadow-sm'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Orders</h3>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className={`text-sm font-semibold ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-sky-600 hover:text-sky-700'}`}
                    >
                      View All
                    </button>
                  </div>
                  {loadingOrders ? (
                    <div className="text-center py-8">
                      <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Loading orders...</p>
                    </div>
                  ) : userOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No orders yet</p>
                      <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Start shopping to see your orders here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentOrders.map((order, idx) => (
                        <div key={idx} className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-sky-50 border border-sky-100'}`}>
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                              <svg className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <div>
                              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.id}</p>
                              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{order.date} - {order.items} items</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-sky-200 shadow-sm'}`}>
                <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>My Wishlist</h3>
                {renderWishlistItems()}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && renderSettings()}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-sky-200 shadow-sm'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>All Orders</h3>
                </div>
                {loadingOrders ? (
                  <div className="text-center py-8">
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Loading orders...</p>
                  </div>
                ) : userOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No orders yet</p>
                    <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Start shopping to see your orders here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order, idx) => (
                      <div key={idx} className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-sky-50 border border-sky-100'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                            <svg className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div>
                            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.id}</p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{order.date} - {order.items} items</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;