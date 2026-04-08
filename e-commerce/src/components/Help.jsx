// src/components/Help.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Help = () => {
  const { isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We offer Standard Shipping (5-7 business days), Express Shipping (2-3 business days), and Next Day Delivery. Orders over $50 qualify for free standard shipping."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you will receive an email with a tracking number. You can also log in to your account and view the status under 'My Orders'."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase for items in original condition. Simply start a return from your order history or contact our support team."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location."
    },
    {
      question: "How do I change or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it. After that window, please contact customer support immediately."
    }
  ];

  const contactMethods = [
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      description: "We'll respond within 24 hours",
      action: "support@shopeasy.com",
      link: "mailto:support@shopeasy.com"
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm",
      action: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      link: "#"
    }
  ];

  return (
    <main className={`min-h-screen ${isDark ? 'bg-black' : 'bg-sky-100'}`}>
      {/* Hero Section */}
      <section className={`relative py-20 overflow-hidden ${isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-sky-200 to-sky-100'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-sky-900/20' : 'bg-sky-300/40'}`}></div>
          <div className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-cyan-900/20' : 'bg-white/60'}`}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl sm:text-5xl font-black mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            How can we help?
          </h1>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            Search our help center or browse categories below
          </p>

          {/* Search Bar */}
          <div className={`max-w-2xl mx-auto rounded-xl overflow-hidden shadow-xl ${isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-sky-200'}`}>
            <div className="flex items-center">
              <svg className={`w-6 h-6 ml-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className={`w-full px-4 py-4 text-base outline-none bg-transparent ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
              />
              <button className={`m-2 px-6 py-2 rounded-lg font-semibold transition-colors ${isDark ? 'bg-sky-600 hover:bg-sky-500 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'}`}>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Shipping Info', 'Returns & Refunds', 'Track Order', 'Payment Options'].map((item, i) => (
            <a 
              key={i} 
              href="#" 
              className={`
                group p-6 rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-1
                ${isDark 
                  ? 'bg-gray-900 border border-gray-800 hover:border-sky-500/50' 
                  : 'bg-white border border-sky-200 shadow-sm hover:shadow-lg'
                }
              `}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800 group-hover:bg-sky-900/50' : 'bg-sky-50 group-hover:bg-sky-100'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, i) => (
            <a
              key={i}
              href={method.link}
              className={`
                group p-8 rounded-2xl transition-all duration-300
                ${isDark 
                  ? 'bg-gray-900 border border-gray-800 hover:border-sky-500/50' 
                  : 'bg-white border border-sky-200 shadow-sm hover:shadow-lg'
                }
              `}
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${isDark ? 'bg-gray-800 text-sky-400' : 'bg-sky-50 text-sky-600'}`}>
                {method.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {method.title}
              </h3>
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {method.description}
              </p>
              <span className={`font-semibold ${isDark ? 'text-sky-400 group-hover:text-sky-300' : 'text-sky-600 group-hover:text-sky-700'}`}>
                {method.action} &rarr;
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-black text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`
                  rounded-2xl overflow-hidden transition-all duration-300
                  ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-sky-50 border border-sky-100'}
                `}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-semibold text-lg pr-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 p-2 rounded-full transition-colors ${activeIndex === index ? (isDark ? 'bg-sky-600 text-white' : 'bg-sky-600 text-white') : (isDark ? 'bg-gray-700 text-gray-300' : 'bg-sky-100 text-sky-600')}`}>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className={`px-6 pb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Help;