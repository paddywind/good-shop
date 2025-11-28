"use client";

import AdminSidebar from "@/components/admin/AdminSideBar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { isLoading, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !isAdmin) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar on Desktop */}
      <AdminSidebar />

      {/* Top Bar on Mobile */}
      <AdminTopBar />

      <main className="lg:ml-60 p-4 pt-20 lg:pt-6">
        {children}
      </main>
    </div>
  );
}
