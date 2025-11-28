// /frontend/components/ProductCard.js
import Link from 'next/link';
import Image from 'next/image';
export default function ProductCard({ product }) {
  // Destructure only the necessary fields for the card
  const { _id, name, price, imageUrl } = product;

  return (
    <div className="border rounded-lg shadow-md overflow-hidden transition hover:shadow-xl">
      <Image
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
        width={400}
        height={192}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold truncate">{name}</h2>
        <p className="text-lg text-green-700">${price.toFixed(2)}</p>
        <Link href={`/products/${_id}`} className="mt-3 inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
}