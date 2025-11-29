'use client';

import { fetchProtectedData } from '@/lib/secureApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useToast } from '../../../../../../context/ToastContext';

export default function EditBlogPostPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    featuredImage: null,
    currentImageUrl: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPost() {
      try {
        const post = await fetchProtectedData(`blog/${slug}`, 'GET');

        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
          featuredImage: null,
          currentImageUrl: post.imageUrl,
        });
      } catch (err) {
        const msg = err.message || 'Failed to load blog post data.';
        setError(msg);
        addToast(msg, 'error');
      } finally {
        setLoading(false);
      }
    }

    if (slug) loadPost();
  }, [slug, addToast]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featuredImage' && files) {
      setFormData((prev) => ({ ...prev, featuredImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('author', formData.author);

    if (formData.featuredImage) {
      data.append('featuredImage', formData.featuredImage);
    }

    try {
      const updated = await fetchProtectedData(`blog/${slug}`, 'PUT', data);

      addToast(`"${updated.title}" updated successfully!`, 'success');

      setFormData((prev) => ({
        ...prev,
        currentImageUrl: updated.imageUrl,
        featuredImage: null,
      }));

      if (updated.slug && updated.slug !== slug) {
        router.push(`/admin/blog/edit/${updated.slug}`);
      } else {
        setTimeout(() => router.push('/admin'), 1500);
      }
    } catch (err) {
      const msg = err.message || 'Failed to update blog post.';
      setError(msg);
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">Edit Blog Post</h1>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-200 p-3 rounded-md text-sm mb-5">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-6"
      >

        {/* CURRENT IMAGE */}
        {formData.currentImageUrl && (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Current Image</label>
            <Image
              src={formData.currentImageUrl}
              alt="Current featured"
              width={900}
              height={500}
              className="rounded-lg border border-gray-300 object-cover"
            />
          </div>
        )}

        {/* REPLACE IMAGE */}
        <div className="space-y-2">
          <label htmlFor="featuredImage" className="block text-gray-700 font-medium">
            Replace Image (optional)
          </label>
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            onChange={handleChange}
            className="w-full text-gray-900 border border-gray-300 rounded-lg p-2 
                     file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                     file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200 
                     transition"
          />
        </div>

        {/* TITLE */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* AUTHOR */}
        <div className="space-y-2">
          <label htmlFor="author" className="block text-gray-700 font-medium">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* CONTENT */}
        <div className="space-y-2">
          <label htmlFor="content" className="block text-gray-700 font-medium">Content</label>
          <textarea
            id="content"
            name="content"
            rows={10}
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg font-semibold text-white 
                     bg-blue-600 hover:bg-blue-700 transition 
                     disabled:bg-gray-400"
        >
          {submitting ? 'Updating…' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}
