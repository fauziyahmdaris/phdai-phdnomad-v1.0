import React from 'react';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
            <p className="text-blue-100">
              How we protect and handle your research data
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm text-blue-100">
            <strong>Last Updated:</strong> June 20, 2025 | 
            <strong> Effective Date:</strong> June 20, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          
          {/* Introduction */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">1. Introduction</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Welcome to <strong>DrPhDAI</strong>, a platform created and operated by <strong>Global International Technology Sdn Bhd (1239026-H)</strong>. 
              DrPhDAI is a prototype AI-powered web application built for postgraduate researchers, currently offered free under a pre-MVP release 
              and as part of a PhD research pilot study. This Privacy Policy outlines how we collect, use, store, and protect your information 
              when you use DrPhDAI.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing and using DrPhDAI, you consent to the practices described in this Privacy Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="text-green-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">2. What Information We Collect</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We collect the following types of data when you interact with DrPhDAI:
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  a. Personal Information (Voluntarily Provided)
                </h3>
                <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>University affiliation</li>
                  <li>Login details (email or Gmail account for authentication)</li>
                  <li>Voluntary payment data (e.g., proof of contribution via "Buy Me a Coffee")</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  b. Research Data (User-Generated Content)
                </h3>
                <ul className="list-disc list-inside text-green-800 dark:text-green-200 space-y-1">
                  <li>Literature Review Matrix (LRM) entries</li>
                  <li>Abstracts, notes, reference materials</li>
                  <li>Uploaded files, project metadata</li>
                </ul>
                <div className="mt-3 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded border-l-4 border-yellow-500">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>Note:</strong> Your research content is your intellectual property. We do not train AI models using your raw Research Data without explicit consent.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  c. Usage Data (Automatically Collected)
                </h3>
                <ul className="list-disc list-inside text-purple-800 dark:text-purple-200 space-y-1">
                  <li>IP address, device type, browser</li>
                  <li>Date/time of access</li>
                  <li>Button clicks and navigation patterns</li>
                  <li>AI feature usage logs (e.g., synthesis, reference generation)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why We Collect Information */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Lock className="text-purple-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">3. Why We Collect Your Information</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Enable account registration and login</li>
              <li>Store and manage your LRM projects securely</li>
              <li>Provide AI-powered support for your research writing</li>
              <li>Improve platform features and usability</li>
              <li>Send updates about your activity or reward gifts (e.g., eBooks)</li>
              <li>Conduct research under the PhD pilot study (freemium users only)</li>
            </ul>
          </section>

          {/* Pilot Study Participation */}
          <section className="mb-8">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-700">
              <h2 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-3">
                4. Pilot Study Participation
              </h2>
              <p className="text-orange-800 dark:text-orange-200 mb-3">
                If you sign up as a <strong>FREEMIUM user</strong> or access DrPhDAI via the pilot program:
              </p>
              <ul className="list-disc list-inside text-orange-800 dark:text-orange-200 space-y-2">
                <li>You agree that anonymized activity data (e.g., number of papers analyzed, AI feature usage) may be used for academic research by the platform creator as part of her PhD study.</li>
                <li>No personally identifiable research content or files will be shared.</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">We may use third-party services like:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Supabase (authentication, database)</li>
                  <li>Google Cloud (Gemini AI)</li>
                  <li>OpenAI, Perplexity (external links)</li>
                  <li>BuyMeACoffee/Stripe/PayPal/Billplz (payment)</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              These services have their own privacy policies. We only share minimal data necessary for functionality (e.g., your email during sign-in).
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We use reasonable administrative, technical, and physical safeguards to protect your data. While we strive to secure your information, 
              no system can be guaranteed 100% secure.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Request access to or deletion of your account and personal data</li>
              <li>Revoke consent for research participation (if a Freemium pilot user)</li>
              <li>Request correction of any inaccurate information</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                Contact us at <a href="mailto:qashmyphd@gmail.com" className="font-semibold underline">qashmyphd@gmail.com</a> to exercise these rights.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">8. Contact</h2>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                If you have any questions about this Privacy Policy, please contact:
              </p>
              <div className="text-gray-900 dark:text-white">
                <p><strong>Fauziyah Md Aris (Qash Aris)</strong></p>
                <p>Global International Technology Sdn Bhd</p>
                <p>Email: <a href="mailto:qashmyphd@gmail.com" className="text-blue-600 dark:text-blue-400 underline">qashmyphd@gmail.com</a></p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;