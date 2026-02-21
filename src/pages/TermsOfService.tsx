import React from 'react';
import { FileText, Scale, Shield, AlertTriangle, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Scale size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Terms of Service</h1>
            <p className="text-purple-100">
              Legal agreement for using DrPhDAI platform
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm text-purple-100">
            <strong>Last Updated:</strong> June 20, 2025 | 
            <strong> Effective Date:</strong> June 20, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          
          {/* Acceptance of Terms */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">1. Acceptance of Terms</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              By using DrPhDAI, you agree to these Terms of Use. This is a legal agreement between you and 
              <strong> Global International Technology Sdn Bhd</strong> regarding your use of the platform.
            </p>
          </section>

          {/* Description of Service */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300">
              DrPhDAI is an AI-powered assistant designed to support PhD students in writing literature reviews and organizing academic sources. 
              It is currently offered <strong>for free during its Pre-MVP (pilot study) phase</strong>, with optional contributions via the 
              "Buy Me a Coffee\" feature.
            </p>
          </section>

          {/* User Accounts */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Accounts</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">You may create an account via:</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Email/password (normal users)</li>
              <li>Gmail sign-in (freemium/pilot users)</li>
            </ul>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> You are responsible for your account security. Please do not share your credentials.
              </p>
            </div>
          </section>

          {/* FREEMIUM Users */}
          <section className="mb-8">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
              <h2 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-3">
                4. FREEMIUM Users (Pilot Study)
              </h2>
              <p className="text-purple-800 dark:text-purple-200 mb-3">
                Freemium access is limited to 100 users. By registering via Gmail and completing the pilot registration form, you agree that:
              </p>
              <ul className="list-disc list-inside text-purple-800 dark:text-purple-200 space-y-2">
                <li>Your activity data may be used anonymously for PhD research.</li>
                <li>You will receive access to exclusive freemium features and rewards (e.g., free eBooks).</li>
              </ul>
            </div>
          </section>

          {/* Use of AI Tools */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="text-green-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">5. Use of AI Tools</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              DrPhDAI integrates external AI APIs (Gemini, ChatGPT, Perplexity). AI outputs are intended for academic support only. 
              Users must <strong>critically evaluate all AI-generated content</strong> and remain responsible for maintaining academic integrity.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Academic Integrity Reminder:</strong> Always verify AI outputs, cite sources properly, and maintain originality in your research work.
              </p>
            </div>
          </section>

          {/* Payments and Contributions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Payments and Contributions</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All users may access the webapp for free with view-only access. VIP access can be obtained through our special subscription package. 
              Payments are non-refundable and considered contributions to research development. VIP supporters will receive Exclusive/FREE "F1 DRPHD Templates" as gifts.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                <strong>💝 Thank You Gifts:</strong> VIP supporters receive Exclusive/FREE "F1 DRPHD Templates\" written by Qash Aris as appreciation for supporting DrPhDAI development.
              </p>
            </div>
          </section>

          {/* User Content */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. User Content</h2>
            <p className="text-gray-700 dark:text-gray-300">
              You retain full ownership of the research notes, entries, and content you create in DrPhDAI. 
              We do not use your content for commercial purposes.
            </p>
          </section>

          {/* Prohibited Conduct */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="text-red-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">8. Prohibited Conduct</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Users may not:</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Use DrPhDAI for plagiarism or unethical academic behavior</li>
              <li>Submit harmful or offensive content</li>
              <li>Reverse engineer or clone the app</li>
              <li>Use bots or scripts to abuse features</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300">
              All branding, app design, and system architecture are owned by Global International Technology Sdn Bhd. 
              The name "DrPhDAI" is protected under local and international IP law.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Disclaimer</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                The Service is provided "as-is." We make no guarantees about the accuracy of AI responses or the fitness of the platform 
                for any particular academic use.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We are not liable for any damages, academic consequences, or losses resulting from your use of the platform.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms are governed by the laws of <strong>Malaysia</strong>. Any disputes must be addressed in Malaysian jurisdiction.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">13. Contact</h2>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                For support, questions, or concerns:
              </p>
              <div className="text-gray-900 dark:text-white">
                <p><strong>Fauziyah Md Aris (Qash Aris)</strong></p>
                <p>Email: <a href="mailto:qashmyphd@gmail.com" className="text-blue-600 dark:text-blue-400 underline">qashmyphd@gmail.com</a></p>
              </div>
            </div>
          </section>

          {/* Closing Note */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 text-white text-center">
              <p className="text-lg font-semibold mb-2">
                🌟 Building the Future of Academic Research
              </p>
              <p className="text-purple-100">
                You're setting a gold standard for responsible, ethical AI in academic tools. 
                Thank you for being part of the DrPhDAI journey! 💛📚
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;