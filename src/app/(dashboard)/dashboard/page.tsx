/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */

// import { authOptions } from "@/helpers/authOptions";
// import { getServerSession } from "next-auth";

// export default async function DashboardHome() {
//   const session = await getServerSession(authOptions);

// if (!session || !session.user) {
//   redirect("/login");
//  }

//admin ke utiya dela google deyao login hoba
//  if (session.user.role !== "ADMIN") {
//  redirect("/unauthorized");
//}

//   const quotes = [
//     "The secret of getting ahead is getting started. – Mark Twain",
//     "Strive not to be a success, but rather to be of value. – Albert Einstein",
//     "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
//   ];

//   // Random quote
//   const quote = quotes[Math.floor(Math.random() * quotes.length)];

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
//       <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 w-full max-w-xl">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//           Welcome, {session?.user?.name || "Guest"}
//         </h1>
//         <p className="text-gray-500 mb-6">
//           {session?.user?.email || "No email"}
//         </p>
//         <p className="text-lg md:text-xl text-gray-600 italic">"{quote}"</p>
//         <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300">
//           Explore My Work
//         </button>
//       </div>
//     </div>
//   );
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  const quotes = [
    "The secret of getting ahead is getting started. – Mark Twain",
    "Strive not to be a success, but rather to be of value. – Albert Einstein",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  ];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 w-full max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Welcome, {session.user.name || "User"}
        </h1>

        <p className="text-gray-500 mb-6">{session.user.email}</p>

        <p className="text-lg md:text-xl text-gray-600 italic">"{quote}"</p>

        <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300">
          Explore My Work
        </button>
      </div>
    </div>
  );
}
