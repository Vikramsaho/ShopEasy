import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate, useLocation } from 'react-router-dom'

const Products = () => {
  const { isDark } = useTheme();
  const { addToCart, incrementQuantity, decrementQuantity, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  
   const location = useLocation();

   // 🔍 Get query params
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get('search');
  const categoryQuery = params.get('category');

  const handleBuyNow = (product) => {
  navigate('/buy', {
    state: { product }
  });
};

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
        console.error('Products fetch error:', error);
        setError(error.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


   // 🔄 Sync category from URL
  useEffect(() => {
    if (categoryQuery) {
      setActiveCategory(categoryQuery);
    }
  }, [categoryQuery]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.productCategory || 'Uncategorized')))].filter(Boolean);


  // 🔥 MAIN FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    const category = (p.productCategory || '').toLowerCase();
    const title = (p.productTitle || '').toLowerCase();

    if (categoryQuery) {
      return category.includes(categoryQuery.toLowerCase());
    }

    if (searchQuery) {
      return (
        title.includes(searchQuery.toLowerCase()) ||
        category.includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory === 'All') return true;

    return category === activeCategory.toLowerCase();
  });

  // const filteredProducts = activeCategory === 'All'
  //   ? products
  //   : products.filter(p => (p.productCategory || p.category) === activeCategory);

  const loadMore = () => setVisibleProducts(prev => prev + 4);

  const toggleDescription = (productId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const getBadgeColor = (badge) => {
    if (!badge) return '';
    const colors = {
      'Best Seller': isDark ? 'bg-amber-500/90' : 'bg-amber-500',
      'New': isDark ? 'bg-emerald-500/90' : 'bg-emerald-500',
      'Sale': isDark ? 'bg-rose-500/90' : 'bg-rose-500',
      'Popular': isDark ? 'bg-violet-500/90' : 'bg-violet-500',
      'Hot': isDark ? 'bg-orange-500/90' : 'bg-orange-500',
      'Trending': isDark ? 'bg-cyan-500/90' : 'bg-cyan-500',
    };
    return colors[badge] || (isDark ? 'bg-sky-500/90' : 'bg-sky-500');
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <main className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-sky-100 text-gray-900'}`}>
        <p className="text-xl">Loading products...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-sky-100 text-gray-900'}`}>
        <p className="text-xl">Error: {error}</p>
      </main>
    )
  }

  return (
    <main className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-sky-100 text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-96 h-96 ${isDark ? 'bg-sky-500/10' : 'bg-sky-400/30'} rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute -bottom-40 -left-40 w-96 h-96 ${isDark ? 'bg-cyan-500/10' : 'bg-sky-300/30'} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-200 text-sky-800'}`}>
              Discover Amazing Products
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              {isDark ? (
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Premium Collection
                </span>
              ) : (
                <span className="bg-gradient-to-r from-sky-900 via-sky-700 to-sky-500 bg-clip-text text-transparent">
                  Premium Collection
                </span>
              )}
            </h1>
            <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Curated selection of trending products with unbeatable prices and fast delivery
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? isDark 
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30' 
                      : 'bg-sky-600 text-white shadow-lg shadow-sky-500/30'
                    : isDark
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                      : 'bg-white text-gray-700 hover:bg-sky-50 border border-sky-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, visibleProducts).map((product, index) => {
            const productId = product._id || product.id;
            const productName = product.productTitle || product.name || 'Untitled Product';
            const productCategoryValue = product.productCategory || product.category || 'Uncategorized';
            const productImage = product.productImage || product.image || 'https://via.placeholder.com/400';
            const productPrice = parseFloat(product.productPrice || product.price || 0);
            const productDescription = product.productDescription || product.description || '';
            const productRating = product.rating || 4.5;
            const productReviews = product.reviews || 0;
            const badge = product.badge || null;
            const originalPrice = parseFloat(product.originalPrice || productPrice);
            
            const cartItem = cartItems.find(item => item.id === productId);
            const cartQuantity = cartItem ? cartItem.quantity : 0;
            const inWishlist = isInWishlist(productId);
            const isExpanded = expandedDescriptions[productId];
            const truncatedDescription = !isExpanded && productDescription.length > 100 
              ? productDescription.substring(0, 100) + '...' 
              : productDescription;

            return (
            <article
              key={productId}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                isDark 
                  ? 'bg-gray-900/50 border border-gray-800 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10' 
                  : 'bg-white border border-sky-200 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/20'
              }`}
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              onMouseEnter={() => setHoveredProduct(productId)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Badge */}
              {badge && (
                <span className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white ${getBadgeColor(badge)}`}>
                  {badge}
                </span>
              )}

              {/* Wishlist button - heart icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist({
                    id: productId,
                    price: productPrice,
                    name: productName,
                    image: productImage,
                    category: productCategoryValue
                  });
                }}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-20 ${
                  inWishlist
                    ? isDark
                      ? 'bg-red-500/20 text-red-500'
                      : 'bg-red-100 text-red-500'
                    : isDark
                      ? 'bg-gray-800/80 text-gray-400 hover:bg-gray-700'
                      : 'bg-white/80 text-gray-400 hover:bg-gray-100'
                }`}
                title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <svg className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={productImage}
                  alt={productName}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredProduct === productId ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black/60 via-transparent' : 'from-sky-900/20 via-transparent'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Quick Actions with Quantity Controls */}
                <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
                  hoveredProduct === productId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {cartQuantity === 0 ? (
                    <div className="flex gap-2">
        {/* Add to Cart */}
        <button
          onClick={() => addToCart({
            id: productId,
            price: productPrice,
            name: productName,
            image: productImage,
            category: productCategoryValue
          }, true)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            isDark
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-sky-600 text-white hover:bg-sky-700'
          }`}
        >
          Add to Cart
        </button>

        {/* Buy Now */}
        <button
          onClick={() => handleBuyNow({
            id: productId,
            price: productPrice,
            name: productName,
            image: productImage,
            category: productCategoryValue
          })}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            isDark
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Buy Now
        </button>
      </div>
                  ) : (
                    <div className={`flex items-center justify-between gap-2 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-lg p-1.5`}>
                      <button
                        onClick={() => decrementQuantity(productId)}
                        className={`flex-1 py-2 rounded-md text-lg font-bold transition-colors ${
                          isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                        }`}
                      >
                        -
                      </button>
                      <span className={`text-sm font-bold min-w-[2rem] text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {cartQuantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(productId)}
                        className={`flex-1 py-2 rounded-md text-lg font-bold transition-colors ${
                          isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                        }`}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <p className={`text-xs font-medium mb-2 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                  {productCategoryValue}
                </p>
                <h3 className={`font-bold text-lg mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {productName}
                </h3>
                {productDescription && (
                  <div className="mb-2">
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {truncatedDescription}
                    </p>
                    {productDescription.length > 100 && (
                      <button
                        onClick={() => toggleDescription(productId)}
                        className={`text-xs font-semibold mt-1 ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-sky-600 hover:text-sky-700'}`}
                      >
                        {isExpanded ? 'See Less' : 'See More'}
                      </button>
                    )}
                  </div>
                )}
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(productRating) ? 'text-amber-400' : isDark ? 'text-gray-700' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {productRating} ({productReviews.toLocaleString()})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ₹{productPrice.toFixed(2)}
                  </span>
                  {originalPrice && originalPrice > productPrice ? (
                    <>
                      <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        ₹{originalPrice.toFixed(2)}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                        -{Math.round((1 - productPrice / originalPrice) * 100)}%
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </article>
            );
          })}
        </div>

        {/* Load More */}
        {visibleProducts < filteredProducts.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className={`group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-sky-500/30' 
                  : 'bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:shadow-lg hover:shadow-sky-500/30'
              }`}
            >
              <span className="relative z-10">Load More Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default Products;