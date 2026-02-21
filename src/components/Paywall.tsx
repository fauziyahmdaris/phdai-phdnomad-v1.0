import { useState } from 'react';
import { activateWithLicenseKey } from '../plan';

const Paywall = () => {
  const [licenseKey, setLicenseKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activateWithLicenseKey(licenseKey)) {
      alert('License activated! Reloading application...');
      window.location.reload();
    } else {
      alert('Invalid license key. Please check your email for the correct key.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          🚀 Unlock drphdai.my
        </h1>
        <p className="mb-2 text-xl text-gray-600 md:text-2xl">
          AI-Powered PhD Companion
        </p>
        <p className="text-lg text-gray-500">
          Get lifetime access to all current features with a one-time payment
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 mb-8 md:grid-cols-2">
        {/* Left Column - Purchase */}
        <div className="p-8 border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Lifetime Access
            </h2>
            <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-green-800 bg-green-100 rounded-full">
              Most Popular
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900 md:text-5xl">$9.90</span>
              <span className="ml-2 text-xl text-gray-600">one-time</span>
            </div>
          </div>

          <ul className="mb-8 space-y-4">
            {[
              "Full access to all current MVP features",
              "No recurring fees - pay once, use forever",
              "Perfect for PhD students and researchers",
              "Basic access support included",
              "Lifetime updates to the current MVP version"
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-4 text-xl font-semibold text-center text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Lifetime Access - $9.90
          </a>

          <p className="mt-4 text-lg text-center text-gray-500">
            Secure payment via Stripe • No subscription
          </p>
        </div>

        {/* Right Column - License Activation */}
        <div className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Already Purchased?
            </h2>
            <p className="text-lg text-gray-600">
              Enter your license key to activate your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="licenseKey" className="block mb-2 text-lg font-medium text-gray-700">
                License Key
              </label>
              <input
                id="licenseKey"
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="Enter your license key (e.g., DRPHD-AI9X-7B2C-8D3E)"
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-4 text-lg font-semibold text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800"
            >
              Activate License
            </button>
          </form>

          <div className="p-4 mt-6 border border-yellow-200 rounded-lg bg-yellow-50">
            <p className="text-lg text-center text-yellow-800">
              <strong>Note:</strong> This is the current MVP version with frozen features. 
              Your purchase grants lifetime access to this specific version.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="p-8 border border-gray-200 bg-gray-50 rounded-2xl">
        <h3 className="mb-8 text-2xl font-bold text-center text-gray-900 md:text-3xl">
          Frequently Asked Questions
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-xl font-semibold text-gray-900">What do I get with this purchase?</h4>
            <p className="text-lg text-gray-600">
              You get lifetime access to all current features of drphdai.my MVP. This is a one-time payment with no recurring fees.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xl font-semibold text-gray-900">Will there be updates to this version?</h4>
            <p className="text-lg text-gray-600">
              No, this MVP version is frozen. Your purchase gives you access to the features as they exist today. 
              Future enhanced versions may be released separately.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xl font-semibold text-gray-900">How do I get my license key?</h4>
            <p className="text-lg text-gray-600">
              After payment, you'll receive your unique license key via email. Enter it above to activate your account.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xl font-semibold text-gray-900">What if I need help?</h4>
            <p className="text-lg text-gray-600">
              Basic access support is included. If you have issues with activation or accessing features, 
              please contact us with your license key.
            </p>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-500">
          🔒 Secure payment • 💰 One-time fee • 🚀 Instant access
        </p>
      </div>
    </div>
  );
};

export default Paywall;