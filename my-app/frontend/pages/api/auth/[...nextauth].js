import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../prisma.js'
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const user = await prisma.credentials.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !await bcrypt.compare(credentials.password, user.password)) {
          return null;
        }
        return { id: user.id, Fname: user.firstName, Lname: user.lastName, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.Fname = user.Fname;
        token.Lname = user.Lname;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.Fname = token.Fname;
      session.user.Lname = token.Lname;
      session.user.email = token.email;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
});
