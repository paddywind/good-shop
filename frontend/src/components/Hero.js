import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-blue-500 text-white py-20 px-4 md:px-20 rounded-md relative">
      <div className="max-w-4xl mx-auto text-center md:text-left">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Community Blog
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl mb-8">
          Read exclusive stories and find your favorites
        </p>

        {/* CTA Button */}
        <Link href="/blog">
          <button className=" text-center bg-white text-gray-600 hover:bg-gray-200 rounded-md font-medium text-xl p-3">Start reading</button>
        </Link>
      </div>

      {/* Optional background image */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-[url('/hero-bg.png')] bg-cover bg-center opacity-30 rounded-r-lg"></div>
    </section>
  );
}
