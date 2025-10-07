import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // 🔹 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // 🔹 Email/Password Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "sr0589071@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        // Demo user setup
        let user;
        if (credentials.email === "sr0589071@gmail.com") {
          user = {
            id: "1",
            name: "Sharifa (Admin)",
            email: credentials.email,
            role: "ADMIN" as const,
          };
        } else {
          user = {
            id: "2",
            name: "Regular User",
            email: credentials.email,
            role: "USER" as const,
          };
        }

        return user;
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email as string;
        token.role = user.role;

        // ✅ Generate real JWT instead of fake one
        token.accessToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.AUTH_SECRET!,
          { expiresIn: "7d" }
        );
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        role: token.role,
      };

      // ✅ attach access token to session
      session.accessToken = token.accessToken;

      return session;
    },
  },
};
