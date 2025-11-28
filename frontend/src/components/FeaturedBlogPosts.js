// /frontend/components/FeaturedProducts.js
"use client";

import { fetchPublicData } from '@/lib/api'; // Import our public API utility
import { useEffect, useState } from "react";
import BlogPostCard from './BlogPostCard';

export default function FeaturedProducts() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBlog() {
      try {
        const data = await fetchPublicData('blog'); // Fetch from /api/blog
        // Sort and take the first 6 items, assuming the order returned by the API is fine.
        setBlog(data.slice(0, 6));
        setError(null);
      } catch (err) {
        console.error("Failed to fetch featured blog:", err);
        setError("Could not load featured blog.");
      } finally {
        setLoading(false);
      }
    }
    getBlog();
  }, []);

  if (loading) {
    return <p className="text-center py-12 text-lg">Loading featured blog...</p>;
  }

  if (error) {
    return <p className="text-center py-12 text-red-500">{error}</p>;
  }

  if (blog.length === 0) {
    return <p className="text-center py-12 text-gray-500">No blog available to feature.</p>;
  }

  return (
    <section className="py-16 mx-auto px-4">
      <h2 className="text-4xl font-extrabold text-center mb-12 dark:text-white text-black">
        Featured Blog Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blog.map((item) => (
          <BlogPostCard key={item.slug} post={item} />
        ))}
      </div>
    </section>
  );
}