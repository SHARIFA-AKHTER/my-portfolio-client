// "use client";

// import React from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { register } from "@/actions/auth";
// export default function RegisterForm() {
//   const form = useForm<FieldValues>({
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//     },
//   });
//   const router = useRouter();
//   const onSubmit = async (values: FieldValues) => {
//     try {
//       const res = await register(values);
//       if (res?.id) {
//         toast.success("User Registered Successfully");
//         router.push("/login");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md"
//         >
//           <h2 className="text-3xl font-bold text-center">Register Now</h2>
//           {/* Name */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Email */}
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="email"
//                     placeholder="Enter your email"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Phone */}
//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your phone number" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Password */}
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Enter your password"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full mt-2">
//             Register
//           </Button>

//           <p className="text-center text-sm text-gray-500 mt-4">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </Form>
//     </div>
//   );
// }

"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { register } from "@/actions/auth";

export default function RegisterForm() {
  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await register(values);
      if (res?.id) {
        toast.success("User Registered Successfully");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
        <Image
          src="/register image.jpg"
          alt="Register illustration"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-center text-blue-600">
              Create Account
            </h2>

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Register
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
