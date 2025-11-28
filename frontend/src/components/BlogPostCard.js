// /frontend/components/BlogPostCard.js
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPostCard({ post }) {
  const { title, slug, author, imageUrl, createdAt } = post;

  // Format the date for display
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="border rounded-md shadow-md overflow-hidden transition hover:shadow-xl dark:bg-white">
      <div className="relative w-full h-52">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-5">
        <Link href={`/blog/${slug}`} className="hover:text-indigo-600">
          <h2 className="text-2xl font-bold line-clamp-2">{title}</h2>
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          By **{author}** on {date}
        </p>
        <Link href={`/blog/${slug}`} className="mt-4 inline-block text-indigo-600 hover:underline font-medium">
          Read Post &rarr;
        </Link>
      </div>
    </div>
  );
}