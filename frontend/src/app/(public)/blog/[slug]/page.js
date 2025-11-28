// /frontend/app/(public)/blog/[slug]/page.js
import { fetchPublicData } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// Function to fetch the single blog post data
async function getBlogPost(slug) {
  // Hits the Express API: /api/blog/:slug
  const post = await fetchPublicData(`blog/${slug}`);
  return post;
}

export default async function BlogPostDetailPage({ params }) {
  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { title, content, author, imageUrl, createdAt } = post;
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });


  return (
    <main className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-xl mt-10">
      <div className="mb-8">
        <h2 className="text-5xl font-extrabold mb-4 text-gray-900 leading-tight">{title}</h2>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <p className="text-lg text-gray-500">Written by <span className='font-bold'>{author}</span>, Published on {date}</p>

      {/* Post Content */}
      <div className="prose lg:prose-lg max-w-none text-gray-700 mt-5">
        {/* The content is rendered here. Since it's plain text from the DB, 
                we use 'whitespace-pre-wrap' for basic formatting (new lines). 
                If you use a rich text editor later, this would be dangerouslySetInnerHTML. 
            */}
        <p className="whitespace-pre-wrap leading-relaxed text-base">{content}</p>
      </div>

      <Link href="/blog" className="mt-12 inline-block text-blue-500 hover:underline">
        Back to all posts
      </Link>
    </main>
  );
}