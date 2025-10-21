/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import React from "react";
// import { useForm, FieldValues } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { loginUser } from "@/actions/auth";
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

// export default function LoginForm() {
//   const router = useRouter();
//   const form = useForm<FieldValues>({
//     defaultValues: { email: "", password: "" },
//   });

//   const onSubmit = async (values: FieldValues) => {
//     try {
//       const res = await loginUser(values);
//       if (res.success) {
//         toast.success(res.message || "Login successful!");
//         router.push("/dashboard");
//       } else {
//         toast.error(res.message || "Login failed");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6 w-96 bg-white p-8 rounded-lg shadow-lg"
//         >
//           <h2 className="text-3xl font-bold text-center">Login</h2>

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

//           <Button type="submit" className="w-full bg-blue-600 text-white">
//             Login
//           </Button>
//           <p className="text-center text-sm">
//             Don't have an account?{" "}
//             <Link href="/register" className="text-blue-500">
//               Register
//             </Link>
//           </p>
//         </form>
//       </Form>
//     </div>
//   );
// }

"use client";

import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth";
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
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

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

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login with Google successful!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Google login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-96 bg-white p-8 rounded-lg shadow-lg"
        >
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
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-blue-600 text-white">
            Login
          </Button>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white hover:bg-red-600 mt-2"
          >
            Login with Google
          </Button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
