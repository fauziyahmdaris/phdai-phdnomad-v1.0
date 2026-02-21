import React, { useState } from 'react';
import { Coffee, Heart, Gift, X, Users } from 'lucide-react';

interface BuyMeCoffeeProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const CheckCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12l2 2 4-4"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const BuyMeCoffee: React.FC<BuyMeCoffeeProps> = ({ isVisible = true, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (onClose) onClose();
  };

  const handleContribute = () => {
    // Redirect to the actual Buy Me a Coffee page
    window.open('https://buymeacoffee.com/qasharis', '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Buy Me Coffee Button */}
      <button
        onClick={handleOpenModal}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
      >
        <Coffee size={20} />
        <span className="font-medium">Buy Me a Coffee ☕ + Get Free eBook!</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Coffee className="text-orange-600 dark:text-orange-400" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Support DrPhDAI
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Help build the future of AI research tools
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Message */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Heart className="text-red-500" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Your support makes a difference!
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  DrPhDAI is completely free to use with limited features. Your optional contribution helps fund development, 
                  PhD research, and keeps the platform growing. As a thank you, you'll receive exclusive eBooks!
                </p>
              </div>

              {/* Contribution Options */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-center">
                  Choose Your Package (50% OFF - Valid until Sept 30, 2025!)
                </h3>
                <div className="space-y-3">
                  {[
                    { 
                      amount: 'Free', 
                      label: 'PhD Starter', 
                      description: 'Explore features with view-only access',
                      features: ['View all features', 'Browse content', 'Pre-register for VIP access']
                    },
                    { 
                      amount: 'USD3 (RM12.90)', 
                      label: 'DrPhDAI VIP', 
                      description: 'LIMITED SPECIAL until Sep 30, 2025!',
                      features: ['Unlimited access to ALL features', 'FREE "F1 DRPHD Templates"', 'Priority support', 'Scholarship draw entry', 'Early access to new features']
                    },
                    { 
                      amount: 'USD25/month', 
                      label: 'BETA Commercial', 
                      description: 'Starting October 2025',
                      features: ['All VIP features', 'Advanced AI models', 'Premium support', 'Consultant access']
                    },
                    { 
                      amount: 'Custom', 
                      label: 'Enterprise', 
                      description: 'Custom institutional plans',
                      features: ['Multi-user access', 'Admin dashboard', 'Custom branding', 'Dedicated support']
                    }
                  ].map((option, index) => (
                    <button
                      key={index}
                      onClick={() => option.amount === 'USD3 (RM12.90)' ? window.location.href = '/payment-methods' : handleContribute()}
                      className={`p-4 border rounded-lg transition-colors text-left ${
                        option.amount === 'USD3 (RM12.90)' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-700'
                          : option.amount === 'USD25/month'
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {option.label}
                        </span>
                        <span className={`font-bold ${
                          option.amount === 'USD3 (RM12.90)' ? 'text-blue-600' :
                          option.amount === 'USD25/month' ? 'text-purple-600' :
                          'text-gray-900 dark:text-white'
                        }`}>
                          {option.amount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {option.description}
                      </p>
                      <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-1">
                            <CheckCircle size={10} className="text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {option.amount === 'USD25/month' && (
                        <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                          🎯 BETA Phase: Commercial pricing starts October 2025
                      </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* VIP Special Offer */}
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-purple-700">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    🎉 Limited Special Offer - First 1,000 Users Only!
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 mb-3">
                    <li>• Unlimited access until September 30, 2025</li>
                    <li>• FREE "F1 DRPHD Templates" by Qash Aris</li>
                    <li>• Entry to RM1,000 scholarship draw</li>
                    <li>• Personal support from founder Qash Aris</li>
                  </ul>
                  <div className="space-y-2">
                    <a
                      href="https://forms.gle/Di28bZsBS6JERncg6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                    >
                      Step 1: Register via Google Form
                    </a>
                    <a
                      href="/payment-methods"
                      className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center text-sm font-medium"
                    >
                      Step 2: Make Payment
                    </a>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="space-y-3">
                <a
                  href="https://forms.gle/Di28bZsBS6JERncg6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
                >
                  <Users size={20} />
                  <span>Step 1: Register via Google Form</span>
                </a>
                <a
                  href="/payment-methods"
                    className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    Step 2: Get VIP Access - USD3 (RM12.90)
                  </a>
                </div>
              </div>

              {/* Rewards */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Gift className="text-purple-600 dark:text-purple-400" size={16} />
                  <span className="font-medium text-purple-900 dark:text-purple-100">
                    Thank You Gifts
                  </span>
                </div>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                  <li>• FREE "F1 DRPHD Templates" by Qash Aris</li>
                  <li>• Access to exclusive research community</li>
                  <li>• Monthly research insights newsletter</li>
                  <li>• Entry to RM1,000 scholarship draw</li>
                  </ul>
              </div>

              {/* Footer Note */}
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Payments are processed securely via Buy Me a Coffee. All contributions are non-refundable donations.
                  <br />
                  <span className="text-orange-600 dark:text-orange-400">
                    Terima kasih for supporting my research on AI-powered postgraduate education! 🙏
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyMeCoffee;