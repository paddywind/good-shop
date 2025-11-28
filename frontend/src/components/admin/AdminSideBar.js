"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    // { href: "/admin/blog", label: "#" },
    { href: "#", label: "Users" },
    { href: "#", label: "Settings" },
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

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);

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
    </aside>
  );
}
