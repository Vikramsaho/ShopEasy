import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Affiliates = () => {
  const { isDark } = useTheme();

  const benefits = [
    {
      title: "Competitive Commission Rates",
      desc: "Earn up to 10% commission on every sale you refer. Higher volumes unlock tiered rates.",
      icon: "💰"
    },
    {
      title: "High-Converting Products",
      desc: "Promote products that customers love. Our catalog features items with proven sales performance.",
      icon: "🛍️"
    },
    {
      title: "30-Day Cookie Duration",
      desc: "Earn commission on any purchase made within 30 days of a customer clicking your affiliate link.",
      icon: "🍪"
    },
    {
      title: "Real-Time Tracking",
      desc: "Monitor your clicks, conversions, and earnings in real-time through our affiliate dashboard.",
      icon: "📊"
    },
    {
      title: "Marketing Materials",
      desc: "Access banners, product images, and promotional content to help you succeed.",
      icon: "🎨"
    },
    {
      title: "Monthly Payouts",
      desc: "Get paid on time every month via bank transfer, PayPal, or other convenient methods.",
      icon: "💳"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up",
      desc: "Fill out the affiliate application form. It's free and takes just a few minutes.",
      icon: "📝"
    },
    {
      step: "2",
      title: "Get Approved",
      desc: "Our team reviews your application (usually within 24-48 hours) and grants you access to the affiliate dashboard.",
      icon: "✅"
    },
    {
      step: "3",
      title: "Share Links",
      desc: "Browse products, generate unique affiliate links, and share them on your website, blog, or social media.",
      icon: "🔗"
    },
    {
      step: "4",
      title: "Earn Commission",
      desc: "When someone makes a purchase using your link, you earn a commission. Track everything in your dashboard.",
      icon: "💸"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Lifestyle Blogger",
      earnings: "₹1,25,000/month",
      quote: "ShopEasy's affiliate program has become a significant income stream for my blog. The products are high-quality and my readers love them!",
      avatar: "PS"
    },
    {
      name: "Rahul Verma",
      role: "Tech YouTuber",
      earnings: "₹2,80,000/month",
      quote: "The commission rates are excellent and the cookie duration gives my audience enough time to make a decision. Highly recommended!",
      avatar: "RV"
    },
    {
      name: "Meena Gupta",
      role: "Instagram Influencer",
      earnings: "₹85,000/month",
      quote: "I've tried many affiliate programs, but ShopEasy stands out with its reliable tracking and prompt payments. Great experience!",
      avatar: "MG"
    }
  ];

  const commissionRates = [
    { category: "Electronics", rate: "5-8%" },
    { category: "Fashion & Apparel", rate: "8-10%" },
    { category: "Home & Kitchen", rate: "6-8%" },
    { category: "Beauty & Personal Care", rate: "7-10%" },
    { category: "Sports & Fitness", rate: "6-9%" },
    { category: "Books & Media", rate: "5-7%" }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-emerald-50'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900' : 'bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600'} py-16 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-5xl">🤝</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Affiliate Program
          </h1>
          <p className="text-xl text-emerald-100 mb-2">
            Partner with ShopEasy & Earn Commission
          </p>
          <p className="text-sm text-emerald-200">
            Join thousands of influencers, bloggers, and marketers who trust ShopEasy
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-4xl ${isDark ? 'bg-emerald-900/30' : 'bg-gradient-to-br from-emerald-100 to-teal-100'}`}>
              💼
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Why Join Our Affiliate Program?</h2>
              <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  The ShopEasy Affiliate Program lets you earn money by promoting products you love. Whether you're a blogger, 
                  YouTuber, social media influencer, or website owner, you can monetize your audience and turn your influence into income.
                </p>
                <p>
                  With competitive commission rates, reliable tracking, and timely payments, we provide everything you need to succeed. 
                  Plus, our diverse product catalog means there's something for every niche and audience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-3xl font-bold mb-6 text-center">Program Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className={`p-5 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gradient-to-br from-emerald-50 to-teal-50'} border ${isDark ? 'border-gray-700' : 'border-emerald-100'}`}>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{benefit.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <p className={`text-center mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Getting started is easy. Follow these simple steps to start earning.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, idx) => (
              <div key={idx} className={`p-6 rounded-xl relative ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border-emerald-100'} border`}>
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${isDark ? 'bg-emerald-900/50' : 'bg-emerald-100'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'}`}>
                        {item.step}
                      </span>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Rates */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-3xl font-bold mb-6">Commission Structure</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={isDark ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                  <th className={`text-left p-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Product Category</th>
                  <th className={`text-left p-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Commission Rate</th>
                  <th className={`text-left p-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Cookie Duration</th>
                </tr>
              </thead>
              <tbody>
                {commissionRates.map((item, idx) => (
                  <tr key={idx} className={isDark ? 'border-b border-gray-800' : 'border-b border-gray-100'}>
                    <td className={`p-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.category}</td>
                    <td className={`p-4 font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{item.rate}</td>
                    <td className={`p-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>30 days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            * Commission rates may vary based on promotional campaigns and negotiation with high-volume affiliates.
          </p>
        </div>

        {/* Testimonials */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-3xl font-bold mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border-emerald-100'} border`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${isDark ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</p>
                    <p className={`text-sm font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{testimonial.earnings}</p>
                  </div>
                </div>
                <p className={`italic ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-teal-900/30' : 'bg-gradient-to-br from-teal-100 to-cyan-100'}`}>
              📈
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Affiliate Dashboard</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-teal-50'} border ${isDark ? 'border-gray-700' : 'border-teal-100'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Clicks</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>12,458</p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-teal-50'} border ${isDark ? 'border-gray-700' : 'border-teal-100'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Conversions</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>384</p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-teal-50'} border ${isDark ? 'border-gray-700' : 'border-teal-100'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Earnings (This Month)</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>₹45,780</p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-teal-50'} border ${isDark ? 'border-gray-700' : 'border-teal-100'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Conversion Rate</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>3.08%</p>
                </div>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                * Dashboard stats shown are sample data. Your actual performance will vary based on your promotional efforts and audience engagement.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`rounded-2xl p-12 text-center ${isDark ? 'bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-800/60' : 'bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-700'} border`}>
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Earning?</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Join thousands of successful affiliates who trust ShopEasy. Sign up now and turn your audience into income.
          </p>
          <button className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg ${isDark ? 'bg-white text-emerald-900 hover:bg-gray-100' : 'bg-white text-emerald-700 hover:bg-gray-100'}`}>
            Apply Now – It's Free
          </button>
          <p className={`mt-4 text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-100'}`}>
            No minimum traffic requirements • Instant approval on review • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default Affiliates;