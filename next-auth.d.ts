/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    idToken?: string; 
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    idToken?: string;
  }
}