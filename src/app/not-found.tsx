import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 text-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <h1 className="text-7xl md:text-9xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl md:text-5xl font-semibold mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-300 mb-8 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-yellow-300 hover:scale-105 transition transform duration-300"
      >
        Go Back Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
