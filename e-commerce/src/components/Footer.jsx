// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', path: '/products' },
      { name: 'Best Sellers', path: '/products' },
      { name: 'Sale', path: '/products' },
      { name: 'Collections', path: '/products' },
    ],
    support: [
      { name: 'Contact Us', path: '/help' },
      { name: 'FAQs', path: '/help' },
      { name: 'Shipping Info', path: '/help' },
      { name: 'Returns', path: '/help' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Affiliates', path: '/affiliates' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  };

  return (
    <footer className={`w-full overflow-hidden ${isDark ? 'bg-black border-t border-gray-800' : 'bg-sky-50 border-t border-sky-200'}`}>
      
      {/* Newsletter Section */}
      <div className={`border-b ${isDark ? 'border-gray-800' : 'border-sky-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Subscribe to our newsletter
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Get the latest updates on new products and upcoming sales.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={`flex-1 md:w-64 px-5 py-3 rounded-lg outline-none transition-colors ${
                  isDark 
                    ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-sky-500' 
                    : 'bg-white border border-sky-200 text-gray-900 placeholder-gray-400 focus:border-sky-500'
                }`}
              />
              <button className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isDark 
                  ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-500/20' 
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-sky-900'}`}>
              ShopEasy
            </Link>
            <p className={`mt-4 text-sm max-w-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Your one-stop shop for premium products at unbeatable prices. Quality guaranteed.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isDark 
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' 
                      : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
                  }`}
                >
                  {social === 'facebook' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>}
                  {social === 'twitter' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.44,4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96,1.32-2.02-.88.52-1.86.9-2.9,1.1-.82-.88-2-1.43-3.3-1.43-2.5,0-4.55,2.04-4.55,4.54,0,.36.03.7.1,1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6,1.45-.6,2.3,0,1.56.8,2.95,2,3.77-.74-.03-1.44-.23-2.05-.57v.06c0,2.2,1.56,4.03,3.64,4.44-.67.2-1.37.2-2.06.08.58,1.8,2.26,3.12,4.25,3.16C5.78,18.1,3.37,18.74,1,18.46c2,1.3,4.4,2.04,6.97,2.04,8.35,0,12.92-6.92,12.92-12.93,0-.2,0-.4-.02-.6.9-.63,1.96-1.22,2.56-2.14Z"/></svg>}
                  {social === 'instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58.01,4.85.07,1.17.05,1.8.25,2.23.41.56.22.96.48,1.38.9.42.42.68.82.9,1.38.16.43.36,1.06.41,2.23.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.05,1.17-.25,1.8-.41,2.23-.22.56-.48.96-.9,1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68,1.38-.9.43-.16,1.06-.36,2.23-.41C8.42,2.17,8.8,2.16,12,2.16M12,0C8.74,0,8.33.01,7.05.07,5.78.13,4.9.33,4.14.63c-.78.3-1.44.71-2.09,1.37C1.39,2.65.98,3.31.68,4.09.38,4.85.18,5.73.12,7.01.06,8.28.05,8.7.05,12s.01,3.72.07,4.99c.06,1.28.26,2.16.56,2.92.3.78.71,1.44,1.37,2.09.65.65,1.31,1.06,2.09,1.37.76.3,1.64.5,2.92.56,1.28.06,1.69.07,4.99.07s3.72-.01,4.99-.07c1.28-.06,2.16-.26,2.92-.56.78-.3,1.44-.71,2.09-1.37.65-.65,1.06-1.31,1.37-2.09.3-.76.5-1.64.56-2.92.06-1.28.07-1.69.07-4.99s-.01-3.72-.07-4.99c-.06-1.28-.26-2.16-.56-2.92-.3-.78-.71-1.44-1.37-2.09-.65-.65-1.31-1.06-2.09-1.37-.76-.3-1.64-.5-2.92-.56C15.72.01,15.3,0,12,0Z"/><path d="M12,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"/><circle cx="18.41" cy="5.59" r="1.44"/></svg>}
                  {social === 'youtube' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.56,31.56,0,0,0,0,12a31.56,31.56,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14c1.84.55,9.38.55,9.38.55s7.54,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.56,31.56,0,0,0,24,12,31.56,31.56,0,0,0,23.5,6.19ZM9.55,15.57V8.43L15.82,12Z"/></svg>}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-sky-700'}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-sky-700'}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-sky-700'}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-sky-700'}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className={`border-t ${isDark ? 'border-gray-800' : 'border-sky-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              &copy; 2026 ShopEasy. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="https://img.icons8.com/color/48/apple-pay.png" alt="Apple Pay" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;