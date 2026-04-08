import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { isDark } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/product');
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Home page products fetch error:', error);
        setError(error.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sort by newest first
  const sortedProducts = [...products].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
    return dateB - dateA;
  });

  // Show at least 12 products if available, otherwise show all (minimum 4 if possible)
  const displayProducts = sortedProducts.slice(0, Math.min(12, products.length));

  if (loading) {
    return (
      <main className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-sky-50 to-blue-100'}`}>
        <div className="text-center">
          <div className={`w-16 h-16 border-4 ${isDark ? 'border-sky-500' : 'border-sky-600'} border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
          <p className={`text-xl font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Loading products...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-sky-50 to-blue-100'}`}>
        <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl max-w-md text-center`}>
          <div className="text-4xl mb-4">⚠️</div>
          <p className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Oops!</p>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-sky-50 via-white to-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Banner - Modern Gradient */}
        <div className={`relative overflow-hidden rounded-3xl p-8 md:p-16 mb-16 transition-all duration-500 ${isDark ? 'bg-gradient-to-br from-gray-900 via-sky-900/20 to-gray-900 border border-gray-800 shadow-2xl' : 'bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 shadow-2xl shadow-sky-500/30'}`}>
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-sky-500/10' : 'bg-white/15'}`}></div>
            <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-cyan-500/10' : 'bg-blue-400/15'}`}></div>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl ${isDark ? 'bg-purple-500/5' : 'bg-white/5'}`}></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className={`inline-block px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 ${isDark ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-white/25 text-white border border-white/30 backdrop-blur-sm'}`}>
                ✨ New Collection 2024
              </span>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 ${isDark ? 'text-white' : 'text-white'}`}>
                DISCOVER YOUR
                <span className={`block ${isDark ? 'text-sky-400' : 'text-yellow-300'}`}>STYLE</span>
              </h1>
              <p className={`text-lg md:text-xl mb-10 max-w-xl ${isDark ? 'text-gray-300' : 'text-sky-100'}`}>
                Explore our curated collection of premium products. Quality meets affordability in every item we offer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-white text-sky-700 hover:bg-gray-50 shadow-xl'}`}
                >
                  Shop Now →
                </Link>
                <Link
                  to="/products"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${isDark ? 'bg-transparent border-2 border-sky-500 text-sky-400 hover:bg-sky-500/10' : 'bg-transparent border-2 border-white text-white hover:bg-white/10'}`}
                >
                  View Collections
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative grid grid-cols-2 gap-4">
                {displayProducts.slice(0, 4).map((product, idx) => (
                  <div
                    key={product._id}
                    className={`rounded-2xl p-3 transition-all duration-500 hover:scale-105 ${isDark ? 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/50' : 'bg-white/20 backdrop-blur-sm border border-white/20'}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <img
                      src={product.productImage}
                      alt={product.productTitle}
                      className="w-full h-40 object-contain drop-shadow-2xl rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16`}>
          {[
            { number: "50K+", label: "Products" },
            { number: "5M+", label: "Happy Customers" },
            { number: "500+", label: "Brands" },
            { number: "100+", label: "Cities Served" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800' : 'bg-white border border-sky-100 shadow-lg'}`}
            >
              <div className={`text-3xl md:text-4xl font-black mb-2 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                {stat.number}
              </div>
              <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <h2 className={`text-3xl md:text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Newest Arrivals
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Fresh products just added to our collection
              </p>
            </div>
            <Link
              to="/products"
              className={`mt-4 md:mt-0 inline-flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${isDark ? 'bg-sky-600 hover:bg-sky-500 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'}`}
            >
              View All Products
            </Link>
          </div>

          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {displayProducts.map((product, index) => {
                const price = parseFloat(product.productPrice) || 0;
                const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;
                const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

                return (
                  <div
                    key={product._id}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 ${isDark ? 'bg-gray-900 border border-gray-800 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/20' : 'bg-white border border-gray-200 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/10'}`}
                  >
                    {/* Product Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={product.productImage}
                        alt={product.productTitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Badge */}
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          -{discount}%
                        </div>
                      )}

                      {/* Quick Actions Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/products`}
                            className={`p-2.5 rounded-full ${isDark ? 'bg-sky-600 text-white hover:bg-sky-500' : 'bg-white text-sky-600 hover:bg-gray-100'} shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300`}
                            title="Quick View"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          {/* <button
                            className={`p-2.5 rounded-full ${isDark ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-white text-red-600 hover:bg-gray-100'} shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300`}
                            title="Add to Wishlist"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button> */}
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                        {product.productCategory || 'Uncategorized'}
                      </p>
                      <h3 className={`font-bold text-lg mb-3 line-clamp-2 min-h-[56px] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {product.productTitle}
                      </h3>
                      
                      {/* Rating (placeholder) */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className={`w-4 h-4 ${isDark ? 'text-yellow-500' : 'text-yellow-400'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>(4.8)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            ₹{price.toFixed(2)}
                          </p>
                          {originalPrice && originalPrice > price && (
                            <p className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              ₹{originalPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                        <Link
                          to={`/buy`}
                          className={`p-3 rounded-xl font-bold transition-all duration-300 ${isDark ? 'bg-sky-600 hover:bg-sky-500 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`text-center py-20 rounded-2xl ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="text-6xl mb-4">📦</div>
              <p className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No products yet</p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Check back soon for amazing products!</p>
            </div>
          )}
        </section>

        {/* Category Cards */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Shop by Category
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Electronics",
                icon: "💻",
                color: isDark ? "from-blue-600 to-cyan-600" : "from-blue-500 to-cyan-500",
                desc: "Latest gadgets, smartphones, laptops & accessories",
                itemCount: "2,500+"
              },
              {
                name: "Fashion",
                icon: "👗",
                color: isDark ? "from-purple-600 to-pink-600" : "from-purple-500 to-pink-500",
                desc: "Trendy clothing, shoes, bags & accessories",
                itemCount: "3,200+"
              },
              {
                name: "Home & Living",
                icon: "🏠",
                color: isDark ? "from-emerald-600 to-teal-600" : "from-emerald-500 to-teal-500",
                desc: "Furniture, decor, kitchen & essentials",
                itemCount: "1,800+"
              }
            ].map((category, idx) => (
              <Link
                key={idx}
                to="/products"
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 transform hover:-translate-y-2 ${isDark ? 'bg-gray-900 border border-gray-800 hover:border-sky-500/50' : 'bg-white border border-gray-200 shadow-xl hover:shadow-2xl'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    {category.icon}
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category.name}
                  </h3>
                  
                  <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {category.desc}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                      {category.itemCount} items
                    </span>
                    <span className={`inline-flex items-center font-semibold ${isDark ? 'text-sky-400 group-hover:text-sky-300' : 'text-sky-600 group-hover:text-sky-800'}`}>
                      Explore →
                    </span>
                  </div>
                </div>

                {/* Decorative element */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <div className={`rounded-3xl p-8 md:p-12 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800' : 'bg-gradient-to-br from-sky-50 to-blue-100 border border-sky-200'}`}>
            <div className="text-center mb-10">
              <h2 className={`text-3xl md:text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Why Shop With Us?
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                We're committed to providing the best shopping experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🚚",
                  title: "Free Shipping",
                  desc: "Free delivery on orders above ₹500"
                },
                {
                  icon: "↩️",
                  title: "Easy Returns",
                  desc: "7-day hassle-free return policy"
                },
                {
                  icon: "🔒",
                  title: "Secure Payment",
                  desc: "100% secure payment gateway"
                },
                {
                  icon: "💬",
                  title: "24/7 Support",
                  desc: "Always here to help you"
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gray-900/50' : 'bg-white'}`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 ${isDark ? 'bg-sky-900/30' : 'bg-sky-100'}`}>
                    {feature.icon}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-20">
          <div className={`rounded-3xl p-8 md:p-16 text-center ${isDark ? 'bg-gradient-to-br from-sky-900/40 to-purple-900/40 border border-sky-800/50' : 'bg-gradient-to-br from-sky-600 to-indigo-700 shadow-2xl'}`}>
            <h2 className={`text-3xl md:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-white'}`}>
              Stay Updated
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-sky-100'}`}>
              Subscribe to our newsletter and get 10% off on your first order plus exclusive deals and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-6 py-4 rounded-full outline-none ${isDark ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500' : 'bg-white border border-transparent text-gray-900'}`}
              />
              <button
                className={`px-8 py-4 rounded-full font-bold transition-all duration-300 ${isDark ? 'bg-white text-sky-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;