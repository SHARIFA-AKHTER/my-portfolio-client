// import Link from "next/link";

// const NotFoundPage = () => {
//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 text-white relative overflow-hidden">
//       {/* Decorative background circles */}
//       <div className="absolute -top-32 -left-32 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

//       <h1 className="text-7xl md:text-9xl font-extrabold mb-4">404</h1>
//       <h2 className="text-3xl md:text-5xl font-semibold mb-4">
//         Page Not Found
//       </h2>
//       <p className="text-gray-300 mb-8 text-center max-w-md">
//         Oops! The page you’re looking for doesn’t exist or has been moved.
//       </p>

//       <Link
//         href="/"
//         className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-yellow-300 hover:scale-105 transition transform duration-300"
//       >
//         Go Back Home
//       </Link>
//     </section>
//   );
// };

// export default NotFoundPage;

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-orange-100 text-center p-6">
      {/* Animated Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full border border-red-100"
      >
        <div className="flex flex-col items-center space-y-4">
          <AlertTriangle className="h-16 w-16 text-red-500" />

          <h1 className="text-3xl font-bold text-gray-800">Access Denied 🚫</h1>
          <p className="text-gray-600 text-base leading-relaxed">
            You don’t have permission to view this page. Only{" "}
            <span className="font-semibold text-red-500">Admin users</span> can
            access the dashboard.
          </p>

          <Image
            src="https://img.freepik.com/premium-vector/401-error-unauthorized-concept-illustration_114360-1934.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Unauthorized access"
            width={250}
            height={250}
            className="rounded-lg shadow-sm mt-4"
          />

          <Button
            onClick={() => router.push("/")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Go Back Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
