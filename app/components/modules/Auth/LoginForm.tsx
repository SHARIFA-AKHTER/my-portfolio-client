/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser, loginWithGoogle } from "@/actions/auth";
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
import { getSession, signIn } from "next-auth/react";

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

// const handleGoogleLogin = async () => {

//   try {

//     const result = await signIn("google", { redirect: false });

//     if (result?.error) {
//       toast.error(result.error);
//       return;
//     }

//     toast.success("Logged in with Google! Syncing with server...");
    
//     router.push("/dashboard");

//   } catch (err: any) {
//     toast.error(err.message || "Google login failed");
//   }
// };

  const handleGoogleLogin = async () => {
  try {
    await signIn("google", { redirect: false });

    const session = await getSession();
    const googleToken = session?.idToken;

    if (!googleToken) {
      toast.error("Google token not found");
      return;
    }

    const res = await loginWithGoogle(googleToken);

    if (res.success) {
      toast.success("Login successful");
      router.push("/dashboard");
    } else {
      toast.error(res.message);
    }
  } catch (err: any) {
    toast.error(err.message);
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


/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

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
// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function LoginForm() {
//   const router = useRouter();
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
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

//   const handleGoogleLogin = async () => {
//     try {
//       setIsGoogleLoading(true);
      
//       const result = await signIn("google", { 
//         redirect: false,
//         callbackUrl: "/dashboard" 
//       });

//       if (result?.error) {
//         toast.error(result.error);
//         setIsGoogleLoading(false);
//         return;
//       }

//       if (result?.ok) {
//         toast.success("Logged in with Google!");
//         router.push("/dashboard");
//         router.refresh();
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Google login failed");
//       setIsGoogleLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6 w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
//         >
//           <div className="text-center space-y-2">
//             <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
//             <p className="text-sm text-gray-500">Please enter your details</p>
//           </div>

//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-semibold text-gray-700">Email</FormLabel>
//                 <FormControl>
//                   <Input 
//                     placeholder="example@mail.com" 
//                     className="focus-visible:ring-blue-500" 
//                     {...field} 
//                   />
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
//                 <FormLabel className="font-semibold text-gray-700">Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="••••••••"
//                     className="focus-visible:ring-blue-500"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl transition-all">
//             Sign In
//           </Button>

//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
//             <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span></div>
//           </div>

//           <Button
//             type="button"
//             disabled={isGoogleLoading}
//             onClick={handleGoogleLogin}
//             className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
//           >
//             {isGoogleLoading ? (
//               <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
//             ) : (
//               <svg className="h-5 w-5" viewBox="0 0 24 24">
//                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
//                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//               </svg>
//             )}
//             Google
//           </Button>

//           <p className="text-center text-sm text-gray-600 mt-4 font-medium">
//             Don't have an account?{" "}
//             <Link href="/register" className="text-blue-600 hover:underline font-bold">
//               Create one
//             </Link>
//           </p>
//         </form>
//       </Form>
//     </div>
//   );
// }