// /frontend/app/(public)/products/[slug]/page.js (REVISED)

import { fetchPublicData } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
// Function to fetch the single product data
// NOTE: We are using the parameter 'slug' as the MongoDB _id for fetching
async function getProduct(id) {
  const product = await fetchPublicData(`products/${id}`);
  return product;
}

export default async function ProductDetailPage({ params }) {
  // Use 'slug' from the URL, but treat it as the product's MongoDB ID
  const { slug } = await params;

  const product = await getProduct(slug); // Passing slug (which is the _id) to fetch

  if (!product) {
    notFound();
  }

  const { name, description, price, imageUrl } = product;

  return (
    // ... (Your existing display code is valid here)
    <main className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-xl mt-10">
      {/* ... (Grid layout for image and details) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image Column */}
        <Image
          src={imageUrl}
          alt={name}
          objectFit="cover"
          height={250}
          width={400}
          priority
        />

        {/* Details Column */}
        <div>
          <h1 className="text-4xl font-extrabold mb-3 text-gray-900">{name}</h1>
          <p className="text-3xl font-bold text-green-600 mb-6">${price.toFixed(2)}</p>

          <h2 className="text-xl font-semibold mb-2 text-gray-800">Product Description</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{description}</p>

          <button
            className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}