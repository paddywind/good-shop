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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Edit Blog Post
      </h1>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-xl shadow-sm"
      >
        {/* CURRENT IMAGE */}
        {formData.currentImageUrl && (
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Current Image
            </label>
            <div className="w-full">
              <Image
                src={formData.currentImageUrl}
                alt="Current featured"
                width={700}
                height={400}
                className="rounded-lg object-cover border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        )}

        {/* NEW IMAGE */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Replace Image (optional)
          </label>
          <input
            type="file"
            name="featuredImage"
            onChange={handleChange}
            className="block w-full text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800"
          />
        </div>

        {/* TITLE */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* AUTHOR */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* CONTENT */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 leading-relaxed"
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
        >
          {submitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}
