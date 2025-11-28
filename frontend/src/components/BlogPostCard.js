// /frontend/components/BlogPostCard.js
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPostCard({ post }) {
  const { title, slug, author, imageUrl, createdAt } = post;

  // Format the date for display
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className=" p-3 rounded-sm shadow-md overflow-hidden transition hover:shadow-xl dark:bg-white">
      <div className="relative w-full h-52">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-5">
        <Link href={`/blog/${slug}`} className="text-gray-500 hover:text-blue-500">
          <h2 className="text-2xl font-bold line-clamp-2">{title}</h2>
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          By {author} on {date}
        </p>
        <Link href={`/blog/${slug}`} className="mt-4 text-center inline-block text-blue-500 hover:underline font-medium">
          Read Post
        </Link>
      </div>
    </div>
  );
}