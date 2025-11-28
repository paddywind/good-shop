// /frontend/app/(public)/login/page.js
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (!success) setError('Invalid email or password.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 shadow-xl rounded-xl p-8 border border-gray-200 dark:border-neutral-700">

        <h1 className="text-3xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-6">
          Welcome Back
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full mt-1 px-3 py-2 rounded-lg border 
                border-gray-300 dark:border-neutral-600
                bg-white dark:bg-neutral-800
                text-neutral-900 dark:text-neutral-100
                focus:ring-2 focus:ring-indigo-500 focus:outline-none
              "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full mt-1 px-3 py-2 rounded-lg border
                border-gray-300 dark:border-neutral-600
                bg-white dark:bg-neutral-800
                text-neutral-900 dark:text-neutral-100
                focus:ring-2 focus:ring-indigo-500 focus:outline-none
              "
              required
            />
          </div>

          <button
            type="submit"
            className="
              w-full py-2.5 rounded-lg font-medium 
              bg-indigo-600 hover:bg-indigo-700 
              text-white transition
            "
          >
            Login
          </button>

        </form>

        {/* Signup link */}
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
