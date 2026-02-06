
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, FieldValues } from "react-hook-form";
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
import { ShieldCheck, User as UserIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import GoogleLoginButton from "../../auth/GoogleLoginButton";
import FacebookLoginButton from "../../auth/FacebookLoginButton";


export default function LoginForm() {
  const [loading, setLoading] = useState(false); 

  const form = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

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

  const handleDemoLogin = async (role: "admin" | "user") => {
    const email = role === "admin" ? "sharifa5@gmail.com" : "sharifa1@gmail.com";
    const password = "123456";
    form.setValue("email", email);
    form.setValue("password", password);

    toast.promise(onSubmit({ email, password }), {
      loading: `Logging in as ${role}...`,
      success: `${role.toUpperCase()} login successful!`,
      error: (err) => err.message || "Demo login failed.",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-[#0f172a] p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-4xl shadow-2xl border border-slate-100 dark:border-slate-800"
        >
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Welcome Back</h2>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" className="rounded-xl h-12" {...field} />
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
                <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" className="rounded-xl h-12" {...field} />
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
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Sign In"}
          </Button>

          <div className="relative my-6 flex items-center">
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="px-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-white dark:bg-slate-900">Social Login</span>
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <GoogleLoginButton />
            <FacebookLoginButton /> 
          </div>

          <div className="relative my-6 flex items-center">
            <div className="grow border-t border-slate-200 dark:border-slate-800 border-dashed"></div>
            <span className="px-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-white dark:bg-slate-900">Quick Demo</span>
            <div className="grow border-t border-slate-200 dark:border-slate-800 border-dashed"></div>
          </div>

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

          <p className="text-center text-sm mt-8 dark:text-slate-400">
            New here? <Link href="/register" className="text-blue-600 font-black hover:underline">Create Account</Link>
          </p>
        </form>
      </Form>
    </div>
  );
}