
export default function About() {
  return (
    <div className="bg-base-100 px-5 md:px-20 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
        About Us
      </h1>

      <p className="max-w-3xl mx-auto text-center text-lg md:text-xl text-gray-700 mb-12">
        Welcome to MyShop! We are passionate about providing high-quality
        products and exceptional customer service. Our mission is to make
        shopping easy, fun, and trustworthy for everyone.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            Deliver the best products at the best prices with excellent customer
            support.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600">
            Become a trusted online store for customers worldwide.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
          <p className="text-gray-600">
            Quality, transparency, and customer satisfaction are at the heart of
            everything we do.
          </p>
        </div>
      </div>
    </div>
  );
}
