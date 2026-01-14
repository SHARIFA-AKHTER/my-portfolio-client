/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//        async signIn({account }) {
//       if (account?.provider === "google") {
//         return true; 
//       }
//       return true;
//     },
//     async jwt({ token, account }) {
//       if (account?.id_token) {
//         token.idToken = account.id_token;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       session.idToken = token.idToken;
//       return session;
//     },
//   },
//   secret: process.env.AUTH_SECRET,
//   debug: true, 
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
              idToken: account.id_token,
            }),
          });
          const result = await res.json();
          return result.success;
        } catch (error) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.idToken = token.idToken;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };