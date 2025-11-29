import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-24 md:px-20 shadow-md">
      <div className="relative z-10 max-w-4xl mx-auto text-center md:text-left">

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          Welcome to Community Blog
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-blue-100 mb-10 leading-relaxed">
          Read exclusive stories and uncover new writers every day.
        </p>

        {/* CTA */}
        <Link
          href="/blog"
          className="inline-block rounded-xl bg-white px-6 py-3 text-lg font-semibold text-blue-700 shadow-sm transition-all hover:shadow-lg hover:bg-blue-50 active:scale-95"
        >
          Start Reading
        </Link>
      </div>

      {/* Decorative background element */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-20 md:block" />
    </section>
  );
}
