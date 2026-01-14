/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
       async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        return true; 
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.idToken = token.idToken;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: true, 
});

export { handler as GET, handler as POST };
