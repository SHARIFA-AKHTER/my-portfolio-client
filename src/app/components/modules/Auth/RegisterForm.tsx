/* eslint-disable @typescript-eslint/no-explicit-any */
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
      role: "USER", // default role
    },
  });

  const router = useRouter();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await register(values); // register action call
      console.log("Register Response Data:", res); // ✅ debug

      if (res?.success) {
        toast.success(res.message || "User registered successfully!");
        // 1. redirect login page
        router.push("/login");
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (err: any) {
      console.error("Register Error:", err);
      toast.error(err.message || "Something went wrong!");
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

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border p-2 rounded-md">
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
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

