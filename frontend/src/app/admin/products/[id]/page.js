// /frontend/app/(public)/products/[id]/page.js
import { fetchPublicData } from '@/lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Function to fetch the single product data
async function getProduct(id) {
  // Use the ID from the URL to hit the Express API: /api/products/:id
  const product = await fetchPublicData(`products/${id}`);
  return product;
}

export default async function ProductDetailPage({ params }) {
  const { id } = params;

  const product = await getProduct(id);

  // If the product is not found (e.g., 404 from backend), use Next.js's notFound
  if (!product) {
    notFound();
  }

  // Destructure product details
  const { name, description, price, imageUrl } = product;

  return (
    <main className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-xl mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image Column */}
        <div>
          {/* Using Next.js Image component for optimization */}
          <div className="relative w-full h-80 rounded-lg overflow-hidden border">
            <Image
              src={imageUrl}
              alt={name}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>

        {/* Details Column */}
        <div>
          <h1 className="text-4xl font-extrabold mb-3 text-gray-900">{name}</h1>
          <p className="text-3xl font-bold text-green-600 mb-6">${price.toFixed(2)}</p>

          <h2 className="text-xl font-semibold mb-2 text-gray-800">Product Description</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{description}</p>

          <button
            className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
            // In a real app, this would add the item to a shopping cart context
            onClick={() => alert(`Added ${name} to cart!`)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}