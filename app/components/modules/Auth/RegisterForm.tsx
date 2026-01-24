// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import React from "react";
// import { useForm, FieldValues } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { registerUser } from "@/actions/auth";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { toast } from "sonner";

// export default function RegisterForm() {
//   const router = useRouter();
//   const form = useForm<FieldValues>({
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//       role: "USER",
//     },
//   });

//   const onSubmit = async (values: FieldValues) => {
//     try {
//       const res = await registerUser(values);
//       if (res.success) {
//         toast.success(res.message || "Registered successfully!");
//         router.push("/login");
//       } else {
//         toast.error(res.message || "Registration failed");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="flex min-h-screen justify-center items-center bg-gray-50">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6 w-96 bg-white p-8 rounded-lg shadow-lg"
//         >
//           <h2 className="text-3xl font-bold text-center">Register</h2>

//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter email" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter phone" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Enter password"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="role"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Role</FormLabel>
//                 <FormControl>
//                   <select {...field} className="w-full border p-2 rounded-md">
//                     <option value="USER">User</option>
//                     <option value="ADMIN">Admin</option>
//                   </select>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full bg-blue-600 text-white">
//             Register
//           </Button>
//           <p className="text-center text-sm">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-500">
//               Login
//             </Link>
//           </p>
//         </form>
//       </Form>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    setLoading(true);
    console.log("🚀 Submitting Registration Data:", values); // ডাটা যা সার্ভারে যাচ্ছে

    try {
      const res = await registerUser(values);
      console.log("✅ Server Response:", res); // সার্ভার থেকে আসা রেসপন্স

      if (res.success) {
        toast.success(res.message || "Registered successfully!");
        router.push("/login");
      } else {
        console.warn("⚠️ Registration Failed:", res.message); // যদি রেজিস্ট্রেশন ফেইল হয়
        toast.error(res.message || "Registration failed");
      }
    } catch (err: any) {
      console.error("❌ Registration Error:", err); // কোনো সিরিয়াস এরর হলে
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
      console.log("🏁 Registration Process Finished.");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-slate-50 dark:bg-[#0f172a] p-4 transition-colors duration-500">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-lg bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl dark:shadow-blue-900/10 border border-slate-100 dark:border-slate-800 transition-all"
        >
          {/* Header Section */}
          <div className="text-center space-y-2 mb-6">
            <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
              <UserPlus size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Join us to manage your projects and profile
            </p>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700 dark:text-slate-300 pl-1">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your Name" 
                      className="rounded-xl h-12 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-white" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700 dark:text-slate-300 pl-1">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="name@example.com" 
                      className="rounded-xl h-12 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-white" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700 dark:text-slate-300 pl-1">Phone</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="017xx-xxxxxx" 
                      className="rounded-xl h-12 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-white" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700 dark:text-slate-300 pl-1">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="rounded-xl h-12 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Custom Styled Role Selection */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-700 dark:text-slate-300 pl-1">I am a...</FormLabel>
                <FormControl>
                  <div className="relative">
                    <select 
                      {...field} 
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 dark:text-white outline-none appearance-none cursor-pointer font-medium"
                    >
                      <option value="USER">Standard User</option>
                      <option value="ADMIN">Administrator</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l pl-2 border-slate-200 dark:border-slate-700">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-400">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] mt-4"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Create Account"}
          </Button>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-black">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}