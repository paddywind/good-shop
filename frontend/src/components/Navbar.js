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

  // Close dropdown when clicking outside
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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition"
          >
            Community Blog
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center space-x-8 text-gray-700 font-medium">
            {links.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="
                    relative px-1 py-0.5 transition
                    hover:text-blue-600
                  "
                >
                  {label}
                  <span
                    className="
                      absolute left-0 -bottom-1 h-0.5 w-full bg-blue-600 
                      scale-x-0 group-hover:scale-x-100 transition-transform
                    "
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-4">

            {!user && (
              <Link
                href="/login"
                className="
                  hidden sm:block px-5 py-2 rounded-lg text-sm font-medium
                  bg-blue-600 text-white shadow-sm
                  hover:bg-blue-700 active:scale-[0.97]
                  transition-all
                "
              >
                Sign In
              </Link>
            )}

            {/* Desktop user dropdown */}
            {user && (
              <div ref={menuRef} className="relative hidden lg:block">
                <button
                  onClick={() => setMenuOpen(v => !v)}
                  className="
                    flex items-center gap-2 px-2 py-1 rounded-lg
                    border border-gray-200 bg-white shadow-sm
                    hover:shadow-md transition-all
                  "
                >
                  <div className="
                    w-10 h-10 rounded-full bg-blue-600 text-white
                    flex items-center justify-center font-semibold
                  ">
                    {userInitial}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {user.displayName || user.email.split("@")[0]}
                  </span>
                </button>

                {menuOpen && (
                  <ul
                    className="
                      absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-lg
                      border border-gray-200 text-sm py-2
                      animate-in fade-in slide-in-from-top-2 duration-150
                    "
                  >
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
                      className="
                        w-full text-left px-4 py-2 text-red-600
                        hover:bg-red-50 transition
                      "
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
                setMobileOpen(v => !v);
                setMenuOpen(false);
              }}
              className="
                lg:hidden p-2 rounded-md 
                text-black
                border border-gray-200 
                hover:bg-gray-100 active:scale-95
                transition
              "
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
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-sm">
          <ul className="py-2">

            {links.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={closeAll}
                  className="
                    block px-6 py-3 text-gray-700 font-medium
                    hover:bg-blue-50 hover:text-blue-600
                    transition
                  "
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
                  className="
                    block mx-4 px-6 py-3 bg-blue-600 text-white
                    rounded-lg text-center font-medium
                    shadow-sm hover:bg-blue-700 transition active:scale-[0.97]
                  "
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
                      className="
                        block px-6 py-3 text-blue-600 font-medium
                        hover:bg-blue-50 transition
                      "
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
                    className="
                      w-full text-left px-6 py-3 text-red-600 font-medium
                      hover:bg-red-50 transition
                    "
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
