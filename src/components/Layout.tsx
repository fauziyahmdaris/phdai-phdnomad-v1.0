import React from 'react';
import { Outlet } from 'react-router-dom';
import QuickMenu from './QuickMenu';
import Footer from './Footer';
import { hasMVPAccess, activateWithLicenseKey, getPlan, clearPlan } from '../plan';

const Layout: React.FC = () => {
  // Remove old activation shortcuts since we're using license keys now
  // Keep only deactivate for testing purposes
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    const deactivate = url.searchParams.get('deactivate');

    if (deactivate === '1') {
      clearPlan();
      url.searchParams.delete('deactivate');
      window.history.replaceState({}, '', url.toString());
      window.location.reload();
    }
  }

  const hasAccess = hasMVPAccess();
  const planInfo = getPlan();

  const handleLicenseLogin = () => {
    const licenseKey = prompt('Enter your license key to access all features:');
    if (licenseKey) {
      if (activateWithLicenseKey(licenseKey)) {
        alert('Access granted! Reloading application...');
        window.location.reload();
      } else {
        alert('Invalid license key. Please check your email for the correct key.');
      }
    }
  };

  return (
    <>
      <QuickMenu />
      <main className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
        {/* Access Status Banner */}
        {!hasAccess && (
          <div className="p-4 mb-4 text-sm text-yellow-900 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/40 dark:text-yellow-100 dark:border-yellow-800">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <strong>Visitor Access:</strong> You're exploring drphdai.my with limited access. 
                To use all features, purchase lifetime access or login with your license key.
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <button
                  onClick={handleLicenseLogin}
                  className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-700"
                >
                  Login with License Key
                </button>
                <a 
                  href="https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-white transition bg-green-600 rounded hover:bg-green-700"
                >
                  Buy Lifetime Access - $9.90
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Paid User Status Banner */}
        {hasAccess && (
          <div className="p-4 mb-4 text-sm border rounded-lg text-emerald-900 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-100 dark:border-emerald-800">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <strong>Full Access Active:</strong> You have lifetime access to all drphdai.my MVP features. 
                License: {planInfo.licenseKey || 'Active'}
              </div>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to logout?')) {
                    clearPlan();
                    window.location.reload();
                  }
                }}
                className="flex-shrink-0 px-3 py-1 text-sm text-white transition bg-gray-600 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Feature Access Restrictions */}
        {!hasAccess && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            {/* This overlay allows visitors to see the app but not interact with protected features */}
            <div 
              className="absolute inset-0 bg-transparent"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLicenseLogin();
              }}
              style={{ pointerEvents: 'auto', cursor: 'not-allowed' }}
            />
          </div>
        )}

        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;