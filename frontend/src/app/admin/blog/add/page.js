// /frontend/app/(admin)/blog/add/page.js (REVISED)
'use client';

import { fetchProtectedData } from '@/lib/secureApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '../../../../../context/ToastContext';

export default function AddBlogPostPage() {
  const router = useRouter();
  const { addToast } = useToast(); // <-- Initialize the toast hook

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    featuredImage: null, // To hold the File object
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // We will still use this for form-specific errors (like missing image)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featuredImage' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Check for required image before API call
    if (!formData.featuredImage) {
      const missingImageError = 'Please select a featured image.';
      setError(missingImageError);
      addToast(missingImageError, 'error'); // Show toast for immediate feedback
      setLoading(false);
      return;
    }

    // 2. Prepare FormData for file upload
    const dataWithFile = new FormData();
    dataWithFile.append('title', formData.title);
    dataWithFile.append('content', formData.content);
    dataWithFile.append('author', formData.author);
    dataWithFile.append('featuredImage', formData.featuredImage); // Image is guaranteed here

    try {
      // 3. Call the protected API function (POST to 'blog')
      const newPost = await fetchProtectedData('blog', 'POST', dataWithFile);

      // Show SUCCESS toast
      addToast(`Blog post "${newPost.title}" published successfully!`, 'success');
      console.log('Blog post created:', newPost);

      // Redirect after a short delay
      setTimeout(() => {
        // NOTE: Changed redirection to /dashboard as per your Admin Layout structure
        router.push('/admin');
      }, 1500);

    } catch (err) {
      const errorMessage = err.message || 'Failed to create blog post. Check server connection.';
      setError(errorMessage);
      addToast(errorMessage, 'error'); // Show ERROR toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto lg:ml-5">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Create New Blog Post</h1>

      {/* Kept error display for persistent form-level errors (like image missing) */}
      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
      {/* Removed {success && <p>... </p>} */}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

        {/* Title Input (Unchanged) */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
            required
          />
        </div>

        {/* Author Input (Unchanged) */}
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
            required
          />
        </div>

        {/* Content Textarea (Unchanged) */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
            required
          />
        </div>

        {/* Featured Image Input (Unchanged) */}
        <div className="mb-6">
          <label htmlFor="featuredImage" className="block text-gray-700 font-medium">Featured Image</label>
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            onChange={handleChange}
            className="text-gray-900 w-full p-2 border border-gray-300 rounded mt-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>

        {/* Submit Button (Unchanged) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Publishing Post...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}