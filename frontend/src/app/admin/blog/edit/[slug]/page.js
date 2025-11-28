// /frontend/app/(admin)/blog/edit/[slug]/page.js
'use client';
import { use } from 'react';
import { fetchProtectedData } from '@/lib/secureApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditBlogPostPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    featuredImage: null, // New file object
    currentImageUrl: '', // Existing URL for display
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // --- Initial Data Fetch (Protected GET Request) ---
  useEffect(() => {
    async function loadPost() {
      try {
        // Fetch by slug
        const post = await fetchProtectedData(`blog/${slug}`, 'GET');

        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
          featuredImage: null,
          currentImageUrl: post.imageUrl,
        });
      } catch (err) {
        setError(err.message || 'Failed to load blog post data.');
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadPost();
    }
  }, [slug]);

  // --- Form Handlers ---
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
    setSubmitting(true);
    setError('');
    setSuccess(false);

    // 1. Prepare FormData (required for file upload)
    const dataWithFile = new FormData();
    dataWithFile.append('title', formData.title);
    dataWithFile.append('content', formData.content);
    dataWithFile.append('author', formData.author);

    // 2. Append the image ONLY if a new file was selected
    if (formData.featuredImage) {
      // Key MUST match the fieldname expected by Multer in Express ('featuredImage')
      dataWithFile.append('featuredImage', formData.featuredImage);
    }

    try {
      // 3. Call the protected API function with PUT method, using the original slug
      const updatedPost = await fetchProtectedData(`blog/${slug}`, 'PUT', dataWithFile);

      setSuccess(true);
      // Update the displayed image instantly if a new one was uploaded, and update URL if slug changed
      setFormData(prev => ({
        ...prev,
        currentImageUrl: updatedPost.imageUrl,
        title: updatedPost.title,
        featuredImage: null
      }));

      // If the title changed, the slug changed on the backend. We should redirect to the new slug.
      if (updatedPost.slug !== slug) {
        router.push(`/admin/blog/edit/${updatedPost.slug}`);
      } else {
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1500);
      }

    } catch (err) {
      setError(err.message || 'Failed to update blog post.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading blog post details...</p>;
  }

  // --- Render Form (Similar to Edit Product Form) ---
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post: {formData.title}</h1>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
      {success && <p className="text-green-500 bg-green-100 p-3 rounded mb-4">Post updated successfully!</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

        {/* Current Image Preview */}
        {formData.currentImageUrl && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Current Image</label>
            <Image
              src={formData.currentImageUrl}
              alt="Current Featured Image"
              width={300}
              height={150}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="featuredImage" className="block text-gray-700 font-medium">Replace Image (Optional)</label>
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium">Author</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium">Content</label>
          <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="10" className="w-full p-2 border border-gray-300 rounded mt-1" required />
        </div>


        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {submitting ? 'Updating Post...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}