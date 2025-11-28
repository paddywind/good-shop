"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminTopBar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    // { href: "/admin/blog", label: "Blogs" },
    { href: "#", label: "Users" },
    { href: "#", label: "Settings" },
  ];

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

      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);

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
      </div>
    </div>
  );
}
