import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="w-11/12 mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">Community Blog</h1>
          <p className="text-gray-300">
            Crafting beautiful and informative blogs.
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-400">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Services</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-blue-400">
                Feature a Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Promote Your Content
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <Link
              href="https://x.com/Cap_tain01"
              className="hover:text-blue-400"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 5.924c-.793.352-1.644.589-2.536.696a4.432 4.432 0 001.946-2.45 8.862 8.862 0 01-2.805 1.073 4.42 4.42 0 00-7.534 4.028 12.53 12.53 0 01-9.086-4.61 4.421 4.421 0 001.368 5.894 4.404 4.404 0 01-2-.553v.056a4.422 4.422 0 003.544 4.33 4.44 4.44 0 01-1.988.075 4.423 4.423 0 004.127 3.065 8.866 8.866 0 01-5.488 1.892c-.356 0-.707-.021-1.054-.062a12.518 12.518 0 006.768 1.983c8.121 0 12.556-6.726 12.556-12.556 0-.192-.004-.383-.013-.573a8.97 8.97 0 002.202-2.285z" />
              </svg>
            </Link>
            <Link
              href="https://github.com/Sark-Rakib"
              className="hover:text-blue-400"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c-5.485 0-9.937 4.452-9.937 9.937 0 4.383 2.863 8.107 6.839 9.449.5.092.683-.217.683-.483 0-.238-.009-.868-.014-1.704-2.782.604-3.369-1.343-3.369-1.343-.454-1.154-1.109-1.461-1.109-1.461-.906-.619.069-.607.069-.607 1.003.071 1.532 1.031 1.532 1.031.891 1.528 2.338 1.087 2.906.831.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.029-2.681-.103-.254-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025a9.55 9.55 0 012.5-.336 9.55 9.55 0 012.5.336c1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.202 2.392.1 2.646.64.697 1.028 1.59 1.028 2.681 0 3.842-2.337 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.337-.012 2.419-.012 2.748 0 .268.18.58.688.482 3.973-1.343 6.835-5.066 6.835-9.449 0-5.485-4.452-9.937-9.937-9.937z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-700 text-gray-400">
        &copy; {new Date().getFullYear()} Community Blog. All rights reserved.
      </div>
    </footer>
  );
}
