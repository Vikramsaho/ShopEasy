import React, {useState} from "react";
import { useTheme } from '../context/ThemeContext';

const ProductForm = () => {
  const { isDark } = useTheme();
    const [formData, setFormData] = useState({
    
      productImage: '',
      productTitle: '',
      productCategory: '',
      productPrice: '',
      productDescription: '',
    
    });


    const [focusedField, setFocusedField] = useState(null);
   
    
   
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === 'productImage') {
        setFormData(prev => ({ ...prev, productImage: files[0] || '' }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    };
  
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      formPayload.append('productTitle', formData.productTitle);
      formPayload.append('productCategory', formData.productCategory);
      formPayload.append('productPrice', formData.productPrice);
      formPayload.append('productDescription', formData.productDescription);
      if (formData.productImage) {
        formPayload.append('productImage', formData.productImage);
      }

      const response = await fetch('http://localhost:5000/product', {
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) {
        let errMsg = 'Failed to upload product';
        const bodyText = await response.text();

        if (bodyText) {
          try {
            const errJson = JSON.parse(bodyText);
            errMsg = errJson.error || errJson.message || JSON.stringify(errJson);
          } catch {
            errMsg = bodyText;
          }
        }

        throw new Error(errMsg);
      }

      const data = await response.json();
      console.log('Product Sending response', data);
      alert('Product Uploaded successfully');
      setFormData({
        productImage: '',
      productTitle: '',
      productCategory: '',
      productPrice: '',
      productDescription: '',
      });
    } catch (error) {
      console.error(error);
      const message = error && error.message ? error.message : JSON.stringify(error);
      alert('Unable to upload product: ' + message);
    }
    
  };
  
    return (
      <main className={`min-h-screen flex ${isDark ? 'bg-black' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'}`}>
        {/* Left Panel - Form */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-12 ${isDark ? 'bg-black' : ''}`}>
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-10">
              <h1 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-blue-900'}`}>ShopEasy</h1>
            </div>
  
            <div className="mb-10">
              <h2 className={`text-2xl sm:text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Product Form for Sellers
              </h2>
              <h1 className={`text-2xl text-center sm:text-4xl font-black mb-3 ${isDark ? 'text-blue-800' : 'text-gray-900'}`}>Details Here</h1>
            </div>
  
            <form  className="space-y-5" onSubmit={handleSubmit}>
              
  
                {/* Product Details */}
              <div>
                <label htmlFor="productImage" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Product Image 
                </label>
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  onChange={handleChange}
                  onFocus={() => setFocusedField('productImage')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-300 ${
                    focusedField === 'productImage' ? 'ring-2 ring-blue-500' : ''
                  } ${isDark 
                    ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                    : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                  }`}
                  required
                />
              </div>
              <div>
                <label htmlFor="productTitle" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Product Title
                </label>
                <input
                  type="text"
                  id="productTitle"
                  name="productTitle"
                  value={formData.productTitle}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('productTitle')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-300 ${
                    focusedField === 'productTitle' ? 'ring-2 ring-blue-500' : ''
                  } ${isDark 
                    ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                    : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Awesome Gadget"
                  required
                />
              </div>
              <div>
                <label htmlFor="productCategory" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </label>
                <input
                  type="text"
                  id="productCategory"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('productCategory')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-300 ${
                    focusedField === 'productCategory' ? 'ring-2 ring-blue-500' : ''
                  } ${isDark 
                    ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                    : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Electronics"
                  required
                />
              </div>
              <div>
                <label htmlFor="productPrice" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="productPrice"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('productPrice')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-300 ${
                    focusedField === 'productPrice' ? 'ring-2 ring-blue-500' : ''
                  } ${isDark 
                    ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                    : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="99.99"
                  required
                />
              </div>
              <div>
                <label htmlFor="productDescription" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('productDescription')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-300 ${
                    focusedField === 'productDescription' ? 'ring-2 ring-blue-500' : ''
                  } ${isDark 
                    ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                    : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Write a short description"
                  rows={3}
                  required
                ></textarea>
              </div>
              
              {/* Submit */}
              <button
                type="submit"
                
                className={`hover:cursor-pointer w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                
                     isDark 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30'
                  
                }`}
              >
                Upload Product
              </button>
            </form>
  
            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className={`flex-1 h-px ${isDark ? 'bg-gray-800' : 'bg-blue-200'}`}></div>
              <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>or sign up with</span>
              <div className={`flex-1 h-px ${isDark ? 'bg-gray-800' : 'bg-blue-200'}`}></div>
            </div>
  
            {/* Social Login */}
            <div className="grid grid-cols-3 gap-4">
              <button className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-900 border border-gray-800 text-white hover:bg-gray-800' 
                  : 'bg-white border border-blue-200 text-gray-700 hover:bg-blue-50'
              }`}>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-900 border border-gray-800 text-white hover:bg-gray-800' 
                  : 'bg-white border border-blue-200 text-gray-700 hover:bg-blue-50'
              }`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </button>
              <button className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-900 border border-gray-800 text-white hover:bg-gray-800' 
                  : 'bg-white border border-blue-200 text-gray-700 hover:bg-blue-50'
              }`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        {/* Right Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-bl from-blue-900/40 via-black to-black' : 'bg-gradient-to-bl from-blue-600 via-blue-700 to-blue-900'}`}></div>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-40 right-20 w-80 h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            <h1 className="text-5xl font-black mb-6 tracking-tight">
              Join ShopEasy
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-md">
              Create your account and start selling your Product and become exclusive member with benefits.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Exclusive Deals</p>
                  <p className="text-sm text-white/60">Members-only discounts</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Fast Checkout</p>
                  <p className="text-sm text-white/60">Save your preferences</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Sell Products</p>
                  <p className="text-sm text-white/60">Track all your Products.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };

export default ProductForm;