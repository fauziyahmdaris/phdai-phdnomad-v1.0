import React from 'react';
import { AlertCircle, Heart } from 'lucide-react';
import OwlIcon from '@/components/icons/OwlIcon';

interface ComingSoonMessageProps {
  featureName: string;
}

const ComingSoonMessage: React.FC<ComingSoonMessageProps> = ({ featureName }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <img 
            src="/1-QASH ARIS_Profile Photo.png" 
            alt="Qash Aris - DrPhDAI Founder" 
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
          />
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
            <AlertCircle className="text-orange-600 dark:text-orange-400" size={32} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {featureName}
        </h2>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 mb-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center space-x-2 mb-3">
            <Heart className="text-red-500" size={20} />
            <span className="font-semibold text-gray-900 dark:text-white">A Message from Qash Aris</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            We're truly sorry for the error(s) and apologize—we're on it right away! Remember, Generative AI (GAI) can have hallucinations, biases, or fake statements, so kindly use your human judgment and intelligence for ethical collaboration. 
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-medium mt-3">
            Thank you, and Happy PhDing! 🤓
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back
          </button>
          
          <a
            href="/app"
            className="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Return to Dashboard
          </a>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <OwlIcon size={16} />
            <span>Powered by ethical AI innovation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonMessage;