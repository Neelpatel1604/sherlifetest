// src/components/Login.tsx
import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

// Dummy LoadingSpinner component; replace with your own spinner if needed.
const LoadingSpinner: React.FC = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    ></path>
  </svg>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // Expected to be an email.
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
      // Change: Check if the user's email is verified.
      if (userCredential.user.emailVerified) {
        // If verified, navigate to your protected area (e.g., home).
        navigate('/');
      } else {
        // If not verified, display a specific error and optionally sign out.
        setError('EMAIL_NOT_VERIFIED');
        // Optionally: sign out the user.
        // await auth.signOut();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Change: Provide a function to resend the verification email.
  const handleResendVerification = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
        alert('Verification email resent! Please check your inbox.');
      } catch (err) {
        console.error('Error resending verification email:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome to SherLife</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="text"
              placeholder="Email (or Username)"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? <LoadingSpinner /> : 'Sign In'}
            </button>
          </div>
        </form>
        {/* Change: If the error is due to an unverified email, offer to resend the verification email. */}
        {error === 'EMAIL_NOT_VERIFIED' && (
          <div className="mt-4 text-center">
            <button
              onClick={handleResendVerification}
              className="text-blue-600 hover:underline"
            >
              Resend Verification Email
            </button>
          </div>
        )}
        <div className="text-center mt-4">
          <Link to="/reset-password" className="text-sm text-indigo-600 hover:text-indigo-500">
            Forgot your password? Reset Password
          </Link>
        </div>
        <div className="text-center mt-4">
          <Link to="/signup" className="text-sm text-indigo-600 hover:text-indigo-500">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
