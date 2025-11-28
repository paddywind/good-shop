// /frontend/app/(admin)/layout.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminLayout({ children }) {
  // Get all necessary state and functions from the AuthContext
  const { isAuthenticated, isAdmin, user, isLoading, logout } = useAuth();
  const router = useRouter();

  // 1. Authentication Check Effect
  useEffect(() => {
    // Only run redirection logic AFTER the initial check against localStorage is complete
    if (!isLoading) {
      if (!isAuthenticated) {
        // Case 1: Not logged in -> Redirect to login page
        router.push('/login');
      } else if (isAdmin === false) {
        // Case 2: Logged in but not an Admin -> Redirect to public home page
        router.push('/');
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  // 2. Loading State Display
  if (isLoading) {
    // Display a loader while checking the JWT in localStorage
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Checking authentication status...</p>
      </div>
    );
  }

  // 3. Render Admin Interface (If isAuthenticated AND isAdmin is true)
  if (isAdmin) {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
          <div className="p-4 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
          <nav className="p-4">
            <h3 className="text-sm uppercase text-gray-400 mb-2">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/dashboard" className="block p-2 rounded hover:bg-gray-700 transition">
                  Dashboard 📊
                </Link>
              </li>
              <li>
                <Link href="/admin/products/add" className="block p-2 rounded hover:bg-gray-700 transition">
                  Add Product 📦
                </Link>
              </li>
              <li>
                <Link href="/admin/blog/add" className="block p-2 rounded hover:bg-gray-700 transition">
                  Add Blog Post ✍️
                </Link>
              </li>
              {/* Future: Add links to Manage Products/Blog Lists for Edit/Delete */}
            </ul>
          </nav>

          {/* Footer/Logout Area */}
          <div className="p-4 border-t border-gray-700 absolute bottom-0 w-64">
            <p className="text-xs">Logged in as: **{user.email}**</p>
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300 text-sm mt-1"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 bg-gray-50">
          {children} {/* Renders the specific admin page (e.g., dashboard, add product) */}
        </main>
      </div>
    );
  }

  // If isLoading is false, but neither of the redirect conditions met (e.g., waiting for redirect), return null
  return null;
}