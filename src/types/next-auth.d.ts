/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// 1️⃣ Extend the User type
declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
    role?: "ADMIN" | "USER";
  }

  interface Session {
    user?: {
      id?: string;
      email?: string;
      name?: string;
      role?: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}

// 2️⃣ Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    role?: "ADMIN" | "USER";
  }
}
