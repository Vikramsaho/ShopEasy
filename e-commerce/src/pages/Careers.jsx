import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Careers = () => {
  const { isDark } = useTheme();

  const benefits = [
    { icon: "💰", title: "Competitive Salary", desc: "We offer industry-leading compensation packages and performance bonuses." },
    { icon: "🏥", title: "Health Benefits", desc: "Comprehensive health insurance for you and your family." },
    { icon: "🌴", title: "Flexible Time Off", desc: "Generous paid time off and flexible work arrangements." },
    { icon: "📚", title: "Learning & Growth", desc: "Continuous learning opportunities with training programs and conference budgets." },
    { icon: "🏠", title: "Remote Work Options", desc: "Work from home flexibility for eligible positions." },
    { icon: "🎉", title: "Fun Culture", desc: "Regular team events, celebrations, and a supportive work environment." }
  ];

  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / Bangalore",
      type: "Full-time",
      experience: "3-5 years",
      description: "We're looking for a skilled Frontend Developer with expertise in React.js to join our team. You'll be responsible for building and maintaining our customer-facing interfaces.",
      requirements: [
        "Strong proficiency in React.js and modern JavaScript",
        "Experience with state management libraries (Redux, Context API)",
        "Familiarity with Tailwind CSS or similar utility-first frameworks",
        "Understanding of RESTful APIs and performance optimization"
      ]
    },
    {
      title: "Backend Developer",
      department: "Engineering",
      location: "Remote / Mumbai",
      type: "Full-time",
      experience: "2-4 years",
      description: "Join our backend team to build scalable APIs and services that power millions of transactions. Work with Node.js, Express, and MongoDB.",
      requirements: [
        "Strong Node.js and Express.js experience",
        "Proficiency with MongoDB and database design",
        "Understanding of RESTful API design patterns",
        "Experience with authentication, security, and payment integrations"
      ]
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / Delhi NCR",
      type: "Full-time",
      experience: "4-7 years",
      description: "Lead product initiatives and shape the future of our e-commerce platform. Work closely with engineering, design, and business teams.",
      requirements: [
        "Proven experience in product management for e-commerce or consumer tech",
        "Strong analytical and problem-solving skills",
        "Excellent communication and stakeholder management",
        "Data-driven decision making approach"
      ]
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      description: "Create beautiful, intuitive user experiences for our platform. You'll work on web and mobile interfaces, design systems, and user flows.",
      requirements: [
        "Expert in Figma, Sketch, or similar design tools",
        "Strong portfolio showcasing web and mobile design projects",
        "Understanding of user-centered design principles",
        "Experience with design systems and prototyping"
      ]
    },
    {
      title: "Customer Support Specialist",
      department: "Operations",
      location: "Remote / Hyderabad",
      type: "Full-time",
      experience: "1-3 years",
      description: "Be the voice of ShopEasy and help our customers have the best shopping experience. Handle queries, resolve issues, and ensure satisfaction.",
      requirements: [
        "Excellent communication skills in English and Hindi",
        "Patience, empathy, and problem-solving mindset",
        "Ability to work in rotational shifts including weekends",
        "Previous customer service experience preferred"
      ]
    },
    {
      title: "Digital Marketing Manager",
      department: "Marketing",
      location: "Remote / Mumbai",
      type: "Full-time",
      experience: "3-5 years",
      description: "Lead our digital marketing efforts across channels including SEO, SEM, social media, and email marketing to drive growth and engagement.",
      requirements: [
        "Proven experience in digital marketing with e-commerce focus",
        "Hands-on experience with Google Ads, Facebook Ads, and analytics tools",
        "Strong understanding of SEO best practices",
        "Data-driven approach to campaign optimization"
      ]
    }
  ];

  const departments = ["Engineering", "Product", "Design", "Marketing", "Operations", "Finance", "HR", "Legal"];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-amber-50'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 via-amber-900/20 to-gray-900' : 'bg-gradient-to-br from-amber-600 via-orange-600 to-red-600'} py-16 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-5xl">🚀</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Careers at ShopEasy
          </h1>
          <p className="text-xl text-amber-100 mb-2">
            Build the future of e-commerce with us
          </p>
          <p className="text-sm text-amber-200">
            Join a team of passionate individuals reshaping online shopping in India
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Why Work With Us */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-3xl font-bold mb-6 text-center">Why Work With Us?</h2>
          <p className={`text-center text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            At ShopEasy, we believe that our people are our greatest asset. We foster an environment where creativity, 
            innovation, and growth are not just encouraged—they're expected. Here's what makes us different:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className={`p-5 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gradient-to-br from-amber-50 to-orange-50'} border ${isDark ? 'border-gray-700' : 'border-amber-100'}`}>
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

        {/* Our Culture */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-amber-900/30' : 'bg-gradient-to-br from-amber-100 to-orange-100'}`}>
              🌟
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Our Culture</h2>
              <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  We're a fast-moving, innovative team that's not afraid to take risks. We value transparency, collaboration, and a healthy work-life balance. 
                  Our open-office environment (or virtual equivalent for remote workers) encourages idea-sharing and cross-functional collaboration.
                </p>
                <p>
                  We celebrate diversity and believe that different perspectives make us stronger. Everyone's voice matters, and we're committed to creating 
                  an inclusive workplace where everyone can thrive.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <h2 className="text-3xl font-bold mb-6">Open Positions</h2>
          <p className={`mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Explore opportunities to join our growing team. All positions offer competitive compensation and growth potential.
          </p>

          <div className="space-y-6">
            {openPositions.map((position, idx) => (
              <div key={idx} className={`rounded-xl p-6 ${isDark ? 'bg-gray-900/30 border-gray-700' : 'bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-amber-100'} border`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className={`px-3 py-1 rounded-full ${isDark ? 'bg-sky-900/50 text-sky-300' : 'bg-sky-100 text-sky-800'}`}>
                        {position.department}
                      </span>
                      <span className={`px-3 py-1 rounded-full ${isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'}`}>
                        {position.location}
                      </span>
                      <span className={`px-3 py-1 rounded-full ${isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                        {position.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full ${isDark ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-800'}`}>
                        {position.experience}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{position.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Requirements:</h4>
                  <ul className={`space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {position.requirements.map((req, reqIdx) => (
                      <li key={reqIdx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`px-6 py-2 rounded-lg font-medium ${isDark ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-orange-900/30' : 'bg-gradient-to-br from-orange-100 to-red-100'}`}>
              🏛️
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Our Departments</h2>
              <div className="flex flex-wrap gap-3">
                {departments.map((dept, idx) => (
                  <span 
                    key={idx} 
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${isDark ? 'bg-gray-900/50 border border-gray-700 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'}`}
                  >
                    {dept}
                  </span>
                ))}
              </div>
              <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                We have opportunities across all these departments and more. Even if you don't see a perfect match above, 
                we're always looking for talented individuals to join our team.
              </p>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className={`rounded-2xl p-8 mb-12 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${isDark ? 'bg-red-900/30' : 'bg-gradient-to-br from-red-100 to-pink-100'}`}>
              📋
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">How to Apply</h2>
              <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">1</span>
                  <div>
                    <h4 className="font-bold">Browse Open Positions</h4>
                    <p className="text-sm">Find a role that matches your skills and interests from our listings above.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">2</span>
                  <div>
                    <h4 className="font-bold">Submit Your Application</h4>
                    <p className="text-sm">Click "Apply Now" on the position and fill out the application form with your resume and details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">3</span>
                  <div>
                    <h4 className="font-bold">Initial Screening</h4>
                    <p className="text-sm">Our HR team will review your application and reach out for an initial conversation if there's a match.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">4</span>
                  <div>
                    <h4 className="font-bold">Interviews</h4>
                    <p className="text-sm">Qualified candidates will go through technical and cultural fit interviews with the team.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">5</span>
                  <div>
                    <h4 className="font-bold">Offer & Onboarding</h4>
                    <p className="text-sm">Successful candidates receive an offer and are onboarded into our ShopEasy family!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className={`rounded-2xl p-8 text-center ${isDark ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-amber-800/50' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'} border`}>
          <h2 className="text-2xl font-bold mb-4">Questions About a Career at ShopEasy?</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            We'd love to hear from you. Reach out to our recruitment team for any queries about open positions or the application process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:careers@shopeasy.com" 
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${isDark ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}
            >
              <span>📧</span> careers@shopeasy.com
            </a>
            <button className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>
              <span>💬</span> Chat with Recruiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;