"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const userInitial = user?.email?.[0]?.toUpperCase() ?? "?";

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "All Blog Posts", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const closeAll = () => {
    setMobileOpen(false);
    setMenuOpen(false);
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold text-blue-600 hover:text-blue-700"
          >
            Community Blog
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center space-x-8 text-gray-700 font-medium">
            {links.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="relative group hover:text-blue-600 transition"
                >
                  {label}
                  <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {!user && (
              <Link
                href="/login"
                className="hidden sm:block px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            )}

            {/* User menu desktop */}
            {user && (
              <div ref={menuRef} className="relative hidden lg:block">
                <button
                  onClick={() => {
                    setMenuOpen((v) => !v);
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 rounded-full transition hover:ring-2 hover:ring-blue-300"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold border border-gray-200">
                    {userInitial}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {user.displayName || user.email.split("@")[0]}
                  </span>
                </button>

                {/* Dropdown */}
                {menuOpen && (
                  <ul className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-xl py-2 text-sm">
                    <li className="px-4 py-2 font-semibold text-gray-900 border-b">
                      {user.displayName || user.email}
                    </li>

                    {isAdmin && (
                      <>
                        <li>
                          <Link
                            href="/admin"
                            onClick={closeAll}
                            className="block px-4 py-2 hover:bg-gray-100 text-blue-600"
                          >
                            Admin Panel
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/blog/add"
                            onClick={closeAll}
                            className="block px-4 py-2 hover:bg-gray-100 text-blue-600"
                          >
                            Write New Post
                          </Link>
                        </li>
                        <hr className="border-gray-200 my-1" />
                      </>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        closeAll();
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </ul>
                )}
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => {
                setMobileOpen((v) => !v);
                setMenuOpen(false);
              }}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
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
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white shadow-sm">
          <ul className="py-2">
            {links.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={closeAll}
                  className="block px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
                >
                  {label}
                </Link>
              </li>
            ))}

            {!user ? (
              <li className="mt-2">
                <Link
                  href="/login"
                  onClick={closeAll}
                  className="block mx-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg text-center hover:bg-blue-700 transition"
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
                      onClick={closeAll}
                      className="block px-6 py-2 text-blue-600 hover:bg-blue-50 transition font-medium"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}

                <li>
                  <button
                    onClick={() => {
                      logout();
                      closeAll();
                    }}
                    className="w-full text-left px-6 py-2 text-red-600 hover:bg-red-50 font-medium"
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
