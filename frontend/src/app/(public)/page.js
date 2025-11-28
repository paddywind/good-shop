// /frontend/app/(public)/page.js (REVISED)
import FeaturedProducts from '@/components/FeaturedBlogPosts';
import Hero from '@/components/Hero';
import Reviews from '@/components/Review';
export default function LandingPage() {
  return (
    <div className="w-11/12 mx-auto my-10">
      <Hero />
      <FeaturedProducts />
      <Reviews />
    </div>
  );
}