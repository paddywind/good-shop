// /frontend/app/(admin)/layout.js (FINAL REVISED VERSION)
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // <-- usePathname imported
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

// Icons (Unchanged)
const DashboardIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

export default function AdminLayout({ children }) {
  const { isAuthenticated, isAdmin, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  // --- 1. Authentication and Redirection Check ---
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) router.push("/login");
      else if (!isAdmin) router.push("/");
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  // --- 2. Loading State Display ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-3"></div>
          <p className="text-lg text-gray-700 font-medium">Checking admin access...</p>
        </div>
      </div>
    );
  }

  // --- 3. Render Admin Interface ---
  if (isAdmin) {
    // Check if the current path is the root of the admin section
    // Assumes the admin index is at /admin or /admin
    const isDashboardIndex = pathname === '/admin' || pathname === '/admin';

    return (
      <div className="flex bg-gray-100">

        {/* --- Sidebar (Desktop Only) --- */}
        <aside
          // h-screen and fixed prevents the sidebar from scrolling with the content
          className="hidden lg:flex w-72 h-screen bg-gray-800 flex-col shadow-xl fixed left-0 top-0 z-50"
        >
          {/* Sidebar Header/Branding */}
          <div className="h-16 flex items-center justify-center bg-gray-900 flex-shrink-0">
            <span className="text-white font-bold text-xl tracking-wide">Admin Panel</span>
          </div>

          {/* Main Navigation (Scrollable Area) */}
          <nav className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition"
                >
                  <DashboardIcon />
                  Manage Blog Posts
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer/Logout Area */}
          <div className="p-4 border-t border-gray-700 flex-shrink-0">
            <button
              onClick={logout}
              className="flex items-center text-red-400 hover:text-red-300 transition text-sm font-medium"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </aside>

        {/* --- Main Content Area --- */}
        <div
          // lg:ml-72 ensures content starts after the 72px wide fixed sidebar
          className="flex-1 lg:ml-72 flex flex-col min-h-screen"
        >
          <main className="flex-1 p-4 sm:p-8">

            {/* Mobile back navigation: Renders ONLY if NOT on the admin index page */}
            {!isDashboardIndex && (
              <div className="mb-4 lg:hidden">
                <Link
                  href="/admin"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  &larr; Back to Dashboard
                </Link>
                <hr className="mt-2 border-gray-200" />
              </div>
            )}

            {children}
          </main>
        </div>
      </div>
    );
  }

  // --- 4. Fallback (Waiting for redirect or denied access) ---
  return null;
}