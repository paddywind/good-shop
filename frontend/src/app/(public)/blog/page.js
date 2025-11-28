// /frontend/app/(public)/blog/page.js
import { fetchPublicData } from '@/lib/api';
import BlogPostCard from '@/components/BlogPostCard'; // We will create this next
import Link from 'next/link';

// Server component function for data fetching
async function getBlogPosts() {
  // Hits the Express API: /api/blog
  const posts = await fetchPublicData('blog');
  return posts || [];
}

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">The Developer Blog</h1>

      {posts.length === 0 ? (
        <p>No blog posts published yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Shop
        </Link>
      </div>
    </main>
  );
}