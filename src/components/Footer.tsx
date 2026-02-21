import React from 'react';
import { Heart, Mail, Shield, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/1-QASH ARIS_Profile Photo.png" 
                alt="Qash Aris - DrPhDAI Founder" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">DrPhDAI</h3>
                <p className="text-gray-400 text-sm">Your Empathetic AI PhD Coach</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              World's #1 AI-Powered "PhD" Research Companion: Your Empathetic AI Postgraduate Education. 
              The world's first AI-powered and AI-empowered coaching and PhD guidance platform, 
              helping PhD students navigate the research journey to a successful and timely graduation.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:qashmyphd@gmail.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={16} />
                <span className="text-sm">qashmyphd@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/app" className="text-gray-400 hover:text-white transition-colors text-sm">Dashboard</a></li>
              <li><a href="/app/navigator" className="text-gray-400 hover:text-white transition-colors text-sm">Research Navigator</a></li>
              <li><a href="/app/matrix" className="text-gray-400 hover:text-white transition-colors text-sm">Literature Matrix</a></li>
              <li><a href="/app/thesis-weaver" className="text-gray-400 hover:text-white transition-colors text-sm">Thesis Weaver</a></li>
              <li><a href="/app/ai-tools" className="text-gray-400 hover:text-white transition-colors text-sm">AI Tools</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/app/user-guide" className="text-gray-400 hover:text-white transition-colors text-sm">User Guide</a></li>
              <li><a href="/app/help-support" className="text-gray-400 hover:text-white transition-colors text-sm">Help & Support</a></li>
              <li><a href="/app/mentor" className="text-gray-400 hover:text-white transition-colors text-sm">AI Mentor</a></li>
              <li><a href="/app/google-drive" className="text-gray-400 hover:text-white transition-colors text-sm">Google Drive</a></li>
              <li><a href="/starter-kit" className="text-gray-400 hover:text-white transition-colors text-sm">Research Starter Kit</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="flex flex-wrap items-center justify-center space-x-6">
            <a
              href="/about"
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <span>About Us</span>
            </a>
            <a
              href="/founder-story"
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <span>The Founder Story</span>
            </a>
            <a
              href="/privacy-policy"
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <Shield size={14} />
              <span>Privacy Policy</span>
            </a>
            <a
              href="/terms-of-service"
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <FileText size={14} />
              <span>Terms of Service</span>
            </a>
          </div>
        </div>

        {/* Copyright and Attribution */}
        <div className="border-t border-gray-800 pt-6">
          <div className="text-center space-y-3">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              Copyright © 2025 Fauziyah Md Aris, Global International Technology Sdn Bhd (1239026-H). All rights reserved.
            </p>
            
            {/* Attribution */}
            <div className="bg-gray-800 rounded-lg p-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="text-red-500" size={16} />
                <span className="text-gray-300 font-medium text-sm">Original Research & Development</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                🎓 Original idea, ideation, design, and development by <strong className="text-white">Fauziyah Md Aris (Qash Aris)</strong>, 
                originating from her PhD research on <em>"The Development and Evaluation of an AI-Powered Microlearning Platform 
                for Postgraduate Education."</em>
              </p>
            </div>
            {/* Support Message */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-white text-sm">
                💛 Building the future of Postgraduate Education with AI-powered Academic Research tools. 
                

                <span className="text-blue-100">Thank you for being part of the DrPhDAI journey!</span>
              </p>
            </div>

            {/* APA Citation Notice (left-aligned) */}
            <div className="mt-4 text-gray-400 text-xs max-w-4xl mx-auto leading-relaxed">
              <div className="text-left">
                <p className="font-semibold text-gray-300">When using DrPhDAI platform for your thesis writing and/or research workflow, we recommend acknowledging the source with this APA Citation (Website):</p>
                <p className="mt-1">
                  Fauziyah Md Aris [Qash Aris]. (2025, April 26). <em>DrPhDAI - World’s #1 AI-Powered PhD Research Assistant</em>. DrPhDAI - Your Empathetic AI PhD Coach. Retrieved [Access date], from <a href="https://drphdai.my" className="underline hover:text-white">https://drphdai.my</a>
                </p>
                <div className="mt-3 flex items-center gap-2 text-gray-400">
                  <span className="text-sm">⚡ Powered by <strong className="text-white">Windsurf</strong> · 🤝 Empowered by <strong className="text-white">Qash Aris</strong></span>
                  <img src="/1-QASH ARIS_Profile Photo.png" alt="Qash Aris" className="w-5 h-5 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
