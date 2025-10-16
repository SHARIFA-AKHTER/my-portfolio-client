// "use client";

// import React, { useState } from "react";
// import { FieldValues, useForm } from "react-hook-form";

// import Image from "next/image";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import { toast } from "sonner";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../../../components/ui/form";
// import { Input } from "../../../../components/ui/input";
// import { Button } from "../../../../components/ui/button";

// export default function LoginForm() {
//   const form = useForm<FieldValues>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   const onSubmit = async () => {
//     setLoading(true);

//     try {
//       signIn("credentials", {
//         // redirect: false,
//         // email: values.email,
//         callbackUrl: "/",
//       });

//       setLoading(false);

//       // if (result?.error) {
//       //   toast.error(result.error);
//       // } else if (result?.ok) {
//       //   toast.success("Login Successful!");

//       //   // Save user info in localStorage
//       //   localStorage.setItem("user", JSON.stringify({ email: values.email }));

//       //   // Redirect to dashboard or role-based page

//       //   router.push("/");
//       // router.push("/dashboard");
//       // }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong during login.");
//       setLoading(false);
//     } finally {
//       console.log("Login attempt completed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side Image */}
//       <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
//         <Image
//           src="/login image.jpg"
//           alt="Login illustration"
//           width={500}
//           height={500}
//           className="rounded-lg shadow-lg"
//         />
//       </div>

//       {/* Right Side Form */}
//       <div className="flex flex-1 items-center justify-center bg-gray-50">
//         <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-6 w-full"
//             >
//               <h2 className="text-3xl font-bold text-center text-blue-600">
//                 Welcome Back
//               </h2>

//               {/* Email */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="Enter your email"
//                         {...field}
//                         disabled={loading}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Enter your password"
//                         {...field}
//                         disabled={loading}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </Button>
//             </form>
//           </Form>

//           {/* Divider */}
//           <div className="flex items-center justify-center space-x-2">
//             <div className="h-px w-16 bg-gray-300" />
//             <span className="text-sm text-gray-500">or continue with</span>
//             <div className="h-px w-16 bg-gray-300" />
//           </div>

//           {/* Social Login */}
//           <div className="flex flex-col gap-3 mt-4">
//             <Button
//               variant="outline"
//               className="flex items-center justify-center gap-2"
//               onClick={() => signIn("github", { callbackUrl: "/" })}
//             >
//               <Image
//                 src="https://img.icons8.com/ios-glyphs/24/github.png"
//                 alt="GitHub"
//                 width={20}
//                 height={20}
//               />
//               Login with GitHub
//             </Button>

//             <Button
//               variant="outline"
//               className="flex items-center justify-center gap-2"
//               onClick={() => signIn("google", { callbackUrl: "/" })}
//             >
//               <Image
//                 src="https://img.icons8.com/color/24/google-logo.png"
//                 alt="Google"
//                 width={20}
//                 height={20}
//               />
//               Login with Google
//             </Button>
//           </div>

//           <p className="text-center text-sm text-gray-500 mt-4">
//             Don’t have an account?{" "}
//             <Link href="/register" className="text-blue-500 hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import { useForm, FieldValues } from "react-hook-form";
// import Image from "next/image";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import { toast } from "sonner";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../../../components/ui/form";
// import { Input } from "../../../../components/ui/input";
// import { Button } from "../../../../components/ui/button";
// import { useRouter } from "next/navigation";

// export default function LoginForm() {
//   const router = useRouter();
//   const form = useForm<FieldValues>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (values: FieldValues) => {
//     setLoading(true);

//     try {
//       const result = await signIn("credentials", {
//         redirect: false,
//         email: values.email,
//         password: values.password,
//         callbackUrl: "/",
//       });

//       setLoading(false);

//       if (result?.error) {
//         toast.error(result.error);
//       } else if (result?.ok) {
//         toast.success("Login successful!");
//         router.push("/");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong during login.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side Image */}
//       <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
//         <Image
//           src="/login image.jpg"
//           alt="Login illustration"
//           width={500}
//           height={500}
//           className="rounded-lg shadow-lg"
//         />
//       </div>

//       {/* Right Side Form */}
//       <div className="flex flex-1 items-center justify-center bg-gray-50">
//         <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-6 w-full"
//             >
//               <h2 className="text-3xl font-bold text-center text-blue-600">
//                 Welcome Back
//               </h2>

