"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FieldValues) => {
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      setLoading(false);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.ok) {
        toast.success("Login Successful!");

        // Redirect to dashboard or role-based page
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during login.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
        <Image
          src="/login image.jpg"
          alt="Login illustration"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <h2 className="text-3xl font-bold text-center text-blue-600">
                Welcome Back
              </h2>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="flex items-center justify-center space-x-2">
            <div className="h-px w-16 bg-gray-300" />
            <span className="text-sm text-gray-500">or continue with</span>
            <div className="h-px w-16 bg-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex flex-col gap-3 mt-4">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              <Image
                src="https://img.icons8.com/ios-glyphs/24/github.png"
                alt="GitHub"
                width={20}
                height={20}
              />
              Login with GitHub
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <Image
                src="https://img.icons8.com/color/24/google-logo.png"
                alt="Google"
                width={20}
                height={20}
              />
              Login with Google
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import Image from "next/image";
// import { signIn } from "next-auth/react";
// import Link from "next/link";

// export default function LoginForm() {
//   const form = useForm<FieldValues>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (values: FieldValues) => {
//     try {
//       signIn("credentials", {
//         ...values,
//         callbackUrl: "/dashboard",
//       });
//     } catch (err) {
//       console.error(err);
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
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 Login
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
//               onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
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
//               onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
