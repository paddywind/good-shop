export default function Contact() {
  return (
    <div className="px-6 md:px-20 py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">

      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
          We’re here to help. Send your message and we’ll get back to you shortly.
        </p>
      </div>

      {/* Contact Form Card */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <form className="grid grid-cols-1 gap-6">

          {/* Name */}
          <div>
            <label className="block font-medium text-gray-800 dark:text-gray-200 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700 
                         text-gray-900 dark:text-gray-100 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-800 dark:text-gray-200 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700 
                         text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium text-gray-800 dark:text-gray-200 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="How can we assist you?"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700 
                         text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium 
                       px-10 py-3 rounded-lg text-lg transition
                       w-full md:w-auto justify-center"
          >
            Send Message
          </button>

        </form>
      </div>

      {/* Contact Info */}
      <div className="max-w-3xl mx-auto mt-14 text-center text-gray-600 dark:text-gray-300">
        <p className="text-lg">
          <span className="font-semibold dark:text-gray-200">Email:</span> support@myshop.com
        </p>
        <p className="text-lg mt-2">
          <span className="font-semibold dark:text-gray-200">Address:</span> Dhaka, Bangladesh
        </p>
      </div>

    </div>
  );
}
