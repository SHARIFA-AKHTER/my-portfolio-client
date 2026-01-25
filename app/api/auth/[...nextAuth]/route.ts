
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

callbacks: {
  async jwt({ token, account }: any) {
    if (account) {
    
      token.idToken = account.id_token || null; 
      token.accessToken = account.access_token;
    }
    return token;
  },
  async session({ session, token }: any) {
    session.idToken = token.idToken;
    session.accessToken = token.accessToken;
    return session;
  },
},
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login', 
  }
});

export { handler as GET, handler as POST };