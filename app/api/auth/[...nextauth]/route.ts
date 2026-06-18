import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/_lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-expect-error under construction
      session.accessToken = token.accessToken;
      // @ts-expect-error under construction
      session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
