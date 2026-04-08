import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Privacy = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      title: "Data Controller, DPO, and Contact",
      icon: "📋",
      content: (
        <div className="space-y-2">
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <strong>Data Controller:</strong> ShopEasy E-Commerce
          </p>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <strong>Data Protection Officer (DPO):</strong> Privacy Team
          </p>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <strong>Address:</strong> 123 Commerce Street, Tech City, TC 12345
          </p>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <strong>Email:</strong> privacy@shopeasy.com
          </p>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <strong>Phone Number:</strong> +1 (555) 123-4567
          </p>
        </div>
      )
    },
    {
      title: "Types of Data We Collect",
      icon: "📊",
      content: (
        <div className="space-y-4">
          {[
            {
              title: "Personal Identification Information",
              desc: "Name, email address, physical address, and telephone number.",
              example: "When you register an account or make a purchase, we collect your name, email, and delivery address."
            },
            {
              title: "Account Details",
              desc: "Username, password, and purchase history.",
              example: "When you create an account, we store your username and password securely (hashed)."
            },
            {
              title: "Payment Information",
              desc: "Credit/debit card details, billing address (processed through secure payment providers).",
              example: "During checkout, payment details are handled by our payment partners (Stripe/Razorpay)."
            },
            {
              title: "Technical Data",
              desc: "IP address, browser type, time zone, location, device information.",
              example: "We collect device and browser info to enhance user experience and for analytics."
            },
            {
              title: "Usage Data",
              desc: "Information about how you use our website, products, and services.",
              example: "We track pages visited, cart additions, and purchase patterns to improve recommendations."
            }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-blue-50'} border ${isDark ? 'border-gray-700' : 'border-blue-100'}`}>
              <h4 className="font-bold mb-2 text-lg">{item.title}</h4>
              <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
              <p className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                💡 Example: {item.example}
              </p>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Why We Collect This Data",
      icon: "🎯",
      content: (
        <div className="space-y-4">
          {[
            {
              title: "Process your orders and manage your account",
              desc: "We need your information to fulfill purchases and ship orders.",
              example: "Your name, address, and payment details are essential for order fulfillment."
            },
            {
              title: "Improve and personalize your shopping experience",
              desc: "We use your data to tailor recommendations and enhance usability.",
              example: "Past browsing and purchase data helps us suggest relevant products."
            },
            {
              title: "Communicate with you",
              desc: "We send updates about orders, promotions, and new products (only if you opt-in).",
              example: "Email newsletters are sent only to subscribers who have given consent."
            },
            {
              title: "Conduct market research and analysis",
              desc: "We analyze trends to improve inventory, products, and services.",
              example: "Purchasing patterns help us stock popular items and develop new products."
            }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-green-50'} border ${isDark ? 'border-gray-700' : 'border-green-100'}`}>
              <h4 className="font-bold mb-2 text-lg">{item.title}</h4>
              <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
              <p className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                💡 Example: {item.example}
              </p>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Legal Basis for Processing",
      icon: "⚖️",
      content: (
        <div className="space-y-4">
          {[
            {
              title: "Your Consent",
              desc: "We process data when you explicitly agree (e.g., newsletter subscriptions).",
              example: "You can withdraw consent anytime by unsubscribing from marketing emails."
            },
            {
              title: "Contract Fulfillment",
              desc: "Processing necessary to complete a purchase or service agreement.",
              example: "Order processing requires your name, address, and payment information."
            },
            {
              title: "Legitimate Business Interests",
              desc: "Data processing that benefits both you and our business operations.",
              example: "Analyzing customer behavior helps us improve services and product offerings."
            },
            {
              title: "Legal Compliance",
              desc: "Processing required by law (tax reporting, audits, legal requests).",
              example: "We retain transaction records for tax purposes and legal obligations."
            }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-purple-50'} border ${isDark ? 'border-gray-700' : 'border-purple-100'}`}>
              <h4 className="font-bold mb-2 text-lg">{item.title}</h4>
              <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
              <p className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                💡 Example: {item.example}
              </p>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Data Storage, Erasure, and Security",
      icon: "🔒",
      content: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-yellow-50'} border ${isDark ? 'border-gray-700' : 'border-yellow-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Data Retention</h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              We retain your order history for a minimum of 2 years to comply with warranty claims and tax purposes.
              After this period, data is either deleted or anonymized unless legal obligations require longer retention.
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-green-50'} border ${isDark ? 'border-gray-700' : 'border-green-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Security Measures</h4>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>SSL/TLS encryption for all data transmission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Secure password hashing (bcrypt) for account protection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>PCI DSS compliant payment processing through trusted partners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Regular security audits and vulnerability assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Access controls and authentication for administrative systems</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Data Transfer Outside the EU",
      icon: "🌍",
      content: (
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-indigo-50'} border ${isDark ? 'border-gray-700' : 'border-indigo-100'}`}>
          <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            We may transfer your personal data to countries outside the EU/EEA when our service providers or partners 
            are located globally. All international transfers comply with GDPR and other applicable data protection laws.
          </p>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            We rely on Standard Contractual Clauses (SCCs) and other appropriate safeguards to ensure your data 
            receives protection equivalent to GDPR standards.
          </p>
        </div>
      )
    },
    {
      title: "Use of Cookies and Other Trackers",
      icon: "🍪",
      content: (
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-orange-50'} border ${isDark ? 'border-gray-700' : 'border-orange-100'}`}>
          <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Our website uses cookies and similar technologies to improve your browsing experience, understand site usage, 
            and show personalized content. You can manage cookie preferences through your browser settings.
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            💡 Example: We use cookies to remember items in your cart and maintain your login session.
          </p>
          <p className={`mt-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <a href="/cookies" className="text-blue-500 hover:underline">View our full Cookie Policy →</a>
          </p>
        </div>
      )
    },
    {
      title: "Your Rights",
      icon: "🛡️",
      content: (
        <div className="space-y-3">
          {[
            { title: "Access your personal data", example: "Request a copy of all personal information we hold about you." },
            { title: "Rectify incorrect data", example: "Correct errors in your personal details (name, address, etc.)." },
            { title: "Erase your data", example: "Request deletion of your account data when no longer needed." },
            { title: "Restrict or object to processing", example: "Stop processing for marketing or if you believe processing is unlawful." },
            { title: "Data portability", example: "Receive your data in a machine-readable format to transfer to another service." }
          ].map((right, idx) => (
            <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <span className="text-2xl">→</span>
              <div>
                <h4 className="font-bold">{right.title}</h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{right.example}</p>
              </div>
            </div>
          ))}
          <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} border`}>
            <p className={`${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
              <strong>To exercise these rights:</strong> Contact our Data Protection Officer at privacy@shopeasy.com
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Contact Information",
      icon: "📞",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-800' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'} border text-center`}>
          <h4 className="text-xl font-bold mb-4">Get in Touch</h4>
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">🏢</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>ShopEasy E-Commerce</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📍</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>123 Commerce Street, Tech City, TC 12345</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📧</span>
              <a href="mailto:privacy@shopeasy.com" className="text-blue-500 hover:underline">privacy@shopeasy.com</a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📱</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900' : 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800'} py-16 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-5xl">🔒</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 mb-2">
            ShopEasy E-Commerce
          </p>
          <p className="text-sm text-blue-200">
            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-3xl">📜</span>
            Overview
          </h2>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            We are committed to protecting the privacy and security of our customers and site visitors. 
            This Privacy Policy outlines how we collect, use, share, and safeguard your personal information 
            when you visit our website and use our services.
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
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-blue-900/30' : 'bg-gradient-to-br from-blue-100 to-purple-100'}`}>
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
              This document was generated using a privacy policy template. 
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            }`}
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;