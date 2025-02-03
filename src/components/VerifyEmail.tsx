// src/components/VerifyEmail.tsx
import React from 'react';
import { auth } from '../firebase/config';
import { sendEmailVerification } from 'firebase/auth';

const VerifyEmail: React.FC = () => {
  const handleResend = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
        alert('Verification email resent! Please check your inbox.');
      } catch (error) {
        console.error('Error sending email verification:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Verify Your Email</h2>
        <p className="mt-2 text-sm text-gray-600">
          A verification link has been sent to your email. Please verify your email to continue.
        </p>
        <button
          onClick={handleResend}
          className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
