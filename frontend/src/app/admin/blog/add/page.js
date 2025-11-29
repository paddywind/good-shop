'use client';

import { fetchProtectedData } from '@/lib/secureApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '../../../../../context/ToastContext';

export default function AddBlogPostPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    featuredImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featuredImage' && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.featuredImage) {
      const msg = 'Please select a featured image.';
      setError(msg);
      addToast(msg, 'error');
      setLoading(false);
      return;
    }

    const body = new FormData();
    body.append('title', formData.title);
    body.append('content', formData.content);
    body.append('author', formData.author);
    body.append('featuredImage', formData.featuredImage);

    try {
      const newPost = await fetchProtectedData('blog', 'POST', body);

      addToast(`Blog post "${newPost.title}" published successfully!`, 'success');

      setTimeout(() => {
        router.push('/admin');
      }, 1200);
    } catch (err) {
      const msg = err.message || 'Failed to create blog post.';
      setError(msg);
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight mb-6">
        Create New Blog Post
      </h1>

      {error && (
        <div className="mb-5 rounded-md border border-red-300 bg-red-50 text-red-700 p-3 text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border bg-white shadow-sm p-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            name="content"
            rows="10"
            value={formData.content}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            required
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image
          </label>
          <input
            type="file"
            name="featuredImage"
            onChange={handleChange}
            className="block w-full text-gray-900 rounded-md border border-gray-300 bg-white px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 file:font-medium hover:file:bg-gray-200 shadow-sm focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-md bg-green-600 text-white font-semibold py-3 shadow-sm hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}
