import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { isDark } = useTheme();
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const cartData = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category
      })),
      subtotal: subtotal,
      shipping: shipping,
      discount: discount,
      total: total
    };
    
    navigate('/buy', { state: { cart: cartData } });
  };

  return (
    <main className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-sky-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className={`text-4xl sm:text-5xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your Cart
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className={`text-center py-20 rounded-2xl ${isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-sky-200'}`}>
            <svg className={`w-24 h-24 mx-auto mb-6 ${isDark ? 'text-gray-700' : 'text-sky-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your cart is empty</h2>
            <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Looks like you haven't added anything yet</p>
            <a href="/products" className={`inline-block px-8 py-3 rounded-full font-semibold transition-colors ${isDark ? 'bg-sky-600 hover:bg-sky-500 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'}`}>
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => {
                const price = parseFloat(item.price) || 0;
                const itemTotal = price * item.quantity;
                
                return (
                <article
                  key={item.id}
                  className={`group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-900/50 border border-gray-800 hover:border-gray-700' 
                      : 'bg-white border border-sky-200 hover:border-sky-300 shadow-sm'
                  }`}
                >
                  <div className="flex gap-4 sm:gap-6">
                    <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-sky-50'}`}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className={`font-bold text-lg sm:text-xl mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Category: {item.category || 'N/A'}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-500 hover:text-red-400' : 'hover:bg-red-50 text-gray-400 hover:text-red-500'}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-4 sm:mt-6">
                        {/* Quantity Controls */}
                        <div className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-sky-200 bg-sky-50'}`}>
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-lg font-bold transition-colors ${
                              isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                            }`}
                          >
                            -
                          </button>
                          <span className={`text-sm font-bold min-w-[2rem] text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => incrementQuantity(item.id)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-lg font-bold transition-colors ${
                              isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                            }`}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                      <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ₹{itemTotal.toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          ₹{price.toFixed(2)} each
                        </p>
                      )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className={`sticky top-28 rounded-2xl p-6 ${isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-sky-200 shadow-sm'}`}>
                <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Order Summary
                </h2>

                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className={`flex-1 px-4 py-3 rounded-lg text-sm transition-colors ${
                        isDark 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-sky-500' 
                          : 'bg-sky-50 border-sky-300 text-gray-900 placeholder-gray-500 focus:border-sky-500'
                      } border outline-none`}
                    />
                    <button
                      onClick={applyPromo}
                      className={`px-5 py-3 rounded-lg font-semibold text-sm transition-colors ${
                        isDark 
                          ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                          : 'bg-sky-100 hover:bg-sky-200 text-sky-700'
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className={`mt-2 text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      Promo code applied! 10% off
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {shipping === 0 ? (
                        <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Free</span>
                      ) : (
                        `₹${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Discount</span>
                      <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        -₹{discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-sky-100'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Total</span>
                      <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                onClick={handleCheckout}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white shadow-lg shadow-sky-500/20' 
                    : 'bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white shadow-lg shadow-sky-500/30'
                }`}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;