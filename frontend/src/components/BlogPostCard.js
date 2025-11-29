import Image from "next/image";
import Link from "next/link";

export default function BlogPostCard({ post }) {
  const { title, slug, author, imageUrl, createdAt } = post;

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="
      group rounded-2xl overflow-hidden bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      shadow-sm hover:shadow-lg transition-all
    ">
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <Link href={`/blog/${slug}`}>
          <h2 className="
            text-xl font-semibold text-gray-900 dark:text-white
            leading-snug line-clamp-2 group-hover:text-blue-600
            transition-colors
          ">
            {title}
          </h2>
        </Link>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          By {author} — {date}
        </p>

        {/* CTA */}
        <Link
          href={`/blog/${slug}`}
          className="
            mt-4 inline-block text-sm font-medium
            text-blue-600 dark:text-blue-400
            hover:underline
          "
        >
          Read Post
        </Link>
      </div>
    </div>
  );
}
