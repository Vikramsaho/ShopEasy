import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000';

const BuyNow = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: '/buy', 
          returnTo: state ? { product: state.product, cart: state.cart } : null 
        } 
      });
    }
  }, [isAuthenticated, navigate, state]);

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className={`p-8 rounded-xl shadow-lg text-center max-w-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Please login to continue with your purchase.
          </p>
          <button
            onClick={() => navigate('/login', { 
              state: { 
                from: '/buy', 
                returnTo: state ? { product: state.product, cart: state.cart } : null 
              } 
            })}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isDark
                ? 'bg-sky-600 hover:bg-sky-500 text-white'
                : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!state || (!state.product && !state.cart)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No product or cart data selected</p>
      </div>
    );
  }

  const { product, cart } = state;

  let items = [];
  let totalAmount = 0;
  let title = '';

  if (cart) {
    items = cart.items;
    totalAmount = parseFloat(cart.total) || 0;
    title = 'Cart Checkout';
  } else if (product) {
    items = [product];
    totalAmount = parseFloat(product.price) || 0;
    title = 'Single Item';
  }

  const paymentData = `upi://pay?pa=simmivishwakarma1910@okicici&pn=MyShop&am=${totalAmount.toFixed(2)}&cu=INR&tn=${title}`;

  const paymentOptions = [
    { id: 'upi', label: 'UPI / QR', icon: '📱' },
    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
    { id: 'card', label: 'Card Payment', icon: '💳' }
  ];

  const handleConfirmOrder = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const orderId = `ORD-${Date.now()}`;
      const orderDate = new Date().toISOString().split('T')[0];
      
      // Determine initial status based on payment method
      let initialStatus = 'Pending';
      if (paymentMethod === 'card') {
        initialStatus = 'Processing'; // Card payments are immediate
      }
      
      const orderData = {
        id: orderId,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price) || 0,
          quantity: item.quantity || 1,
          image: item.image
        })),
        total: totalAmount,
        paymentMethod: paymentMethod,
        status: initialStatus,
        date: orderDate,
        timestamp: Date.now(),
        // Include user reference
        user: user?._id || null,
        userEmail: user?.email || 'guest@example.com'
      };
      
      // Save to backend
      const response = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to create order');
      }
      
      console.log('Order saved:', result.data);
      setOrderConfirmed(true);
      
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message || 'Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPaymentContent = () => {
    switch(paymentMethod) {
      case 'upi':
        return (
          <div className="flex flex-col items-center">
            <p className={`mb-4 font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Scan QR to Pay</p>
            <div className={`p-4 rounded-lg shadow-inner ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
              <QRCodeCanvas value={paymentData} size={200} />
            </div>
            <p className={`text-sm mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Use Google Pay, PhonePe, or Paytm
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Amount: ₹{totalAmount.toFixed(2)}
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
              Status will update to "Processing" after payment confirmation
            </p>
          </div>
        );
      case 'cod':
        return (
          <div className="text-center">
            <div className={`rounded-lg p-6 ${isDark ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
              <p className="text-2xl mb-2">💵 Cash on Delivery</p>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Pay cash when your order is delivered
              </p>
                <div className={`border-t pt-4 ${isDark ? 'border-yellow-800' : 'border-yellow-200'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Amount to Pay</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  ₹{totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <p className={`text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Order status: Pending → Processing → Shipped → Delivered
            </p>
          </div>
        );
      case 'card':
        return (
          <div>
            <p className={`text-center mb-4 font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Credit / Debit Card</p>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>CVV</label>
                  <input
                    type="password"
                    placeholder="123"
                    className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border`}
                />
              </div>
              <div className={`rounded-lg p-4 ${isDark ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'} border`}>
                <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                  <strong>Secure Payment:</strong> Your card will be charged immediately. Order status will be "Processing".
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (orderConfirmed) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`p-8 rounded-xl shadow-lg text-center max-w-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-6xl mb-4">✅</div>
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Order Confirmed!</h1>
          <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Thank you for your order.
          </p>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            You will be redirected to your orders page shortly...
          </p>
          <button
            onClick={() => navigate('/orders')}
            className={`px-6 py-3 rounded-lg hover:transition-colors ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            View Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all ${
              isDark 
                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900' 
                : 'bg-gray-800 hover:bg-gray-700 text-yellow-500'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {paymentOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === option.id
                        ? isDark
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-blue-600 bg-blue-50'
                        : isDark
                          ? 'border-gray-700 hover:border-gray-600'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <p className={`text-sm mt-2 font-medium ${
                      paymentMethod === option.id 
                        ? isDark ? 'text-blue-400' : 'text-blue-600'
                        : isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h2 className="text-xl font-bold mb-4">{cart ? 'Cart Items' : 'Product Details'}</h2>
              <div className="space-y-4">
                {items.map((item) => {
                  const price = parseFloat(item.price) || 0;
                  const quantity = item.quantity || 1;
                  const itemTotal = price * quantity;
                  
                  return (
                  <div key={item.id} className={`flex items-center gap-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                      {cart && <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Quantity: {quantity}</p>}
                      <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ₹{itemTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h2 className="text-xl font-bold mb-4">Payment Details</h2>
              {renderPaymentContent()}
            </div>
          </div>

          <div>
            <div className={`rounded-xl p-6 sticky top-8 ${isDark ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {totalAmount > 500 ? <span className={isDark ? 'text-green-400' : 'text-green-600'}>Free</span> : '₹50'}
                  </span>
                </div>
                <div className={`pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Total</span>
                  <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ₹{(totalAmount + (totalAmount > 500 ? 0 : 50)).toFixed(2)}
                  </span>
                  </div>
                </div>
              </div>

              {error && (
                <p className={`text-sm text-center mt-4 mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  {error}
                </p>
              )}
              
              <button
                onClick={handleConfirmOrder}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isSubmitting
                    ? isDark
                      ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                      : 'bg-gray-400 cursor-not-allowed text-gray-100'
                    : isDark
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg'
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Order'}
              </button>

              <p className={`text-xs text-center mt-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                By confirming, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BuyNow;