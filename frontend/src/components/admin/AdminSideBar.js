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
        hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        px-5 py-6 shadow-sm
      "
    >
      {/* Header */}
      <h1 className="text-xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
        Admin Panel
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-all
                flex items-center
                ${active
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-sm"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={logout}
          className="
            w-full px-4 py-2 text-sm font-medium rounded-md
            text-red-600 dark:text-red-400
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            hover:bg-red-50 dark:hover:bg-red-900/40
            shadow-sm hover:shadow-md transition-all
            focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400
            active:scale-[0.97]
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
