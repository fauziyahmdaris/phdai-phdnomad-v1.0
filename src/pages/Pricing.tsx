import React, { useState } from 'react';
import { hasMVPAccess, activateWithLicenseKey, getPlan, clearPlan } from '../plan';

const Pricing: React.FC = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasAccess = hasMVPAccess();
  const planInfo = getPlan();

  const handleLicenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (activateWithLicenseKey(licenseKey)) {
      alert('License activated! You now have full access to all features.');
      window.location.reload();
    } else {
      alert('Invalid license key. Please check your email and try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
        <h1 className="text-2xl font-bold">Unlock drphdai.my</h1>
        <p className="mt-2 text-sm text-white/90">Get lifetime access to all current features with a one-time payment</p>
      </div>

      {/* One-Time Fee Card */}
      <div className="max-w-md mx-auto overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl dark:bg-gray-800 dark:border-gray-700">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Lifetime Access</h3>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900/40 dark:text-green-200">
              Popular
            </span>
          </div>
          
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">$9.90</span>
            <span className="ml-2 text-gray-600 dark:text-gray-300">one-time fee</span>
          </div>

          <ul className="mb-8 space-y-4">
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Full access to all current MVP features</span>
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">No recurring fees - pay once, use forever</span>
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Perfect for PhD students and researchers</span>
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Basic access support included</span>
            </li>
          </ul>

          <a
            href="https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-4 text-lg font-semibold text-center text-white transition duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Buy Now - $9.90
          </a>

          <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            Secure payment via Stripe • No subscription
          </p>
        </div>
      </div>

      {/* License Key Activation */}
      <div className="max-w-md p-8 mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-4 text-xl font-semibold text-center text-gray-900 dark:text-white">
          Already purchased?
        </h3>
        <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
          Enter your license key below to activate your account
        </p>
        
        <form onSubmit={handleLicenseSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              placeholder="Enter your license key (e.g., DRPHD-AI9X-7B2C-8D3E)"
              className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 font-semibold text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? 'Activating...' : 'Activate License'}
          </button>
        </form>

        <div className="p-4 mt-6 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
          <p className="text-sm text-center text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> This is the current MVP version with frozen features. 
            Your purchase grants lifetime access to this specific version.
          </p>
        </div>
      </div>

      {/* Current Access Status */}
      <div className="max-w-md p-4 mx-auto border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Current Access Status</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Status: <strong>{hasAccess ? 'Full Access Active' : 'Visitor Access'}</strong>
          {planInfo.licenseKey && (
            <span className="block mt-1">License: {planInfo.licenseKey}</span>
          )}
        </p>
        {hasAccess ? (
          <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
            ✅ You have full access to all drphdai.my features.
          </p>
        ) : (
          <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">
            🔒 Some features are limited. Purchase lifetime access to unlock everything.
          </p>
        )}
        {hasAccess && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to logout?')) {
                clearPlan();
                window.location.reload();
              }
            }}
            className="w-full px-4 py-2 mt-3 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto mt-12">
        <h3 className="mb-8 text-2xl font-bold text-center text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">What do I get with this purchase?</h4>
            <p className="text-gray-600 dark:text-gray-300">
              You get lifetime access to all current features of drphdai.my MVP. This is a one-time payment with no recurring fees.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Will there be updates to this version?</h4>
            <p className="text-gray-600 dark:text-gray-300">
              No, this MVP version is frozen. Your purchase gives you access to the features as they exist today. 
              Future enhanced versions may be released separately.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">How do I get my license key?</h4>
            <p className="text-gray-600 dark:text-gray-300">
              After payment, you'll receive your unique license key via email. Enter it above to activate your account.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">What if I need help?</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Basic access support is included. If you have issues with activation or accessing features, 
              please contact us with your license key.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;