//               {/* Email */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="Enter your email"
//                         {...field}
//                         disabled={loading}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Enter your password"
//                         {...field}
//                         disabled={loading}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </Button>
//             </form>
//           </Form>

//           <div className="flex items-center justify-center space-x-2">
//             <div className="h-px w-16 bg-gray-300" />
//             <span className="text-sm text-gray-500">or continue with</span>
//             <div className="h-px w-16 bg-gray-300" />
//           </div>

//           <div className="flex flex-col gap-3 mt-4">
//             <Button
//               variant="outline"
//               className="flex items-center justify-center gap-2"
//               onClick={() => signIn("github", { callbackUrl: "/" })}
//             >
//               <Image
//                 src="https://img.icons8.com/ios-glyphs/24/github.png"
//                 alt="GitHub"
//                 width={20}
//                 height={20}
//               />
//               Login with GitHub
//             </Button>

//             <Button
//               variant="outline"
//               className="flex items-center justify-center gap-2"
//               onClick={() => signIn("google", { callbackUrl: "/" })}
//             >
//               <Image
//                 src="https://img.icons8.com/color/24/google-logo.png"
//                 alt="Google"
//                 width={20}
//                 height={20}
//               />
//               Login with Google
//             </Button>
//           </div>

//           <p className="text-center text-sm text-gray-500 mt-4">
//             Don’t have an account?{" "}
//             <Link href="/register" className="text-blue-500 hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (res?.error) {
//       setError(res.error);
//     } else {
//       router.push("/dashboard");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
//       <h1 className="text-xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         {error && <p className="text-red-500">{error}</p>}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// "use client";

// import React from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import Image from "next/image";
// import { signIn } from "next-auth/react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../../../components/ui/form";
// import { Input } from "../../../../components/ui/input";
// import { Button } from "../../../../components/ui/button";
// import Link from "next/link";
// import { login } from "@/actions/auth";

// export default function LoginForm() {
//   const form = useForm<FieldValues>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (values: FieldValues) => {
//     try {
//       const res = await login(values);
//       console.log("login Successful", res);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSocialLogin = (provider: "google" | "github") => {
//     console.log(`Login with ${provider}`);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6 w-full max-w-md"
//           >
//             <h2 className="text-3xl font-bold text-center">Login</h2>

//             {/* Email */}
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="Enter your email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Password */}
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="Enter your password"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="w-full mt-2">
//               Login
//             </Button>

//             <div className="flex items-center justify-center space-x-2">
//               <div className="h-px w-16 bg-gray-300" />
//               <span className="text-sm text-gray-500">or continue with</span>
//               <div className="h-px w-16 bg-gray-300" />
//             </div>
//           </form>
//         </Form>
//         {/* Social Login Buttons */}
//         <div className="flex flex-col gap-3 mt-4">
//           <Button
//             variant="outline"
//             className="flex items-center justify-center gap-2"
//             onClick={() => handleSocialLogin("github")}
//           >
//             <Image
//               src="https://img.icons8.com/ios-glyphs/24/github.png"
//               alt="GitHub"
//               className="w-5 h-5"
//               width={20}
//               height={20}
//             />
//             Login with GitHub
//           </Button>

//           <Button
//             variant="outline"
//             className="flex items-center justify-center gap-2"
//             onClick={() =>
//               signIn("google", {
//                 callbackUrl: "/dashboard",
//               })
//             }
//           >
//             {/* Google */}
//             <Image
//               src="https://img.icons8.com/color/24/google-logo.png"
//               alt="Google"
//               className="w-5 h-5"
//               width={20}
//               height={20}
//             />
//             Login with Google
//           </Button>
//         </div>
//         <p className="text-center text-sm text-gray-500 mt-4">
//           Don’t have an account?{" "}
//           <Link href="/register" className="text-blue-500 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";



export default function LoginForm() {
  const router = useRouter();
  const form = useForm<FieldValues>({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await loginUser(values);
      if (res.success) {
        toast.success(res.message || "Login successful!");
        router.push("/dashboard");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-96 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center">Login</h2>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-blue-600 text-white">Login</Button>
          <p className="text-center text-sm">
            Don't have an account? <Link href="/register" className="text-blue-500">Register</Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
