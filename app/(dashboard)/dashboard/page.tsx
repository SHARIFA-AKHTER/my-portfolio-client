/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

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
    const fetchUser = () => {
      try {
        // Get token from cookie
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          router.push("/login");
          return;
        }

        // Get user data from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // If no user data, redirect to login
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Welcome, <span className="text-blue-600">{user.name}</span>! 🎉
      </h1>
      <p className="text-gray-600 mb-6">Role: <span className="font-medium">{user.role}</span></p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
  Welcome to your personal dashboard! Here, you can manage your projects, track your portfolio performance, explore analytics, and update your profile with ease. Stay on top of your work and showcase your achievements seamlessly.
</p>
      </div>
    </div>
  );
}
