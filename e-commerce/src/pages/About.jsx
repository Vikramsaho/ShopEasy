import React from 'react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      title: "Our Story",
      icon: "📖",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} border ${isDark ? 'border-gray-700' : 'border-blue-100'}`}>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Founded in 2020, <strong>ShopEasy</strong> started with a simple mission: to make quality products accessible to everyone. 
            What began as a small startup has grown into one of India's most trusted e-commerce platforms, serving millions of customers 
            across the country. Our journey has been defined by innovation, customer obsession, and an unwavering commitment to quality.
          </p>
        </div>
      )
    },
    {
      title: "Our Mission",
      icon: "🎯",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gradient-to-br from-purple-50 to-pink-50'} border ${isDark ? 'border-gray-700' : 'border-purple-100'}`}>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            We believe everyone deserves access to premium products at fair prices. Our mission is to revolutionize online shopping 
            by combining cutting-edge technology with exceptional customer service. We strive to create a seamless, secure, and 
            enjoyable shopping experience that exceeds expectations every time.
          </p>
        </div>
      )
    },
    {
      title: "Our Values",
      icon: "💎",
      content: (
        <div className="space-y-4">
          {[
            {
              title: "Customer First",
              desc: "Every decision we make starts with our customers. We listen, adapt, and deliver solutions that truly meet your needs.",
              icon: "👥"
            },
            {
              title: "Integrity",
              desc: "We operate with complete transparency and honesty. Trust is the foundation of everything we do.",
              icon: "🤝"
            },
            {
              title: "Innovation",
              desc: "We continuously push boundaries to improve our platform, services, and customer experience through technology.",
              icon: "💡"
            },
            {
              title: "Quality",
              desc: "We never compromise on quality. Every product on our platform meets our rigorous standards.",
              icon: "⭐"
            },
            {
              title: "Sustainability",
              desc: "We're committed to reducing our environmental footprint and promoting eco-friendly practices.",
              icon: "🌱"
            }
          ].map((value, idx) => (
            <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} flex gap-4 items-start`}>
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${isDark ? 'bg-sky-900/50' : 'bg-sky-100'}`}>
                {value.icon}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{value.title}</h4>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "What Sets Us Apart",
      icon: "🏆",
      content: (
        <div className="space-y-4">
          {[
            {
              title: "Curated Quality",
              desc: "Every product is carefully vetted by our team to ensure it meets our strict quality standards.",
              stat: "100% Quality Checked"
            },
            {
              title: "Best Prices",
              desc: "We work directly with manufacturers to bring you the best deals without compromising quality.",
              stat: "Up to 50% Off"
            },
            {
              title: "Fast Delivery",
              desc: "Our logistics network ensures your orders reach you quickly and safely.",
              stat: "3-7 Days Delivery"
            },
            {
              title: "Excellent Support",
              desc: "Our customer support team is available 24/7 to assist you with any questions or concerns.",
              stat: "24/7 Support"
            },
            {
              title: "Easy Returns",
              desc: "Not satisfied? Our hassle-free return policy has got you covered.",
              stat: "7-Day Returns"
            }
          ].map((feature, idx) => (
            <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gradient-to-br from-green-50 to-emerald-50'} border ${isDark ? 'border-gray-700' : 'border-green-100'}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-lg">{feature.title}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'}`}>
                  {feature.stat}
                </span>
              </div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Our Team",
      icon: "👨‍💼",
      content: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-blue-50'} border ${isDark ? 'border-gray-700' : 'border-blue-100'}`}>
            <h4 className="font-bold mb-3 text-lg">Leadership Team</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Rahul Sharma", role: "CEO & Founder", initials: "RS" },
                { name: "Priya Patel", role: "CTO", initials: "PP" },
                { name: "Amit Kumar", role: "COO", initials: "AK" }
              ].map((member, idx) => (
                <div key={idx} className={`p-4 rounded-lg text-center ${isDark ? 'bg-gray-800/70' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold ${isDark ? 'bg-sky-600 text-white' : 'bg-sky-100 text-sky-700'}`}>
                    {member.initials}
                  </div>
                  <h5 className="font-bold">{member.name}</h5>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-amber-50'} border ${isDark ? 'border-gray-700' : 'border-amber-100'}`}>
            <h4 className="font-bold mb-3 text-lg">Join Our Team</h4>
            <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              We're always looking for passionate individuals who share our vision. Explore career opportunities and be part of something bigger.
            </p>
            <a 
              href="/careers" 
              className={`inline-block px-6 py-2 rounded-lg font-medium ${isDark ? 'bg-sky-600 hover:bg-sky-500 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'}`}
            >
              View Open Positions
            </a>
          </div>
        </div>
      )
    },
    {
      title: "Our Achievements",
      icon: "🥇",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { number: "5M+", label: "Happy Customers" },
            { number: "50K+", label: "Products" },
            { number: "500+", label: "Brand Partners" },
            { number: "4.8/5", label: "Average Rating" },
            { number: "100+", label: "Cities Served" },
            { number: "99%", label: "On-time Delivery" },
            { number: "24/7", label: "Customer Support" },
            { number: "10+", label: "Industry Awards" }
          ].map((stat, idx) => (
            <div key={idx} className={`p-6 rounded-xl text-center ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                {stat.number}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Contact Us",
      icon: "📞",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-blue-800/50' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'} border text-center`}>
          <h4 className="text-xl font-bold mb-4">Get in Touch</h4>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Have questions or want to learn more about ShopEasy? We'd love to hear from you!
          </p>
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">🏢</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>ShopEasy E-Commerce Pvt. Ltd.</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📍</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>123 Commerce Street, Tech City, TC 12345, India</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📧</span>
              <a href="mailto:info@shopeasy.com" className="text-blue-500 hover:underline">info@shopeasy.com</a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📱</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>+91 98765 43210</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800'} py-16 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-5xl">🏢</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-xl text-purple-100 mb-2">
            ShopEasy E-Commerce
          </p>
          <p className="text-sm text-purple-200">
            Learn more about who we are and what we do
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-3xl">👋</span>
            Welcome to ShopEasy
          </h2>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            We're more than just an e-commerce platform. We're a team of passionate individuals dedicated to transforming 
            the way India shops online. With a focus on quality, convenience, and customer satisfaction, we've built a 
            marketplace that millions trust every day.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <section 
              key={index}
              id={`section-${index}`}
              className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-purple-900/30' : 'bg-gradient-to-br from-purple-100 to-pink-100'}`}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                  {section.content}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <div className={`mt-10 p-6 rounded-2xl ${isDark ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
          <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <em>
              Join millions of satisfied customers and experience the ShopEasy difference.
            </em>
          </p>
          <p className={`text-center text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} ShopEasy. All rights reserved.
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              isDark
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
            }`}
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;