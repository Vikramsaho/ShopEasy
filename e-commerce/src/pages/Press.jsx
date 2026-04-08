import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Press = () => {
  const { isDark } = useTheme();

  const pressReleases = [
    {
      date: "March 2024",
      title: "ShopEasy Raises $50M in Series B Funding to Accelerate Growth",
      summary: "The funding round led by top venture capital firms will be used to expand product categories and strengthen logistics network across India.",
      category: "Funding"
    },
    {
      date: "February 2024",
      title: "ShopEasy Launches Express Delivery in 50 Major Cities",
      summary: "Customers in major metropolitan areas can now enjoy guaranteed next-day delivery on select products, transforming the online shopping experience.",
      category: "Product"
    },
    {
      date: "January 2024",
      title: "ShopEasy Recognized as 'Most Trusted E-Commerce Brand' 2024",
      summary: "Independent consumer survey ranks ShopEasy among the top 3 most trusted online shopping platforms in India for the second consecutive year.",
      category: "Award"
    },
    {
      date: "December 2023",
      title: "ShopEasy Partners with 100+ New Brands for Exclusive Product Launches",
      summary: "Strategic partnerships with premium brands bring exclusive products and competitive pricing to ShopEasy customers.",
      category: "Partnership"
    },
    {
      date: "November 2023",
      title: "ShopEasy Launches Sustainable Shopping Initiative 'Green Cart'",
      summary: "New program highlights eco-friendly products and offers incentives for sustainable purchasing decisions.",
      category: "CSR"
    },
    {
      date: "October 2023",
      title: "ShopEasy Hits 5 Million Customers Milestone",
      summary: "Platform celebrates reaching 5 million registered users with special promotions and announcements of upcoming features.",
      category: "Milestone"
    }
  ];

  const mediaAssets = [
    { type: "Logo", formats: ["PNG", "SVG", "EPS"], link: "#" },
    { type: "Brand Guidelines", formats: ["PDF"], link: "#" },
    { type: "Product Images", formats: ["JPG", "PNG"], link: "#" },
    { type: "Leadership Photos", formats: ["JPG", "PNG"], link: "#" },
    { type: "Infographics", formats: ["PNG", "PDF"], link: "#" },
    { type: "B-Roll Video", formats: ["MP4"], link: "#" }
  ];

  const statistics = [
    { value: "5M+", label: "Customers" },
    { value: "50K+", label: "Products" },
    { value: "500+", label: "Brand Partners" },
    { value: "100+", label: "Cities" },
    { value: "99%", label: "On-Time Delivery" },
    { value: "4.8/5", label: "Average Rating" }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-red-50'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900' : 'bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600'} py-16 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-5xl">📰</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Press & Media
          </h1>
          <p className="text-xl text-orange-100 mb-2">
            ShopEasy Newsroom
          </p>
          <p className="text-sm text-orange-200">
            Latest updates, announcements, and media resources
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-4xl ${isDark ? 'bg-red-900/30' : 'bg-gradient-to-br from-red-100 to-orange-100'}`}>
              📢
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Media Relations & Press Inquiries</h2>
              <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  Welcome to the ShopEasy press room. We're always excited to share our story with the media and showcase how we're 
                  transforming e-commerce in India. For press inquiries, interview requests, or additional information, please contact our media team.
                </p>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-red-50'} border ${isDark ? 'border-gray-700' : 'border-red-100'}`}>
                  <h3 className="font-bold mb-2">Press Contact</h3>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> Meera Sharma, Head of Communications</p>
                    <p><strong>Email:</strong> <a href="mailto:press@shopeasy.com" className="text-blue-500 hover:underline">press@shopeasy.com</a></p>
                    <p><strong>Phone:</strong> +91 98765 43211</p>
                    <p><strong>Office:</strong> +91 11 1234 5678</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-2xl font-bold mb-6">ShopEasy at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statistics.map((stat, idx) => (
              <div key={idx} className={`p-4 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-800/30' : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-100'} border`}>
                <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-orange-900/30' : 'bg-gradient-to-br from-orange-100 to-red-100'}`}>
              📝
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Latest Press Releases</h2>
              <div className="space-y-4">
                {pressReleases.map((release, idx) => (
                  <div key={idx} className={`p-5 rounded-lg ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gradient-to-br from-orange-50/50 to-red-50/50 border-orange-100'} border`}>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800'}`}>
                        {release.category}
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{release.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                    <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{release.summary}</p>
                    <button className={`text-sm font-medium ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}>
                      Read Full Release →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Media Resources */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-yellow-900/30' : 'bg-gradient-to-br from-yellow-100 to-amber-100'}`}>
              📁
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Media Resources</h2>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Download official ShopEasy brand assets, logos, and media materials for editorial use.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaAssets.map((asset, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-100'} border`}>
                    <h3 className="font-bold mb-2">{asset.type}</h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Available formats: {asset.formats.join(', ')}
                    </p>
                    <button className={`text-sm font-medium ${isDark ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-700'}`}>
                      Download →
                    </button>
                  </div>
                ))}
              </div>
              <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                * All downloads and use of ShopEasy brand assets are subject to our <a href="/terms" className="text-blue-500 hover:underline">Brand Guidelines</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Company Info for Media */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-2xl font-bold mb-6">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Facts</h3>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li><strong>Company Name:</strong> ShopEasy E-Commerce Pvt. Ltd.</li>
                <li><strong>Founded:</strong> 2020</li>
                <li><strong>Headquarters:</strong> 123 Commerce Street, Tech City, TC 12345, India</li>
                <li><strong>Legal Entity:</strong> Private Limited Company</li>
                <li><strong>Industry:</strong> E-commerce / Retail Technology</li>
                <li><strong>Service Area:</strong> 100+ cities across India</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Executive Team</h3>
              <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div>
                  <p><strong>Rahul Sharma</strong> – CEO & Founder</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Former Amazon India exec with 15+ years in e-commerce</p>
                </div>
                <div>
                  <p><strong>Priya Patel</strong> – CTO</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>IIT graduate, previously led engineering at Flipkart</p>
                </div>
                <div>
                  <p><strong>Amit Kumar</strong> – COO</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Operations expert with background in logistics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className={`rounded-2xl p-8 ${isDark ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-orange-800/50' : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200'} border`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Follow Us</h2>
          <p className={`text-center mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Stay updated with the latest ShopEasy news and announcements on our social channels.
          </p>
          <div className="flex justify-center gap-6">
            {[
              { name: "Twitter", icon: "𝕏", color: isDark ? "text-white" : "text-black" },
              { name: "LinkedIn", icon: "in", color: "text-blue-600" },
              { name: "Instagram", icon: "📷", color: isDark ? "text-white" : "text-black" },
              { name: "Facebook", icon: "f", color: "text-blue-700" },
              { name: "YouTube", icon: "▶", color: "text-red-600" }
            ].map((social, idx) => (
              <a 
                key={idx}
                href="#" 
                className={`flex flex-col items-center gap-2 ${social.color} hover:opacity-80 transition-opacity`}
              >
                <span className="text-3xl font-bold">{social.icon}</span>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;