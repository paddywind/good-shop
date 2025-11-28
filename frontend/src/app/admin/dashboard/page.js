// /frontend/app/(admin)/dashboard/page.js

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to the Admin Dashboard</h1>
      <p className="text-lg text-gray-600">Use the sidebar navigation to manage products and blog posts.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
        <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-indigo-500">
          <h2 className="font-semibold">Shop Management</h2>
          <p className="text-sm mt-1">Add or edit product listings.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-green-500">
          <h2 className="font-semibold">Blog Management</h2>
          <p className="text-sm mt-1">Create or update blog content.</p>
        </div>
      </div>
    </div>
  );
}