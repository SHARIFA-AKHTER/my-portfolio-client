/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser, loginWithGoogle, loginWithFacebook } from "@/actions/auth";
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
import { ShieldCheck, User as UserIcon, Loader2, Facebook } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const form = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

const handleDemoLogin = async (role: "admin" | "user") => {
  const email = role === "admin" ? "sharifa5@gmail.com" : "sr0589071@gmail.com";
  const password = "123456";

  form.setValue("email", email);
  form.setValue("password", password);

  toast.promise(onSubmit({ email, password }), {
    loading: `Logging in as ${role}...`,
    success: `${role.toUpperCase()} login successful!`,
    error: "Demo login failed.",
  });
};
  // --- Normal Email/Password Login ---
  const onSubmit = async (values: FieldValues) => {
    setLoading(true);
    try {
      const res = await loginUser(values);
      if (res.success) {
        toast.success(res.message || "Login successful!");
        setTimeout(() => window.location.replace("/"), 1000);
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setSocialLoading(provider);

    await signIn(provider, { callbackUrl: "/login?sync=true" });
  };

  // useEffect(() => {
  //   const syncUser = async () => {
  //     const session: any = await getSession();
  //     const urlParams = new URLSearchParams(window.location.search);

  //     if (session?.idToken && urlParams.get("sync") === "true") {
  //       try {
  //         const res = await loginWithGoogle(session.idToken);

  //         if (res?.success) {
  //           toast.success("Login successful!");

  //           window.location.replace("/");
  //         }
  //       } catch (err: any) {
  //         console.error("Sync error:", err);
  //         toast.error(err.message || "Sync failed");

  //         window.history.replaceState({}, document.title, "/login");
  //       }
  //     }
  //   };

  //   syncUser();
  // }, []);

  useEffect(() => {
  const syncUser = async () => {
    const session: any = await getSession();
    const urlParams = new URLSearchParams(window.location.search);
    const shouldSync = urlParams.get("sync") === "true";

    if (session && shouldSync) {
      try {
        let res;

        // --- Google Sync ---
        if (session.provider === "google" && session.idToken) {
          res = await loginWithGoogle(session.idToken);
        } 
      
        else if (session.provider === "facebook" && session.accessToken) {
          res = await loginWithFacebook(session.accessToken, session.user);
        }

        if (res?.success) {
          toast.success("Login successful!");
          window.location.replace("/");
        }
      } catch (err: any) {
        console.error("Sync error:", err);
        toast.error(err.message || "Sync failed");
    
        window.history.replaceState({}, document.title, "/login");
      }
    }
  };

  syncUser();
}, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-[#0f172a] p-4 transition-colors duration-500">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl dark:shadow-blue-900/10 border border-slate-100 dark:border-slate-800 transition-all"
        >
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome Back
            </h2>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-700 dark:text-slate-300">
                  Email
                </FormLabel>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-700 dark:text-slate-300">
                  Password
                </FormLabel>
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={!!socialLoading}
              onClick={() => handleSocialLogin("google")}
              className="rounded-xl h-11 font-bold dark:text-white"
            >
              {socialLoading === "google" ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : null}
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={!!socialLoading}
              onClick={() => handleSocialLogin("facebook")}
              className="rounded-xl h-11 font-bold text-[#1877F2]"
            >
              {socialLoading === "facebook" ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <Facebook size={18} className="mr-2" />
              )}
              Facebook
            </Button>
          </div>

          <div className="relative my-4 flex items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="px-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
              Demo
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Demo Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin("admin")}
              className="rounded-xl border-orange-100 text-orange-600 font-bold text-xs"
            >
              <ShieldCheck size={14} className="mr-1" /> Admin Demo
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin("user")}
              className="rounded-xl border-blue-100 text-blue-600 font-bold text-xs"
            >
              <UserIcon size={14} className="mr-1" /> User Demo
            </Button>
          </div>

          <p className="text-center text-sm mt-6 dark:text-slate-400">
            New here?{" "}
            <Link href="/register" className="text-blue-600 font-black">
              Create Account
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
