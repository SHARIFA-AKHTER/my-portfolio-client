"use server";
import { FieldValues } from "react-hook-form";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;
console.log("BASE_URL from env:", BASE_URL);

if (!BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_BASE_API is not defined in your environment variables."
  );
}

export const register = async (data: FieldValues) => {
  console.log("Register payload:", data);

  try {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Register Response Status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("User Registration Failed:", errorText);
      throw new Error(errorText || "Registration failed");
    }

    const responseData = await res.json();
    console.log("Register Response Data:", responseData);
    return responseData;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};

export const login = async (data: FieldValues) => {
  console.log("Login payload:", data);

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Login Response Status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Login Failed:", errorText);
      throw new Error(errorText || "Login failed");
    }

    const responseData = await res.json();
    console.log("Login Response Data:", responseData);
    return responseData;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// 🟢 GOOGLE LOGIN (New function)
export const googleLogin = async (googleToken: string) => {
  console.log("Google Login payload:", googleToken);

  try {
    const res = await fetch(`${BASE_URL}/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: googleToken }),
    });

    console.log("Google Login Response Status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Google Login Failed:", errorText);
      throw new Error(errorText || "Google Login failed");
    }

    const responseData = await res.json();
    console.log("Google Login Response Data:", responseData);
    return responseData;
  } catch (error) {
    console.error("Google Login Error:", error);
    throw error;
  }
};
