// /frontend/components/Reviews.js
"use client";
import Image from "next/image";

// --- Dummy Review Data ---
const dummyReviews = [

  {
    id: 1,
    name: "Sarah Chen",
    rating: 4,
    comment: "The blog is home to people like me who share a passion for coding and web development. Great content!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzEyOTd8MHwxfHNlYXJjaHw1fHBoYXRvZ3JhcGh5fGVufDB8fHx8MTY5OTQxMDM3MHww&ixlib=rb-4.0.3&q=80&w=400",
  },
  {
    id: 2,
    name: "Omar Khalfan",
    rating: 5,
    comment: "An invaluable resource for staying updated with the latest trends and best practices in web development. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzEyOTd8MHwxfHNlYXJjaHwxMXxwaGF0b2dyYXBoeXxlbnwwfHx8fDE2OTk0MTAzNzB8MA&ixlib=rb-4.0.3&q=80&w=400",
  },

  {
    id: 3,
    name: "Ben Davis",
    rating: 5,
    comment: "I can't recommend this blog enough! The articles are well-written and cover a wide range of topics relevant to modern web development.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzEyOTd8MHwxfHNlYXJjaHw2fHBoYXRvZ3JhcGh5fGVufDB8fHx8MTY5OTQxMDM3MHww&ixlib=rb-4.0.3&q=80&w=400",
  },
];
// --- End Dummy Review Data ---

export default function Reviews() {
  // Use the dummy data array directly instead of useState and useEffect
  const reviews = dummyReviews;

  return (
    <section className="py-10 px-5 bg-gray-50 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          What Readers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:translate-y-[-2px] transition duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <Image
                  // Unsplash images are high-res; set quality and size appropriately
                  src={review.avatar}
                  alt={review.name}
                  width={50}
                  height={50}
                  quality={80} // Optimize image loading
                  className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-indigo-500"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{review.name}</h3>
                  <p className="text-yellow-500 mt-0.5">
                    {/* Display stars based on rating number */}
                    {"⭐".repeat(review.rating)}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic border-l-4 border-indigo-400 pl-4">
                &quot;{review.comment}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}