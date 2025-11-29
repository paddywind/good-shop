"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function AdminTopBar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { href: "/admin", label: "Manage posts" },
    { href: "/admin/blog/add", label: "Add new post" },
  ];

  return (
    <div
      className="
        lg:hidden w-full border-b bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-800
        px-4 py-4 shadow-sm
      "
    >
      <h1 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Admin
      </h1>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar items-center pb-1">
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
                px-4 py-2 rounded-md text-sm font-medium transition-all
                whitespace-nowrap flex items-center shadow-sm
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

        {/* Logout Button */}
        <button
          type="button"
          onClick={logout}
          className="
            px-4 py-2 rounded-md text-sm font-medium
            text-red-600 dark:text-red-400
            border border-gray-200 dark:border-gray-800
            bg-white dark:bg-gray-900
            shadow-sm hover:shadow-md transition-all
            hover:bg-red-50 dark:hover:bg-red-900/40
            active:scale-[0.97]
            whitespace-nowrap
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}
