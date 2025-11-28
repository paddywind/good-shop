// /frontend/app/(public)/about/page.js (REVISED CONTENT)

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
            About The Community Blog
          </h1>
          <p className="max-w-4xl mx-auto text-xl text-gray-600">
            Welcome to the Community Blog, a platform dedicated to sharing knowledge, code, and insights in the ever-evolving world of technology. Our mission is to connect developers and enthusiasts through high-quality, practical content.
          </p>
        </header>

        {/* Decorative Divider */}
        <div className="flex justify-center mb-16">
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>

        {/* Mission, Vision, Values Section */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* Mission Card (Focus: Knowledge Sharing) */}
          <div className="bg-white rounded-xl shadow-xl p-8 text-center border-t-4 border-blue-600 transition hover:shadow-2xl hover:-translate-y-1 duration-300">
            <div className="text-blue-600 mb-4 mx-auto">
              {/* Icon for Sharing/Community */}
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2c0-.528-.192-1.01-.529-1.385m1.066 3.033A5 5 0 0015 15.176V14a2 2 0 10-4 0v1.176c-.534.195-1.01.48-1.425.867M5 20h5v-2a3 3 0 00-5.356-1.857M5 20v-2c0-.528.192-1.01.529-1.385m1.066 3.033A5 5 0 005 15.176V14a2 2 0 10-4 0v1.176c-.534.195-1.01.48-1.425.867M12 20h5v-2a3 3 0 00-5.356-1.857M12 20v-2c0-.528.192-1.01.529-1.385m1.066 3.033A5 5 0 0012 15.176V14a2 2 0 10-4 0v1.176c-.534.195-1.01.48-1.425.867"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-700">
              To foster a supportive community where individuals feel empowered to share their coding insights, tutorials, and experiences, benefiting all readers.
            </p>
          </div>

          {/* Vision Card (Focus: Growth & Learning) */}
          <div className="bg-white rounded-xl shadow-xl p-8 text-center border-t-4 border-green-600 transition hover:shadow-2xl hover:-translate-y-1 duration-300">
            <div className="text-green-600 mb-4 mx-auto">
              {/* Icon for Vision/Growth */}
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Our Vision</h2>
            <p className="text-lg text-gray-700">
              To become the most reliable and engaging source for developers seeking practical solutions and deep dives into modern software practices.
            </p>
          </div>

          {/* Values Card (Focus: Integrity & Quality) */}
          <div className="bg-white rounded-xl shadow-xl p-8 text-center border-t-4 border-indigo-600 transition hover:shadow-2xl hover:-translate-y-1 duration-300">
            <div className="text-indigo-600 mb-4 mx-auto">
              {/* Icon for Values/Code Integrity */}
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Our Values</h2>
            <p className="text-lg text-gray-700">
              Technical Accuracy, Content Quality, Openness, and Respect for diverse viewpoints are the pillars of our community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}