// /frontend/components/Navbar.js
"use client";
// Use the alias for clean import
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth(); // Assume isAdmin is available from context
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Define public links
  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "All Blog Posts", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    // Outer container: Fixed width, centered, sticky, rounded, shadow
    <nav className="sticky top-0 z-50 p-5 bg-white shadow-lg border border-gray-100 transition duration-300">
      <div className="flex justify-between items-center h-full">

        {/* 1. Navbar Start (Logo and Mobile Menu) */}
        <div className="flex items-center">
          {/* Mobile Dropdown Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Logo/Brand Name */}
          <Link href="/" className="text-2xl font-extrabold text-blue-500 ml-4">
            Community Blog
          </Link>
        </div>

        {/* 2. Navbar Center (Desktop Links) */}
        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-8 text-lg font-medium">
            {publicLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-gray-700 hover:text-blue-500 transition">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Navbar End (Auth/User Menu) */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="relative">
              {/* User Avatar Button */}
              <button
                onClick={toggleMenu} // Use the same toggle for simplicity or a dedicated user menu toggle
                className="flex items-center space-x-2 p-1 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-400">
                  {/* Placeholder image if photoURL is missing */}
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/150?text=User'}
                    alt="User Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="hidden md:inline">{user.displayName || user.email}</span>
              </button>

              {/* User Dropdown Content */}
              {isOpen && ( // Control visibility with isOpen state
                <ul className="absolute right-0 mt-2 w-56 p-2 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-20 origin-top-right">
                  <li>
                    <span className="block px-4 py-2 text-sm font-semibold text-gray-800 border-b mb-1">
                      {user.displayName || user.email}
                    </span>
                  </li>
                  {/* Admin Links (Conditional Rendering) */}
                  {isAdmin && (
                    <>
                      <li>
                        <Link href="/admin/dashboard" className="block px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 rounded-md">
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link href="/admin/blog/add" className="block px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 rounded-md">
                          Write New Post
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            // Login Button
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-400 rounded-lg hover:bg-blue-500 transition shadow-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* 4. Mobile Menu (Below the main bar, only visible when opened) */}
      {isOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-gray-200">
          <ul className="space-y-2">
            {publicLinks.map((link) => (
              <li key={`mobile-${link.name}`}>
                <Link href={link.href} onClick={toggleMenu} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md">
                  {link.name}
                </Link>
              </li>
            ))}
            {/* Mobile Admin/Logout Links */}
            {user && (
              <>
                {isAdmin && (
                  <li>
                    <Link href="/admin/dashboard" onClick={toggleMenu} className="block px-4 py-2 text-base text-indigo-600 hover:bg-gray-100 rounded-md font-semibold">
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => { logout(); toggleMenu(); }}
                    className="w-full text-left px-4 py-2 text-base text-red-600 hover:bg-gray-100 rounded-md font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}