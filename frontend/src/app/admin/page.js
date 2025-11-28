// /frontend/app/dashboard/blog/page.js (REVISED)
'use client';

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'; // <-- Import Modal
import { fetchProtectedData } from '@/lib/secureApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToast } from '../../../context/ToastContext';

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- New State for Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null); // { slug, title }
  const { addToast } = useToast();
  // --- Data Fetching Function ---
  const loadBlogPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProtectedData('blog', 'GET');
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch blog posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogPosts();
  }, []);

  // --- Modal Control Functions ---
  const openDeleteModal = (slug, title) => {
    setPostToDelete({ slug, title });
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setPostToDelete(null);
  };


  // --- Final Delete Confirmation Handler ---
  const handleConfirmDelete = async () => {
    if (!postToDelete) return;

    closeDeleteModal(); // Close modal immediately

    // Use the stored postToDelete slug and title
    const { slug, title } = postToDelete;

    try {
      // Call the DELETE endpoint
      await fetchProtectedData(`blog/${slug}`, 'DELETE');

      // Update UI instantly
      setPosts(prev => prev.filter(post => post.slug !== slug));
      // Optional: Show a success toast/alert here instead of standard alert
      addToast(`Blog post "${title}" deleted successfully.`, 'success');

    } catch (err) {
      setError(err.message || 'Failed to delete blog post. Permission denied.');
      loadBlogPosts();
    }
  };


  // --- Loading and Error States ---
  if (loading) {
    return <p className="p-8 text-lg">Loading blog posts...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600 bg-red-100 rounded-lg">{error}</p>;
  }

  // --- Render Table and Modal ---
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Blog Posts</h1>
        <Link
          href="/admin/blog/add"
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
        >
          + Add New Post
        </Link>
      </div>

      {/* ... Table rendering logic ... */}
      {posts.length === 0 ? (
        <p className="text-gray-600 mt-10 p-4 border rounded-lg bg-white">No blog posts found. Please add a new one.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/admin/blog/edit/${post.slug}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      // Use the new modal opener function
                      onClick={() => openDeleteModal(post.slug, post.title)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- Delete Confirmation Modal Render --- */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        // Safely pass the title to the modal
        title={postToDelete?.title || 'this post'}
      />
    </div>
  );
}