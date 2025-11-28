// /frontend/components/BlogFilter.js
'use client';

import BlogPostCard from '@/components/BlogPostCard'; // Reuse the card
import Link from 'next/link';
import { useMemo, useState } from "react";

export default function BlogFilter({ initialPosts }) {
  const [search, setSearch] = useState("");



  // --- 2. Filtering Logic ---
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Search logic (using 'title')
      const matchesSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase());


      return matchesSearch;
    });
  }, [initialPosts, search]);


  return (
    <div>
      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center my-10 max-w-4xl mx-auto">

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search blog posts by title"
          className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


      </div>

      {/* Blog Post Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-xl text-gray-600 py-10">
          No blog posts found matching your current filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Back to Home Link */}
      <div className="mt-12 text-center">
        <Link href="/" className="dark:text-white text-black hover:underline font-medium">
          Back to Home
        </Link>
      </div>
    </div>
  );
}