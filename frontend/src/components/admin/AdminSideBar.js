"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { href: "/admin", label: "Manage posts" },
    { href: "/admin/blog/add", label: "Add new post" },
  ];

  return (

    <aside
      className="
        hidden lg:flex fixed left-0 top-0 h-screen w-60 flex-col
        border-r bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
        px-4 py-6
      "
    >
      <h1 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          // make `/admin` match exactly, but allow child routes for nested links
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`
                px-3 py-2 rounded-lg text-sm transition
                ${active
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          type="button"
          onClick={logout}
          className="
    w-full text-left px-4 py-2 rounded-lg text-sm font-medium
    text-red-600 dark:text-red-400
    border border-gray-200 dark:border-gray-700
    bg-white dark:bg-gray-900
    hover:bg-red-50 dark:hover:bg-red-800
    transition-all duration-200
    shadow-sm hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400
    active:scale-95
  "
        >
          Logout
        </button>

      </div>
    </aside>
  );
}
