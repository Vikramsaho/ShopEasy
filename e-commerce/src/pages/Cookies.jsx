import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Cookies = () => {
  const { isDark } = useTheme();

  const cookieTypes = [
    {
      name: "Essential Cookies",
      purpose: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
      examples: [
        "Session cookies that maintain your login state",
        "Security tokens that protect against CSRF attacks",
        "Cookies that remember your shopping cart items",
        "Cookies that ensure you can navigate the site securely"
      ],
      canOptOut: false
    },
    {
      name: "Functional Cookies",
      purpose: "These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and location.",
      examples: [
        "Language preference cookies",
        "Currency selection cookies",
        "Login persistence cookies",
        "Personalized content settings"
      ],
      canOptOut: true
    },
    {
      name: "Performance Cookies",
      purpose: "These cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve the user experience.",
      examples: [
        "Google Analytics cookies (page views, bounce rate)",
        "Heatmap tools (click tracking, scroll depth)",
        "Error reporting cookies",
        "Performance monitoring cookies"
      ],
      canOptOut: true
    },
    {
      name: "Targeting/Advertising Cookies",
      purpose: "These cookies are used to track your browsing behavior and show you personalized advertisements based on your interests and online activity.",
      examples: [
        "Retargeting pixels from advertising platforms",
        "Social media sharing cookies",
        "Affiliate tracking cookies",
        "Behavioral advertising cookies"
      ],
      canOptOut: true
    }
  ];

  const thirdPartyCookies = [
    {
      name: "Google Analytics",
      purpose: "We use Google Analytics to understand how visitors interact with our website. It collects anonymous data about page visits, bounce rates, and user behavior.",
      privacyPolicy: "https://policies.google.com/privacy",
      optOut: "https://tools.google.com/dlpage/gaoptout"
    },
    {
      name: "Google Ads",
      purpose: "Google Ads cookies help us show relevant ads to you on Google's network and measure the effectiveness of our advertising campaigns.",
      privacyPolicy: "https://policies.google.com/privacy",
      optOut: "https://adssettings.google.com/authenticated"
    },
    {
      name: "Facebook Pixel",
      purpose: "Facebook Pixel tracks conversions and helps us optimize ads shown to you on Facebook and Instagram based on your interactions with our site.",
      privacyPolicy: "https://privacy.facebook.com",
      optOut: "https://www.facebook.com/help/568137493300217"
    },
    {
      name: "Hotjar",
      purpose: "Hotjar provides heatmaps and session recordings to help us understand user behavior and improve the website experience.",
      privacyPolicy: "https://www.hotjar.com/legal/privacy",
      optOut: "https://www.hotjar.com/legal/compliance/opt-out"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-orange-50'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 via-orange-900/20 to-gray-900' : 'bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600'} py-16 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-5xl">🍪</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-amber-100 mb-2">
            ShopEasy E-Commerce
          </p>
          <p className="text-sm text-amber-200">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-3xl">📄</span>
            Overview
          </h2>
          <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>
              This Cookie Policy explains how ShopEasy ("we", "us", or "our") uses cookies and similar tracking technologies 
              when you visit our website or use our services. It also describes your choices regarding these technologies.
            </p>
            <p>
              By using our website, you consent to the use of cookies as described in this policy. If you do not agree with 
              our use of cookies, you can adjust your browser settings or opt out of specific cookies as explained below.
            </p>
          </div>
        </div>

        {/* What are Cookies */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-orange-900/30' : 'bg-gradient-to-br from-orange-100 to-amber-100'}`}>
              ❓
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
              <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  Cookies are small text files that are stored on your device (computer, smartphone, or tablet) when you visit a website. 
                  They are widely used to make websites work more efficiently, provide analytical insights, and personalize your experience.
                </p>
                <p>
                  Cookies can be "first-party" (set by the website you are visiting) or "third-party" (set by external services like analytics or advertising providers). They can also be "persistent" (remain on your device until they expire) or "session" cookies (deleted when you close your browser).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Types of Cookies We Use */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-amber-900/30' : 'bg-gradient-to-br from-amber-100 to-yellow-100'}`}>
              📊
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
              <div className="space-y-6">
                {cookieTypes.map((type, idx) => (
                  <div key={idx} className={`p-5 rounded-xl ${isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-gradient-to-br from-amber-50/50 to-yellow-50/50 border-amber-100'} border`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">{type.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${type.canOptOut ? (isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800') : (isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800')}`}>
                        {type.canOptOut ? 'Optional' : 'Required'}
                      </span>
                    </div>
                    <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{type.purpose}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className={`space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {type.examples.map((example, exIdx) => (
                          <li key={exIdx} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-purple-900/30' : 'bg-gradient-to-br from-purple-100 to-pink-100'}`}>
              🔗
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                We work with trusted third-party service providers who may also set cookies on your device. These services help us 
                analyze website performance, deliver personalized ads, and improve user experience.
              </p>
              
              <div className="space-y-4">
                {thirdPartyCookies.map((provider, idx) => (
                  <div key={idx} className={`p-5 rounded-lg ${isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-purple-100'} border`}>
                    <h3 className="text-lg font-bold mb-2">{provider.name}</h3>
                    <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{provider.purpose}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <a 
                        href={provider.privacyPolicy} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg ${isDark ? 'bg-purple-900/30 hover:bg-purple-900/50 border border-purple-800/50 text-purple-300' : 'bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-200'}`}
                      >
                        View Privacy Policy →
                      </a>
                      <a 
                        href={provider.optOut} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg ${isDark ? 'bg-red-900/30 hover:bg-red-900/50 border border-red-800/50 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-800 border border-red-200'}`}
                      >
                        Opt Out of {provider.name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Lifetimes */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-blue-900/30' : 'bg-gradient-to-br from-blue-100 to-indigo-100'}`}>
              ⏱️
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Cookie Duration</h2>
              <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  The cookies we use have different lifespans depending on their purpose:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className={`flex-shrink-0 px-2 py-1 rounded text-xs font-bold ${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>Session</span>
                    <div>
                      <strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser. Used for login sessions and temporary preferences.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`flex-shrink-0 px-2 py-1 rounded text-xs font-bold ${isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'}`}>1-30 days</span>
                    <div>
                      <strong>Short-term Cookies:</strong> Last between 1-30 days. Used for tracking shopping cart contents and temporary analytics.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`flex-shrink-0 px-2 py-1 rounded text-xs font-bold ${isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>6 months - 2 years</span>
                    <div>
                      <strong>Persistent Cookies:</strong> Remain on your device for 6 months to 2 years. Used for remembering preferences, language settings, and long-term analytics.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`flex-shrink-0 px-2 py-1 rounded text-xs font-bold ${isDark ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-800'}`}>Up to 5 years</span>
                    <div>
                      <strong>Long-term Cookies:</strong> Some advertising and analytics cookies may last up to 5 years. You can delete these at any time through your browser settings.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How to Manage Cookies */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-green-900/30' : 'bg-gradient-to-br from-green-100 to-emerald-100'}`}>
              ⚙️
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
              <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  You have several options for controlling how cookies are used on your device:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-green-50'} border ${isDark ? 'border-gray-700' : 'border-green-100'}`}>
                    <h4 className="font-bold mb-2">Browser Settings</h4>
                    <p className="text-sm mb-3">Most browsers allow you to block, delete, or warn you about cookies. Check your browser's help section for instructions.</p>
                    <div className="text-xs space-y-1">
                      <p>• Chrome: Settings → Privacy and Security → Cookies</p>
                      <p>• Firefox: Settings → Privacy & Security → Cookies</p>
                      <p>• Safari: Preferences → Privacy → Cookies</p>
                      <p>• Edge: Settings → Cookies and site permissions</p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-blue-50'} border ${isDark ? 'border-gray-700' : 'border-blue-100'}`}>
                    <h4 className="font-bold mb-2">Our Cookie Banner</h4>
                    <p className="text-sm mb-3">When you first visit our site, you'll see a cookie consent banner where you can:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Accept all cookies</li>
                      <li>• Reject non-essential cookies</li>
                      <li>• Customize your preferences</li>
                      <li>• Change settings anytime</li>
                    </ul>
                  </div>
                </div>

                <div className={`p-4 rounded-lg mt-4 ${isDark ? 'bg-gray-900/50' : 'bg-amber-50'} border ${isDark ? 'border-gray-700' : 'border-amber-100'}`}>
                  <h4 className="font-bold mb-2">Important Note</h4>
                  <p className="text-sm">
                    Disabling essential cookies may impact the functionality of our website. Features like shopping cart, user login, 
                    and checkout may not work properly if these cookies are blocked. You can still browse products and add items to your cart, 
                    but completing purchases may be affected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Do Not Track */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-indigo-900/30' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
              🚫
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Do Not Track Signals</h2>
              <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  Our website currently does not respond to "Do Not Track" (DNT) signals from browsers. However, you can achieve 
                  similar results by blocking cookies through your browser settings or using privacy-focused browser extensions.
                </p>
                <p>
                  We believe in transparency and giving you control. If you have concerns about tracking, we recommend using the 
                  cookie management options described above.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Updates to Cookie Policy */}
        <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
          <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <p className="mb-3">
              We may update this Cookie Policy from time to time to reflect changes in technology, regulations, or our business practices. 
              When we make updates, we will:
            </p>
            <ul className="space-y-2 mb-3">
              <li>• Update the "Last Updated" date at the top of this page</li>
              <li>• Notify you of significant changes via a banner on our website</li>
              <li>• If required by law, obtain your consent for material changes</li>
            </ul>
            <p>
              We encourage you to review this policy periodically to stay informed about our cookie practices. Continued use of our 
              website after changes constitutes your acceptance of the updated policy.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className={`rounded-2xl p-8 ${isDark ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-orange-800/50' : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200'} border`}>
          <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            If you have any questions about our cookie practices or need assistance with cookie settings, please contact our privacy team.
          </p>
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📧</span>
              <a href="mailto:privacy@shopeasy.com" className="text-blue-500 hover:underline">privacy@shopeasy.com</a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📞</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <button
          onClick={() => window.history.back()}
          className={`w-full md:w-auto px-6 py-3 rounded-xl font-medium transition-all ${
            isDark
              ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg'
              : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg'
          }`}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default Cookies;