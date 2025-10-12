/* eslint-disable @typescript-eslint/no-explicit-any */
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import jwt from "jsonwebtoken";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     // 🔹 Google Login
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),

//     // 🔹 Email/Password Login
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "sr0589071@gmail.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Enter your password",
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           // throw new Error("Invalid email or password");
//           console.log("Invalid email or password");

//           return null;
//         }

//         // Demo user setup
//         let user;
//         if (credentials.email === "sr0589071@gmail.com") {
//           user = {
//             id: "1",
//             name: "Sharifa (Admin)",
//             email: credentials.email,
//             role: "ADMIN" as const,
//           };
//         } else {
//           user = {
//             id: "2",
//             name: "Regular User",
//             email: credentials.email,
//             role: "USER" as const,
//           };
//         }

//         return user;
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email as string;
//         token.role = user.role;

//         // ✅ Generate real JWT instead of fake one
//         token.accessToken = jwt.sign(
//           {
//             id: user.id,
//             email: user.email,
//             role: user.role,
//           },
//           process.env.NEXTAUTH_SECRET!,
//           { expiresIn: "7d" }
//         );
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.user = {
//         ...session.user,
//         id: token.id,
//         email: token.email,
//         role: token.role,
//       };

//       // ✅ attach access token to session
//       session.accessToken = token.accessToken;

//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,

//   pages: {
//     signIn: "/login",
//   },
// };

// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }
//   interface User {
//     id?: string;
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           console.error("Email or Password is missing");
//           return null;
//         }

//         try {
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 email: credentials.email,
//                 password: credentials.password,
//               }),
//             }
//           );
//           console.log("Response From Backend:", res);
//           if (!res?.ok) {
//             console.error("Login Failed", await res.text());
//             return null;
//           }

//           const user = await res.json();
//           if (user.id) {
//             return {
//               id: user?.id,
//               name: user?.name,
//               email: user?.email,
//               image: user?.picture,
//             };
//           } else {
//             return null;
//           }
//         } catch (err) {
//           console.error(err);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user?.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token?.id as string;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// };

// import CredentialsProvider from "next-auth/providers/credentials";

// import type { NextAuthOptions } from "next-auth";

// // 🔹 Type augmentation (Session, User, JWT)
// import { DefaultSession, DefaultUser } from "next-auth";

// declare module "next-auth" {
//   interface User extends DefaultUser {
//     id?: string;
//     role?: "ADMIN" | "USER";
//   }

//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       email?: string;
//       name?: string;
//       image?: string | null;
//       role?: "ADMIN" | "USER";
//     };
//     accessToken?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     email?: string;
//     role?: "ADMIN" | "USER";
//     accessToken?: string;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     // ✅ Google Login (optional)
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID as string,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     // }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "sr0589071@gmail.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Enter your password",
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           console.error("❌ Missing email or password");
//           return null;
//         }

//         try {
//           // 🔹 Send credentials to backend API
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 email: credentials.email,
//                 password: credentials.password,
//               }),
//             }
//           );

//           console.log("Response Status:", res.status);

//           if (!res.ok) {
//             console.error("Login Failed:", await res.text());
//             return null;
//           }

//           const user = await res.json();

//           if (!user?.id) return null;

//           // 🔹 Normalize role (in case backend sends lowercase)
//           const normalizedRole =
//             user.role?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER";

//           return {
//             id: user.id,
//             name: user.name || "User",
//             email: user.email,
//             image: user.image || null,
//             role: normalizedRole as "ADMIN" | "USER",
//           };
//         } catch (error) {
//           console.error("❌ Login Error:", error);
//           return null;
//         }
//       },
//     }),
//   ],

//   // session: {
//   //   strategy: "jwt",
//   // },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email ?? undefined;
//         token.role = user.role ?? "USER";

//         // token.accessToken = jwt.sign(
//         //   {
//         //     id: user.id,
//         //     email: user.email,
//         //     role: user.role,
//         //   },
//         //   // process.env.NEXTAUTH_SECRET!,
//         //   { expiresIn: "7d" }
//         // );
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.email = token.email;
//         session.user.role = token.role as "ADMIN" | "USER";
//       }

//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   // 🔹 Custom Login Page
//   pages: {
//     signIn: "/login",
//   },
// };

import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User extends DefaultUser {
    id?: string;
    role?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    accessToken?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();

          if (data?.data?.accessToken || !data?.data?.user) {
            throw new Error("Invalid login response");
          }

          return {
            id: data.data.user.id.toString(),
            name: data.data.user.name,
            email: data.data.user.email,
            role: data.data.user.role,
            accessToken: data.data.accessToken,
          };
        } catch (error: any) {
          console.error("Login failed:", error);
          throw new Error(error.message || "Login failed");
        }
      },
    }),

    // // 🟢 Google Login
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
  pages: { signIn: "/login" },
};
