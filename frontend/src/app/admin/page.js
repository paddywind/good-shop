'use client';

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { fetchProtectedData } from '@/lib/secureApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToast } from '../../../context/ToastContext';

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const { addToast } = useToast();

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

  const openDeleteModal = (slug, title) => {
    setPostToDelete({ slug, title });
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setPostToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    closeDeleteModal();

    const { slug, title } = postToDelete;

    try {
      await fetchProtectedData(`blog/${slug}`, 'DELETE');

      setPosts((prev) => prev.filter((post) => post.slug !== slug));
      addToast(`Blog post "${title}" deleted successfully.`, 'success');
    } catch (err) {
      setError(err.message || 'Failed to delete blog post.');
      loadBlogPosts();
    }
  };

  if (loading) return <p className="p-8 text-lg">Loading blog posts...</p>;
  if (error)
    return (
      <p className="p-6 rounded-md border border-red-300 text-red-600 bg-red-50">
        {error}
      </p>
    );

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
          Blog Posts
        </h1>

        <Link
          href="/admin/blog/add"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-500 text-white text-sm font-medium shadow-sm hover:bg-green-600 transition"
        >
          + Add New Post
        </Link>
      </div>

      {/* Empty State */}
      {posts.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-gray-600 shadow-sm">
          No blog posts found.
        </div>
      ) : (
        <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{post.author}</td>
                    <td className="px-6 py-4 flex items-center gap-4 text-sm">
                      <Link
                        href={`/admin/blog/edit/${post.slug}`}
                        className="text-blue-500 hover:text-blue-600 font-medium"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => openDeleteModal(post.slug, post.title)}
                        className="text-red-500 hover:text-red-600 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {posts.map((post) => (
              <div key={post._id} className="p-4">
                <p className="font-medium text-gray-900">{post.title}</p>
                <p className="text-gray-500 text-sm mt-1">{post.author}</p>

                <div className="flex items-center gap-6 mt-4">
                  <Link
                    href={`/admin/blog/edit/${post.slug}`}
                    className="text-blue-500 text-sm font-medium hover:text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => openDeleteModal(post.slug, post.title)}
                    className="text-red-500 text-sm font-medium hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title={postToDelete?.title || 'this post'}
      />
    </div>
  );
}
