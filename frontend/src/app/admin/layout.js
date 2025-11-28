import AdminSidebar from "@/components/admin/AdminSideBar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({ children }) {
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
