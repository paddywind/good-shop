// /frontend/app/(admin)/products/edit/[id]/page.js
'use client';

import { fetchProtectedData } from '@/lib/secureApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProductPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    productImage: null, // New file object
    currentImageUrl: '', // Existing URL for display
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // --- Initial Data Fetch (Protected GET Request) ---
  useEffect(() => {
    async function loadProduct() {
      try {
        // Use the protected fetch, even for GET, to ensure admin can see product before editing
        const product = await fetchProtectedData(`products/${id}`, 'GET');

        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          productImage: null,
          currentImageUrl: product.imageUrl,
        });
      } catch (err) {
        setError(err.message || 'Failed to load product data.');
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadProduct();
    }
  }, [id]);

  // --- Form Handlers ---
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'productImage' && files) {
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
    dataWithFile.append('name', formData.name);
    dataWithFile.append('description', formData.description);
    dataWithFile.append('price', formData.price);

    // 2. Append the image ONLY if a new file was selected
    if (formData.productImage) {
      dataWithFile.append('productImage', formData.productImage);
    }

    try {
      // 3. Call the protected API function with PUT method
      const updatedProduct = await fetchProtectedData(`products/${id}`, 'PUT', dataWithFile);

      setSuccess(true);
      // Update the displayed image instantly if a new one was uploaded
      setFormData(prev => ({ ...prev, currentImageUrl: updatedProduct.imageUrl, productImage: null }));

      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to update product.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error && !success) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // --- Render Form ---
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Edit Product: {formData.name}</h1>

      {success && <p className="text-green-500 bg-green-100 p-3 rounded mb-4">Product updated successfully!</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

        {/* Current Image Preview */}
        {formData.currentImageUrl && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Current Image</label>
            <Image
              src={formData.currentImageUrl}
              alt="Current Product Image"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="productImage" className="block text-gray-700 font-medium">Replace Image (Optional)</label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* Name, Price, Description fields go here (similar to AddProductPage) */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">Product Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium">Price ($)</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} step="0.01" className="w-full p-2 border border-gray-300 rounded mt-1" required />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-2 border border-gray-300 rounded mt-1" required />
        </div>


        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white p-3 rounded font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {submitting ? 'Updating Product...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}