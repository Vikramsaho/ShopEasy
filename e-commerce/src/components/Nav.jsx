import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { cartItems, getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { getWishlistCount } = useWishlist();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/product');
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return;

    // Check category match
    const categoryMatch = products.some(p =>
      p.productCategory.toLowerCase().includes(keyword)
    );

    if (categoryMatch) {
      navigate(`/products?category=${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Updated classes for Sky Blue theme
  const bgClass = isDark
    ? 'bg-black/80 border-gray-800/60'
    : 'bg-sky-50/90 border-sky-200/60';

  const textClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const textHoverClass = isDark ? 'hover:text-white' : 'hover:text-sky-800';
  const logoClass = isDark ? 'text-white' : 'text-sky-900';

  // Get user's first letter for avatar
  const getUserInitial = () => {
    if (user?.fullName) {
      return user.fullName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="w-full sticky top-0 z-50 overflow-x-hidden">
      {/* Top slim row */}
      <nav className={`h-10 ${bgClass} backdrop-blur-md border-b flex items-center justify-between px-3 sm:px-5 md:px-6 text-sm`}>
        <h1 className={`${logoClass} font-bold tracking-tight text-base sm:text-lg flex-shrink-0`}>
          ShopEasy
        </h1>

        <div className="flex items-center gap-3 sm:gap-5 md:gap-6 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`${textClass} ${textHoverClass} transition text-xs sm:text-sm flex items-center gap-1`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <Link to="/help" className={`${textClass} ${textHoverClass} transition text-xs sm:text-sm`}>
            Help
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center gap-2 ${textClass} ${textHoverClass} transition text-xs sm:text-sm`}
                onClick={() => setIsOpen(!isOpen)}

              > <a href="/profile" className='flex gap-2'>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-sky-600 text-white' : 'bg-sky-600 text-white'}`}>
                 {getUserInitial()}
                </div>
                <span className="hidden sm:inline">{user?.fullName?.split(' ')[0] || user?.email?.split('@')[0]}</span></a>
                              </button>
            
            </div>
          ) : (
            <>
              <Link to="/login" className={`${textClass} ${textHoverClass} transition text-xs sm:text-sm`}>
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-2 py-0.5 sm:px-3 sm:py-1 ${isDark ? 'bg-gray-700/70 hover:bg-gray-600/90 text-gray-200' : 'bg-sky-600 hover:bg-sky-700 text-white'} rounded text-xs sm:text-sm font-medium transition whitespace-nowrap`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main nav row */}
      <nav className={`h-16 ${bgClass} backdrop-blur-md border-b flex items-center px-3 sm:px-5 md:px-6 gap-3 sm:gap-4`}>
        <div className="flex-shrink-0">
          <Link to="/" className={`${logoClass} font-extrabold text-xl sm:text-2xl tracking-tight`}>
            ShopEasy
          </Link>
        </div>

        <div className="flex-1 flex justify-center min-w-0">
          <div className="w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px]">
            <div className={`flex border rounded-full overflow-hidden ${isDark ? 'border-gray-700 bg-gray-900/50' : 'border-sky-300 bg-white/80'} backdrop-blur-sm`}>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                className={`flex-1 min-0 bg-transparent ${
                  isDark ? 'text-gray-200 placeholder-gray-500' : 'text-gray-800 placeholder-gray-500'
                } px-3 py-2 text-sm outline-none`}
              />
              <button
                onClick={handleSearch}
                className={`${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-sky-600 hover:bg-sky-700 text-white'} px-3 sm:px-5 text-sm font-medium transition whitespace-nowrap`}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-5 lg:gap-7 text-sm lg:text-base font-medium whitespace-nowrap flex-shrink-0">
          <Link to="/" className={`${textClass} ${textHoverClass} hover:underline transition`}>Home</Link>
          <Link to="/products" className={`${textClass} ${textHoverClass} hover:underline transition`}>Products</Link>
          <Link to="/cart" className={`${textClass} ${textHoverClass} hover:underline transition relative`}>
            Cart
            <span className="absolute -top-2 -right-4 bg-sky-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>
          <Link to="/wishlist" className={`${textClass} ${textHoverClass} hover:underline transition relative`}>
            Wishlist
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {getWishlistCount()}
            </span>
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className={`${textClass} ${textHoverClass} hover:underline transition`}>Orders</Link>
          )}
          {isAuthenticated && (
            <Link to="/profile" className={`${textClass} ${textHoverClass} hover:underline transition`}>Profile</Link>
          )}
        </div>

        <div className="md:hidden flex-shrink-0">
          <button onClick={toggleMenu} className={`${textClass} ${textHoverClass} focus:outline-none`} aria-label="Toggle menu">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={toggleMenu}>
          <div
            className={`absolute top-[104px] right-0 h-[calc(100%-104px)] w-4/5 max-w-xs ${isDark ? 'bg-black/95 border-gray-800' : 'bg-sky-50/95 border-sky-200'} border-l transition-transform duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex flex-col gap-6 text-lg font-medium">
              <Link to="/" onClick={toggleMenu} className={`hover:underline ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-sky-800'} transition`}>Home</Link>
              <Link to="/products" onClick={toggleMenu} className={`hover:underline ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-sky-800'} transition`}>Products</Link>
              <Link to="/cart" onClick={toggleMenu} className={`hover:underline ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-sky-800'} transition`}>Cart</Link>
              <Link to="/wishlist" onClick={toggleMenu} className={`hover:underline ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-sky-800'} transition`}>Wishlist</Link>
              {isAuthenticated ? (
                <>
                   <Link to="/orders" onClick={toggleMenu} className={`${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-sky-800'} hover:underline transition`}>Orders</Link>
                   <Link to="/profile" onClick={toggleMenu} className={`${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-sky-800'} hover:underline transition`}>Profile</Link>
                  <button onClick={handleLogout} className={`${isDark ? 'text-red-400 hover:text-white' : 'text-red-600 hover:text-red-800'} transition text-left`}>
                    Logout
                  </button>
                </>
              ) : (
                 <Link to="/login" onClick={toggleMenu} className={`${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-sky-800'} hover:underline transition`}>Login</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;