"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function AdminTopBar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Manage posts" },
    { href: "/admin/blog/add", label: "Add new post" },
  ];

  const { logout } = useAuth();

  return (
    <div
      className="
        lg:hidden w-full border-b bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
        px-4 py-3
      "
    >
      <h1 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Admin
      </h1>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar items-center">
        {links.map((link) => {
          // make `/admin` match exactly, but allow child routes for nested links
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`
                px-3 py-2 rounded-lg text-sm whitespace-nowrap transition
                ${active
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  : "text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={logout}
          className={
            "px-3 py-2 rounded-lg text-sm whitespace-nowrap transition text-red-600 dark:text-red-400 border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-800"
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
}
