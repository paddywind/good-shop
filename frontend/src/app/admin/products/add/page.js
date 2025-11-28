// /frontend/app/(admin)/products/add/page.js
'use client';

import { fetchProtectedData } from '@/lib/secureApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    productImage: null, // To hold the File object
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    setLoading(true);
    setError('');
    setSuccess(false);

    // 1. Prepare FormData for file upload
    const dataWithFile = new FormData();
    dataWithFile.append('name', formData.name);
    dataWithFile.append('description', formData.description);
    dataWithFile.append('price', formData.price);

    // Check if image file is selected
    if (formData.productImage) {
      // The key MUST match the fieldname expected by Multer in Express ('productImage')
      dataWithFile.append('productImage', formData.productImage);
    } else {
      setError('Please select an image file.');
      setLoading(false);
      return;
    }

    try {
      // 2. Call the protected API function
      const newProduct = await fetchProtectedData('products', 'POST', dataWithFile);

      setSuccess(true);

      // 3. Optional: Redirect to the newly created product page or the dashboard
      console.log('Product created:', newProduct);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
      {success && <p className="text-green-500 bg-green-100 p-3 rounded mb-4">Product added successfully!</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="productImage" className="block text-gray-700 font-medium">Product Image</label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}