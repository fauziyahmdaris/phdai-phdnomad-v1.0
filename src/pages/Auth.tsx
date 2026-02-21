import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, CaseSensitive as University, Chrome, ArrowLeft } from 'lucide-react';
import OwlIcon from '@/components/icons/OwlIcon';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isFreemium, setIsFreemium] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    institution: '',
    department: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const ok = await login(formData.username, formData.password);
        if (!ok) throw new Error('Login failed. Check your User ID and password.');
        navigate('/app');
      } else {
        const userProfile = {
          full_name: formData.fullName,
          institution: formData.institution,
          department: formData.department,
          phone: formData.phone
        };

        const ok = await signup(formData.username, formData.password, userProfile);
        if (!ok) {
          throw new Error(
            'Signup failed. Only approved User IDs can register, phone must start with +601, and pre-created accounts should use Sign In.'
          );
        }
        
        // Show success message
        setSuccess('Registration successful! You can now sign in.');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Placeholder for Google OAuth (not available in mock AuthContext)
      setSuccess('Google sign-in is not available in this build. Please use email/password.');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Placeholder reset for mock AuthContext
      if (!resetEmail) throw new Error('Please enter your email.');
      setSuccess('Password reset instructions have been sent to your email.');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // For testing purposes - auto-fill credentials
  const fillTestCredentials = () => {
    setFormData({
      ...formData,
      username: 'fauziyahmdarisakaqasharis',
      password: ''
    });
  };

  if (showForgotPassword) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md p-8 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-600 rounded-full">
              <img 
                src="/1-QASH ARIS_Profile Photo.png" 
                alt="Qash Aris - DrPhDAI Founder" 
                className="object-cover w-8 h-8 rounded-full"
              />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Reset Your Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? 'Your empathetic AI PhD coach awaits!' : 'Begin your journey to PhD success with your AI coach'}
            </p>
          </div>

          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-700">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="flex items-center justify-center mx-auto text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-600 rounded-full">
            <OwlIcon size={24} />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Welcome Back!' : 'Join DrPhDAI'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? 'Sign in to continue your research journey' : 'Start your AI-powered research journey'}
          </p>
        </div>

        {/* Account Type Selection (for registration) */}
        {!isLogin && (
          <div className="mb-6">
            <div className="flex p-1 space-x-2 bg-gray-100 rounded-lg dark:bg-gray-700">
              <button
                type="button"
                onClick={() => setIsFreemium(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isFreemium
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Normal User
              </button>
              <button
                type="button"
                onClick={() => setIsFreemium(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isFreemium
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Freemium (Pilot)
              </button>
            </div>
            {isFreemium && (
              <div className="p-3 mt-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  🎓 Join our PhD research pilot study! Limited to 100 participants. 
                  Get exclusive features and contribute to academic research.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Google Sign In (for Freemium users) */}
        {(!isLogin && isFreemium) || (isLogin) ? (
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center w-full px-4 py-3 mb-4 space-x-2 text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Chrome size={20} />
            <span>Continue with Google</span>
          </button>
        ) : null}

        {/* Divider */}
        {((!isLogin && isFreemium) || isLogin) && (
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white dark:bg-gray-800">or</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="relative">
                  <Mail className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Must start with +601"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Required for registration. Format must start with +601.
                </p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Institution
                </label>
                <div className="relative">
                  <University className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                    className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Your university/institution"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              User ID
            </label>
            <div className="relative">
              <Mail className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="e.g., fauziyahmdarisakaqasharis"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-700">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-3 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-700">
              <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Test Account Button */}
        {isLogin && (
          <div className="mt-4">
            <button
              onClick={fillTestCredentials}
              className="w-full px-4 py-2 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
              Use Test Account
            </button>
            <p className="mt-1 text-xs text-center text-gray-500 dark:text-gray-400">
              For testing purposes only
            </p>
          </div>
        )}

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;