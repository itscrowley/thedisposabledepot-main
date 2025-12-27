'use client';

import { useState } from 'react';
import { checkLogin } from './action'; // Make sure path is correct

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await checkLogin(formData);

      if (result.success) {
        // ✅ FORCE REDIRECT: Yeh page ko refresh karke dashboard kholega
        window.location.href = '/admin';
      } else {
        setError(result.message || 'Login failed');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-2">TDD Admin</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input name="email" type="email" required defaultValue="admin@tdd.com"
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} required
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500">
                {showPassword ? "👁️" : "🔒"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg">
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}