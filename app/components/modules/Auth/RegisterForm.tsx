/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
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

export default function RegisterForm() {
  const router = useRouter();
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
    try {
      const res = await registerUser(values);
      if (res.success) {
        toast.success(res.message || "Registered successfully!");
        router.push("/login");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-96 bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center">Register</h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone" {...field} />
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

          <Button type="submit" className="w-full bg-blue-600 text-white">
            Register
          </Button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
