// /frontend/app/(public)/products/page.js (NEW FILE)
import ProductCard from '@/components/ProductCard';
import { fetchPublicData } from '@/lib/api';
import Link from 'next/link';

// Server component function for data fetching
async function getProducts() {
  const products = await fetchPublicData('products');
  return products || [];
}

export default async function ProductListPage() { // Renamed from HomePage
  const products = await getProducts();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Our Complete Collection</h1>

      {products.length === 0 ? (
        <p>No products found. Add some from the admin dashboard!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}