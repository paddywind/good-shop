import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-purple-500 text-white py-20 px-5 md:px-20 rounded-lg relative">
      <div className="max-w-4xl mx-auto text-center md:text-left">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to MyShop
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl mb-8">
          Explore our exclusive collection of products and find your favorites
        </p>

        {/* CTA Button */}
        <Link href="/products">
          <button className="btn btn-primary btn-lg">Shop Now</button>
        </Link>
      </div>

      {/* Optional background image */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-[url('/hero-bg.png')] bg-cover bg-center opacity-30 rounded-r-lg"></div>
    </section>
  );
}
