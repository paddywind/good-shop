// /frontend/app/(admin)/blog/add/page.js
'use client';

import { fetchProtectedData } from '@/lib/secureApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddBlogPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    featuredImage: null, // To hold the File object
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featuredImage' && files) {
      // Key must match the name expected by Multer in Express ('featuredImage')
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // 1. Prepare FormData for file upload
    const dataWithFile = new FormData();
    dataWithFile.append('title', formData.title);
    dataWithFile.append('content', formData.content);
    dataWithFile.append('author', formData.author);

    if (formData.featuredImage) {
      dataWithFile.append('featuredImage', formData.featuredImage);
    } else {
      setError('Please select a featured image.');
      setLoading(false);
      return;
    }

    try {
      // 2. Call the protected API function (POST to 'blog')
      const newPost = await fetchProtectedData('blog', 'POST', dataWithFile);

      setSuccess(true);
      console.log('Blog post created:', newPost);

      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to create blog post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
      {success && <p className="text-green-500 bg-green-100 p-3 rounded mb-4">Blog post added successfully!</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="featuredImage" className="block text-gray-700 font-medium">Featured Image</label>
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            required
          />
        </div>

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