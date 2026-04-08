import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Terms = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      title: "Introduction",
      icon: "📄",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} border ${isDark ? 'border-gray-700' : 'border-blue-100'}`}>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Welcome to <strong>ShopEasy</strong>! These Terms of Service ("Terms") govern your use of our e-commerce platform, 
            including our website, mobile applications, and all related services (collectively, the "Service"). 
            By accessing or using ShopEasy, you agree to be bound by these Terms. If you do not agree with any part of these Terms, 
            you may not access or use the Service.
          </p>
        </div>
      )
    },
    {
      title: "Definitions",
      icon: "📚",
      content: (
        <div className="space-y-3">
          {[
            { term: "ShopEasy", definition: "Our e-commerce platform operating at shopeasy.com" },
            { term: "User", definition: "Any person who accesses or uses our Service" },
            { term: "Customer", definition: "User who purchases products through our platform" },
            { term: "Seller", definition: "Third-party merchants who list products on our platform" },
            { term: "Content", definition: "All text, images, videos, listings, and other materials on the platform" },
            { term: "Product", definition: "Any item listed for sale on ShopEasy" }
          ].map((item, idx) => (
            <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <span className={`font-bold min-w-[120px] ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>{item.term}:</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item.definition}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Account Registration & Eligibility",
      icon: "👤",
      content: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-amber-50'} border ${isDark ? 'border-gray-700' : 'border-amber-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Account Creation</h4>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• You must be at least 18 years old to create an account</li>
              <li>• Provide accurate, current, and complete information</li>
              <li>• Maintain and update your account details</li>
              <li>• Keep your password secure and confidential</li>
              <li>• You are responsible for all activities under your account</li>
            </ul>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-red-50'} border ${isDark ? 'border-gray-700' : 'border-red-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Account Suspension</h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              We reserve the right to suspend or terminate your account for violations of these Terms, 
              fraudulent activity, or any behavior that harms other users or our platform.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Product Listings & Pricing",
      icon: "🏷️",
      content: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-green-50'} border ${isDark ? 'border-gray-700' : 'border-green-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Product Information</h4>
            <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Sellers are responsible for accurate product descriptions, images, and pricing. 
              While we strive for accuracy, we cannot guarantee all listings are error-free.
            </p>
            <ul className={`space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Prices shown are in Indian Rupees (INR) unless specified</li>
              <li>• We reserve the right to correct pricing errors</li>
              <li>• Products are subject to availability</li>
              <li>• We may remove listings that violate our policies</li>
            </ul>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-yellow-50'} border ${isDark ? 'border-gray-700' : 'border-yellow-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Price Changes</h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Prices may change at any time without notice. We are not obligated to honor previously displayed prices 
              if they were incorrect due to a typographical error, system malfunction, or unauthorized manipulation.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Orders & Payments",
      icon: "💳",
      content: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-purple-50'} border ${isDark ? 'border-gray-700' : 'border-purple-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Order Acceptance</h4>
            <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Your order is an offer to purchase. We reserve the right to accept or decline any order for any reason, 
              including product unavailability, pricing errors, or suspected fraud.
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-indigo-50'} border ${isDark ? 'border-gray-700' : 'border-indigo-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Payment Methods</h4>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• We accept UPI, Credit/Debit Cards, and Cash on Delivery (COD)</li>
              <li>• All payments are processed through secure, PCI-compliant payment gateways</li>
              <li>• COD orders may have restrictions based on location or order value</li>
              <li>• We do not store full credit card details on our servers</li>
            </ul>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-pink-50'} border ${isDark ? 'border-gray-700' : 'border-pink-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Payment Disputes</h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              If you believe a charge is incorrect, contact us within 30 days. We will investigate and work with the 
              payment provider to resolve the issue. Chargebacks without valid reason may result in account termination.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Shipping & Delivery",
      icon: "🚚",
      content: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-teal-50'} border ${isDark ? 'border-gray-700' : 'border-teal-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Shipping Timeline</h4>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Standard delivery: 3-7 business days</li>
              <li>• Express delivery: 1-2 business days (where available)</li>
              <li>• Delivery times are estimates and not guaranteed</li>
              <li>• Delays due to courier services, weather, or holidays are beyond our control</li>
            </ul>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-cyan-50'} border ${isDark ? 'border-gray-700' : 'border-cyan-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Shipping Charges</h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Free shipping on orders above ₹500. For orders below ₹500, a flat shipping fee of ₹50 applies. 
              Additional charges may apply for remote locations or oversized items.
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-lime-50'} border ${isDark ? 'border-gray-700' : 'border-lime-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Risk of Loss</h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Risk of loss and title to products pass to you upon delivery to the shipping carrier. 
              We are not responsible for lost, stolen, or damaged packages after they have been delivered.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Returns & Refunds",
      icon: "↩️",
      content: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-emerald-50'} border ${isDark ? 'border-gray-700' : 'border-emerald-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Return Policy</h4>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• 7-day return window from delivery date for most products</li>
              <li>• Items must be unused, unwashed, and in original packaging</li>
              <li>• Perishable goods, intimate items, and personalized products are non-returnable</li>
              <li>• Return shipping costs may apply (free for defective items)</li>
            </ul>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-rose-50'} border ${isDark ? 'border-gray-700' : 'border-rose-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Refund Process</h4>
            <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Once we receive and inspect the returned item, we will process your refund within 5-7 business days. 
              Refunds will be issued to the original payment method.
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Note: COD payments will be refunded via bank transfer or UPI.
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-orange-50'} border ${isDark ? 'border-gray-700' : 'border-orange-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Exchanges</h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              If you need a different size or color, you can request an exchange within 7 days of delivery, 
              subject to product availability. Exchange shipping charges may apply.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Intellectual Property",
      icon: "©️",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-violet-50'} border ${isDark ? 'border-gray-700' : 'border-violet-100'}`}>
          <h4 className="font-bold mb-3 text-lg">Ownership Rights</h4>
          <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>• The ShopEasy name, logo, and branding are our exclusive property</li>
            <li>• All product images, descriptions, and content on our platform are protected by copyright</li>
            <li>• You may not copy, modify, distribute, or use our content without written permission</li>
            <li>• Sellers retain ownership of their product listings but grant us a license to display them</li>
            <li>• User-generated content (reviews, comments) must be original and not infringe on others' rights</li>
          </ul>
        </div>
      )
    },
    {
      title: "User Conduct",
      icon: "✅",
      content: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-sky-50'} border ${isDark ? 'border-gray-700' : 'border-sky-100'}`}>
            <h4 className="font-bold mb-2 text-lg">You Agree Not To:</h4>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Use the Service for any illegal purpose</li>
              <li>• Create multiple accounts for abusive purposes</li>
              <li>• Harass, abuse, or harm other users or our staff</li>
              <li>• Submit false or misleading information</li>
              <li>• Attempt to bypass security measures or access restricted areas</li>
              <li>• Use bots, scrapers, or automated tools to access the platform</li>
              <li>• Post spam, malware, or malicious content</li>
              <li>• Interfere with the proper functioning of the Service</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Limitation of Liability",
      icon: "⚠️",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-red-50'} border ${isDark ? 'border-gray-700' : 'border-red-100'}`}>
          <h4 className="font-bold mb-3 text-lg">No Warranty</h4>
          <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT ANY WARRANTIES, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
          </p>
          <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>• The Service will be error-free or uninterrupted</li>
            <li>• Products will meet your expectations or requirements</li>
            <li>• Information on the platform is accurate or complete</li>
            <li>• The Service will be secure from unauthorized access</li>
          </ul>
          
          <h4 className="font-bold mb-2 text-lg">Maximum Liability</h4>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHOPEASY AND ITS OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE 
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. 
            OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE LAST 12 MONTHS.
          </p>
        </div>
      )
    },
    {
      title: "Indemnification",
      icon: "🛡️",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-amber-50'} border ${isDark ? 'border-gray-700' : 'border-amber-100'}`}>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            You agree to indemnify, defend, and hold harmless ShopEasy, its affiliates, officers, agents, and employees 
            from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt 
            (including reasonable attorneys' fees) arising from: (a) your use of and access to the Service; 
            (b) your violation of any term of these Terms; (c) your violation of any third-party right; or 
            (d) any claim that your content caused damage to a third party.
          </p>
        </div>
      )
    },
    {
      title: "Governing Law & Dispute Resolution",
      icon: "⚖️",
      content: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-indigo-50'} border ${isDark ? 'border-gray-700' : 'border-indigo-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Applicable Law</h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-purple-50'} border ${isDark ? 'border-gray-700' : 'border-purple-100'}`}>
            <h4 className="font-bold mb-2 text-lg">Dispute Resolution</h4>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Any dispute arising from these Terms shall first be attempted to be resolved through good-faith negotiation</li>
              <li>• If negotiation fails, disputes shall be resolved through binding arbitration</li>
              <li>• Arbitration shall be conducted in [City, State] under the rules of [Arbitration Body]</li>
              <li>• The prevailing party may recover reasonable attorney fees and costs</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Changes to Terms",
      icon: "🔄",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-cyan-50'} border ${isDark ? 'border-gray-700' : 'border-cyan-100'}`}>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            We reserve the right to modify these Terms at any time. When we make changes, we will update the "Effective Date" 
            at the top of this page. For material changes, we will provide notice through the platform or via email. 
            Continued use of the Service after changes constitutes acceptance of the new Terms. 
            It is your responsibility to review these Terms periodically.
          </p>
        </div>
      )
    },
    {
      title: "Severability",
      icon: "📐",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or 
            eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
          </p>
        </div>
      )
    },
    {
      title: "Contact Information",
      icon: "📞",
      content: (
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-800' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'} border text-center`}>
          <h4 className="text-xl font-bold mb-4">Questions About These Terms?</h4>
          <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            If you have any questions about these Terms of Service, please contact us:
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
              <a href="mailto:legal@shopeasy.com" className="text-blue-500 hover:underline">legal@shopeasy.com</a>
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
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900' : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-800'} py-16 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-5xl">📋</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-indigo-100 mb-2">
            ShopEasy E-Commerce Platform
          </p>
          <p className="text-sm text-indigo-200">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction Card */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-3xl">📜</span>
            Welcome to ShopEasy
          </h2>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            By using ShopEasy, you agree to these Terms of Service. Please read them carefully. These Terms constitute a legally binding agreement between you and ShopEasy regarding your use of our e-commerce platform.
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
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-indigo-900/30' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
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

        {/* Acceptance Statement */}
        <div className={`mt-10 p-8 rounded-2xl ${isDark ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-blue-800' : 'bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-200'}`}>
          <h3 className="text-2xl font-bold mb-4 text-center">Acceptance of Terms</h3>
          <p className={`text-center leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
            By creating an account, placing an order, or using our Service, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms of Service and our Privacy Policy. 
            If you do not agree with any part of these Terms, please do not use our Service.
          </p>
        </div>

        {/* Footer Note */}
        <div className={`mt-10 p-6 rounded-2xl ${isDark ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
          <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <em>
              These Terms of Service were last updated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. 
              For any questions, please contact our legal team.
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

export default Terms;