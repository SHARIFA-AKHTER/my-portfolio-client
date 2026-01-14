"use client";

/* eslint-disable react/no-unescaped-entities */

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface User {
//   name: string;
//   role: string;
//   [key: string]: any;
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = () => {
//       try {
//         // Get token from cookie
//         const token = document.cookie
//           .split("; ")
//           .find((row) => row.startsWith("token="))
//           ?.split("=")[1];

//         if (!token) {
//           router.push("/login");
//           return;
//         }

//         // Get user data from localStorage
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//         } else {
//           // If no user data, redirect to login
//           router.push("/login");
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         router.push("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500 text-lg">Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-2">
//         Welcome, <span className="text-blue-600">{user.name}</span>! 🎉
//       </h1>
//       <p className="text-gray-600 mb-6">Role: <span className="font-medium">{user.role}</span></p>

//       <div className="bg-white shadow-md rounded-lg p-6">
//         <p className="text-gray-700 text-base md:text-lg leading-relaxed">
//   Welcome to your personal dashboard! Here, you can manage your projects, track your portfolio performance, explore analytics, and update your profile with ease. Stay on top of your work and showcase your achievements seamlessly.
// </p>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  role: string;
  [key: string]: any;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          router.push("/login");
          return;
        }


        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);

         
          if (parsedUser.role.toLowerCase() !== "admin") {
            alert("Access Denied! Only admins can enter this dashboard.");
            router.push("/"); 
            return;
          }

          setUser(parsedUser);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        <p className="ml-4 text-gray-500 text-lg">Verifying Access...</p>
      </div>
    );
  }

 
  if (!user || user.role.toLowerCase() !== "admin") return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Admin Dashboard 🎉
        </h1>
        <span className="bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-bold uppercase">
          {user.role}
        </span>
      </div>

      <h2 className="text-xl mb-4 text-gray-700">
        Welcome back, <span className="text-pink-600 font-semibold">{user.name}</span>!
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Hello Admin! This is your control center. Here you can manage Mom & Baby wear products, view orders, and monitor your portfolio's performance.
        </p>
      </div>
    </div>
  );
}