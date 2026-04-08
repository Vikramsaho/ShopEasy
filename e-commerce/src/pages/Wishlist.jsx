import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { isDark } = useTheme();
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const removeItem = (id) => {
    removeFromWishlist(id);
  };

  const handleMoveToCart = (item) => {
    moveToCart(item.id, addToCart);
  };

  const handleCheckout = () => {
    if (wishlistItems.length === 0) {
      alert('Your wishlist is empty!');
      return;
    }
    
    // Move all items to cart
    wishlistItems.forEach(item => {
      addToCart(item, false);
    });
    
    // Clear wishlist
    wishlistItems.forEach(item => {
      removeFromWishlist(item.id);
    });
    
    navigate('/cart');
  };

  return (
    <main className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-sky-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className={`text-4xl sm:text-5xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your Wishlist
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className={`text-center py-20 rounded-2xl ${isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-sky-200'}`}>
            <svg className={`w-24 h-24 mx-auto mb-6 ${isDark ? 'text-gray-700' : 'text-sky-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your wishlist is empty</h2>
            <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Save items you love for later</p>
            <a href="/products" className={`inline-block px-8 py-3 rounded-full font-semibold transition-colors ${isDark ? 'bg-sky-600 hover:bg-sky-500 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'}`}>
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Wishlist Items */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {wishlistItems.map((item, index) => {
                  const price = parseFloat(item.price) || 0;
                  const originalPrice = item.originalPrice ? parseFloat(item.originalPrice) : null;
                  
                  return (
                  <article
                    key={item.id}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                      isDark 
                        ? 'bg-gray-900/50 border border-gray-800 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10' 
                        : 'bg-white border border-sky-200 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/20'
                    }`}
                    style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-20 ${
                        isDark 
                          ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                          : 'bg-red-100 text-red-500 hover:bg-red-200'
                      }`}
                      title="Remove from wishlist"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isDark ? 'hover:scale-105' : 'hover:scale-110'
                        }`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black/60 via-transparent' : 'from-sky-900/20 via-transparent'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <p className={`text-xs font-medium mb-2 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                        {item.category || 'Uncategorized'}
                      </p>
                      <h3 className={`font-bold text-lg mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </h3>
                      
                      {/* Price */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          ₹{price.toFixed(2)}
                        </span>
                        {originalPrice && originalPrice > price ? (
                          <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            ₹{originalPrice.toFixed(2)}
                          </span>
                        ) : null}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                            isDark
                              ? 'bg-sky-600 text-white hover:bg-sky-500'
                              : 'bg-sky-600 text-white hover:bg-sky-700'
                          }`}
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => navigate('/products')}
                          className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                            isDark
                              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </article>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className={`sticky top-28 rounded-2xl p-6 ${isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-sky-200 shadow-sm'}`}>
                <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Wishlist Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Items</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {wishlistItems.length}
                    </span>
                  </div>
                  <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-sky-100'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Total Value</span>
                      <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ₹{wishlistItems.reduce((total, item) => total + (parseFloat(item.price) || 0), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleCheckout}
                    className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white shadow-lg shadow-sky-500/20' 
                        : 'bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white shadow-lg shadow-sky-500/30'
                    }`}
                  >
                    Move All to Cart
                  </button>
                  <button 
                    onClick={() => {
                      wishlistItems.forEach(item => removeFromWishlist(item.id));
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isDark 
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Clear Wishlist
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800">
                  <a href="/products" className={`inline-flex items-center text-sm font-semibold ${
                    isDark 
                      ? 'text-sky-400 hover:text-sky-300' 
                      : 'text-sky-600 hover:text-sky-800'
                  }`}>
                    Continue Shopping
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default Wishlist;