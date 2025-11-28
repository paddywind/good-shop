
export default function Contact() {
  return (
    <div className="bg-base-100 px-5 md:px-20 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
        Contact Us
      </h1>

      <p className="max-w-3xl mx-auto text-center text-lg md:text-xl text-gray-700 mb-12">
        Have a question or need help? Fill out the form below and we’ll get back
        to you as soon as possible.
      </p>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message..."
              className="textarea textarea-bordered w-full"
              rows={5}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full md:w-auto self-center"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-12 text-center text-gray-600">
        <p>Email: support@myshop.com</p>

        <p>Address: Dhaka, Bangladesh</p>
      </div>
    </div>
  );
}
