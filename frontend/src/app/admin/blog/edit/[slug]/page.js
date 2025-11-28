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
        // Redirect to new slug if it changed
        router.push(`/admin/blog/edit/${updated.slug}`);
      } else {
        // Redirect to admin index after update
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
    <div className="mx-auto lg:ml-5">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Blog Post</h1>

      {/* Kept error display consistent with Add page */}
      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

        {/* CURRENT IMAGE - Using mb-6 like the Add page's main sections */}
        {formData.currentImageUrl && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Current Image
            </label>
            <div className="w-full">
              <Image
                src={formData.currentImageUrl}
                alt="Current featured"
                width={700}
                height={400}
                // Simplified border styling for consistency
                className="rounded-lg object-cover border border-gray-300"
              />
            </div>
          </div>
        )}

        {/* REPLACE IMAGE INPUT - Styled to match the file input in the Add page */}
        <div className="mb-6">
          <label htmlFor="featuredImage" className="block text-gray-700 font-medium">
            Replace Image (optional)
          </label>
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            onChange={handleChange}
            className="text-gray-900 w-full p-2 border border-gray-300 rounded mt-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* TITLE Input - Consistent styling */}
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

        {/* AUTHOR Input - Consistent styling */}
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

        {/* CONTENT Textarea - Consistent styling */}
        <div className="mb-6"> {/* Use mb-6 for the last element before the button, consistent with Add page */}
          <label htmlFor="content" className="block text-gray-700 font-medium">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10" // Reduced rows from 12 to 10 for consistency
            className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
            required
          />
        </div>

        {/* Submit Button - Consistent styling but kept 'Update Post' text */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {submitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}