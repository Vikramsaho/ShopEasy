// src/components/Signup.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Signup = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      calculateStrength(value);
    }
  };

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return isDark ? 'bg-red-500' : 'bg-red-500';
    if (passwordStrength === 2) return isDark ? 'bg-amber-500' : 'bg-amber-500';
    if (passwordStrength === 3) return isDark ? 'bg-emerald-500' : 'bg-emerald-500';
    return isDark ? 'bg-green-500' : 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      alert('You must agree to the terms');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'Failed to create account');
      }

      const data = await response.json();
      console.log('signup response', data);
      // clear form or redirect
      alert('Account created successfully');
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error(error);
      alert('Unable to create account: ' + error.message);
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
            <h2 className={`text-3xl sm:text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Create Account
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <a href="/login" className={`font-semibold ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                Sign in
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-300 ${
                    focusedField === 'fullName' ? 'ring-2 ring-blue-500' : ''
                  } ${isDark 
                    ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                    : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phoneNumber')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-300 ${
                    focusedField === 'phoneNumber' ? 'ring-2 ring-blue-500' : ''
                  } ${isDark 
                    ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                    : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="+91987456321"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-300 ${
                  focusedField === 'email' ? 'ring-2 ring-blue-500' : ''
                } ${isDark 
                  ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                  : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className={`relative rounded-xl overflow-hidden transition-all duration-300 ${focusedField === 'password' ? 'ring-2 ring-blue-500' : ''}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 pr-12 rounded-xl text-base outline-none ${
                    isDark 
                      ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                      : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <svg className={`w-5 h-5 ${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Password strength</span>
                    <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{getStrengthLabel()}</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i < passwordStrength ? getStrengthColor() : isDark ? 'bg-gray-800' : 'bg-blue-100'}`}></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-300 ${
                  focusedField === 'confirmPassword' ? 'ring-2 ring-blue-500' : ''
                } ${isDark 
                  ? 'bg-gray-900 border border-gray-800 text-white placeholder-gray-500' 
                  : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="Confirm your password"
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-2 border-blue-500 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I agree to the{' '}
                <a href="/terms" className={`font-semibold ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className={`font-semibold ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreedToTerms}
              className={`hover:cursor-pointer w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                agreedToTerms
                  ? isDark 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30'
                  : isDark
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Create Account
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
            Create your account and start shopping with exclusive member benefits.
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
                <p className="font-semibold">Order History</p>
                <p className="text-sm text-white/60">Track all your orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;