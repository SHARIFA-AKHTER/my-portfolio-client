/* eslint-disable @typescript-eslint/no-explicit-any */


import { FieldValues } from "react-hook-form";

export const registerUser = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Registration failed");
    }

    const result = await res.json();
    return result;
  } catch (err: any) {
    console.error("Register Error:", err);
    throw err;
  }
};

// Login
export const loginUser = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Login failed");
    }

    const result = await res.json();

    if (result?.success && result?.token && result?.user) {
      // Save token and user info client-side
      document.cookie = `token=${result.token}; path=/;`;
      localStorage.setItem("user", JSON.stringify(result.user));
    }

    return result;
  } catch (err: any) {
    console.error("Login Error:", err);
    throw err;
  }
};

// Google Login
export const loginWithGoogle = async (googleToken: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: googleToken }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Google Login failed");
    }

    const result = await res.json();

    if (result?.success && result?.token && result?.user) {
      document.cookie = `token=${result.token}; path=/;`;
      localStorage.setItem("user", JSON.stringify(result.user));
    }

    return result;
  } catch (err: any) {
    console.error("Google Login Error:", err);
    throw err;
  }
};

