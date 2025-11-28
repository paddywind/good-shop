// /frontend/components/Navbar.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Logic to get user initial from email (e.g., "A")
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : '?';

  // Define public links
  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "All Blog Posts", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // Handlers to close menus after navigation/action
  const handleLinkClick = () => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  };

  const handleUserButtonClick = () => {
    // If opening user menu, ensure mobile menu is closed (prevents overlap)
    setMobileOpen(false);
    setUserMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    handleLinkClick(); // Close both menus
  };


  return (
    // Main Nav Container: Sticky, high Z-index, slight shadow, subtle border
    <nav className="sticky top-0 z-50 bg-white shadow-xl border-b border-gray-100">
      <div className=" mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* 1. Left - Logo */}
          <Link href="/" className="text-3xl font-extrabold text-blue-500 hover:text-blue-800 transition tracking-tight">
            Community Blog
          </Link>

          {/* 2. Center - Desktop Links (Hidden on small screens) */}
          <ul className="hidden lg:flex items-center space-x-8 text-gray-700 font-medium">
            {publicLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-blue-600 transition text-base relative group"
                >
                  {link.name}
                  {/* Subtle underline effect */}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* 3. Right Side (Auth/User) */}
          <div className="flex items-center space-x-3">

            {/* Login button */}
            {!user && (
              <Link
                href="/login"
                className="hidden sm:inline-block px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg"
              >
                Sign In
              </Link>
            )}

            {/* User Menu */}
            {user && (
              <div className="relative hidden lg:flex">
                <button
                  onClick={handleUserButtonClick}
                  className="flex items-center space-x-2 rounded-full p-1 transition ring-2 ring-transparent hover:ring-blue-400 focus:outline-none focus:ring-blue-400"
                >

                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-gray-200">
                    <span className="text-white font-bold text-lg">
                      {userInitial}
                    </span>
                  </div>


                  {/* Display Name/Email */}
                  <span className="hidden sm:inline text-sm font-medium text-gray-800">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </button>

                {userMenuOpen && (
                  // User Dropdown: Absolute positioning, z-index for stacking, polished shadow
                  <ul className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 py-2 text-sm z-40 origin-top-right transform scale-100 transition duration-150 ease-out">
                    <li className="px-4 py-2 font-bold text-gray-900 border-b mb-1 truncate">
                      {user.displayName || user.email}
                    </li>

                    {isAdmin && (
                      <>
                        <li>
                          <Link
                            href="/admin"
                            className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md mx-2 transition"
                            onClick={handleLinkClick}
                          >
                            📊 Admin panel
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/blog/add"
                            className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md mx-2 transition"
                            onClick={handleLinkClick}
                          >
                            ✍️ Write New Post
                          </Link>
                        </li>
                        <hr className="my-1 border-gray-100" />
                      </>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md mx-2 transition"
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    mobileOpen
                      ? "M6 18L18 6M6 6l12 12" // X icon
                      : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Dropdown (Full Width, Styled Menu) */}
      {mobileOpen && (
        <div className="lg:hidden shadow-lg bg-white absolute w-full border-t border-gray-100 z-40">
          <div className="py-2">
            <ul className="space-y-1">
              {publicLinks.map((link) => (
                <li key={`mobile-${link.name}`}>
                  <Link
                    href={link.href}
                    className="block px-6 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Conditional Mobile Auth Links */}
              {!user ? (
                <li>
                  <Link
                    href="/login"
                    className="block px-6 py-2 text-center my-2 bg-blue-600 text-white font-bold rounded-lg mx-4 hover:bg-blue-700 transition"
                    onClick={handleLinkClick}
                  >
                    Sign In
                  </Link>
                </li>
              ) : (
                <>
                  {isAdmin && (
                    <li>
                      <Link
                        href="/admin"
                        className="block px-6 py-2 text-blue-600 font-medium hover:bg-blue-50 transition"
                        onClick={handleLinkClick}
                      >
                        📊 Admin panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-2 text-red-600 font-medium hover:bg-red-50 transition"
                    >
                      🚪 Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}