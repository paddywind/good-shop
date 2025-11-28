// /frontend/app/(public)/blog/page.js (REVISED)
import BlogFilter from '@/components/BlogFilter'; // Import the new client component
import { fetchPublicData } from '@/lib/api';

// Server component function for data fetching
async function getBlogPosts() {
  // Hits the Express API: /api/blog
  const posts = await fetchPublicData('blog');
  return posts || [];
}

export default async function BlogListPage() {
  const posts = await getBlogPosts(); // Data fetched on the server

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-3 dark:text-white text-gray-900">The Community Blog</h1>
        <p className="text-xl text-gray-600">Explore articles, tutorials, and insights.</p>
      </div>

      {/* Pass the server-fetched data to the client component for filtering */}
      <BlogFilter initialPosts={posts} />

    </main>
  );
}