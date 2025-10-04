// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "user@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid email or password");
//         }

//         const user = { id: "1", name: "Demo User", email: credentials.email };

//         if (user) {
//           return user;
//         }
//         return null;
//       },
//     }),
//   ],

//   secret: process.env.AUTH_SECRET,

//   // Custom pages
//   pages: {
//     signIn: "/login",
//   },

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//          token.role = user.role;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           ...session.user,
//           id: token.id as string,
//           email: token.email as string,
//           role: token.role,
//         };
//       }
//       return session;
//     },
//   },
// };

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Email/Password Login
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

        // 👉 Check from your backend if you want, for demo we'll hardcode roles
        let user;
        if (credentials.email === "sr0589071@gmail.com") {
          user = {
            id: "1",
            name: "Admin User",
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
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id!,
          role: token.role,
        };
      }
      return session;
    },
  },
};
