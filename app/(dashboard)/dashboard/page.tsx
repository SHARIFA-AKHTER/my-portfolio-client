/* eslint-disable react/no-unescaped-entities */
// "use client";

// /* eslint-disable @typescript-eslint/no-explicit-any */


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
//     const checkAdminAccess = () => {
//       try {
//         const token = document.cookie
//           .split("; ")
//           .find((row) => row.startsWith("token="))
//           ?.split("=")[1];

//         if (!token) {
//           router.push("/login");
//           return;
//         }


//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//           const parsedUser: User = JSON.parse(storedUser);

         
//           if (parsedUser.role.toLowerCase() !== "admin") {
//             alert("Access Denied! Only admins can enter this dashboard.");
//             router.push("/"); 
//             return;
//           }

//           setUser(parsedUser);
//         } else {
//           router.push("/login");
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         router.push("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAdminAccess();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
//         <p className="ml-4 text-gray-500 text-lg">Verifying Access...</p>
//       </div>
//     );
//   }

 
//   if (!user || user.role.toLowerCase() !== "admin") return null;

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold">
//           Admin Dashboard 🎉
//         </h1>
//         <span className="bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-bold uppercase">
//           {user.role}
//         </span>
//       </div>

//       <h2 className="text-xl mb-4 text-gray-700">
//         Welcome back, <span className="text-pink-600 font-semibold">{user.name}</span>!
//       </h2>

//       <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
//         <p className="text-gray-700 text-base md:text-lg leading-relaxed">
//           Hello Admin! This is your control center. Here you can manage Mom & Baby wear products, view orders, and monitor your portfolio's performance.
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, UserCheck, ShieldCheck, LogOut } from "lucide-react";

interface User {
  name: string;
  role: string;
  [key: string]: any;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkAdminAccess = () => {
      try {
        // ১. টোকেন চেক (Cookie থেকে)
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          router.push("/login");
          return;
        }

        // ২. ইউজার ডাটা চেক (LocalStorage থেকে)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);

          // ৩. অ্যাডমিন কি না যাচাই
          if (parsedUser.role.toLowerCase() !== "admin") {
            router.push("/"); // অ্যাক্সেস না থাকলে হোমে পাঠিয়ে দাও
            return;
          }

          setUser(parsedUser);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [router]);

  // হাইড্রেশন এরর এড়াতে মাউন্ট না হওয়া পর্যন্ত কিছু রেন্ডার করবে না
  if (!mounted) return null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-4 border-pink-500 border-solid animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="h-8 w-8 bg-pink-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground font-medium tracking-wide">Verifying Admin Access...</p>
      </div>
    );
  }

  // যদি ইউজার না থাকে বা অ্যাডমিন না হয়
  if (!user || user.role.toLowerCase() !== "admin") return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 lg:p-12 max-w-6xl mx-auto min-h-screen"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
            <LayoutDashboard className="text-pink-500" size={36} />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage your store and portfolio performance</p>
        </div>
        
        <div className="flex items-center gap-3 bg-card p-2 rounded-2xl border border-primary/10 shadow-sm">
          <div className="h-10 w-10 bg-pink-500 rounded-xl flex items-center justify-center text-white">
            <UserCheck size={20} />
          </div>
          <div className="pr-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">Logged in as</p>
            <p className="text-sm font-bold">{user.name}</p>
          </div>
          <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
            {user.role}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Welcome Card */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-br from-pink-500 to-rose-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <ShieldCheck size={48} className="text-pink-100 opacity-80" />
              <h2 className="text-2xl md:text-4xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h2>
              <p className="text-pink-50 text-base md:text-lg leading-relaxed max-w-md">
                This is your secure control center. From here you can manage products, track orders, and monitor your website's overall health.
              </p>
              <button className="bg-white text-pink-600 px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95">
                Manage Products
              </button>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
          </div>
        </div>

        {/* Stats / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-card border border-primary/10 p-6 rounded-[2rem] shadow-sm">
             <h3 className="font-bold mb-4">Quick Insights</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-xl">
                  <span className="text-sm">Total Projects</span>
                  <span className="font-bold text-pink-500">12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-xl">
                  <span className="text-sm">Store Items</span>
                  <span className="font-bold text-pink-500">45</span>
                </div>
             </div>
          </div>

          <button 
            onClick={() => {
              document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              localStorage.removeItem("user");
              router.push("/login");
            }}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-2xl font-bold transition-all"
          >
            <LogOut size={18} /> Logout Session
          </button>
        </div>

      </div>
    </motion.div>
  );
}