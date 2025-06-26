import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../prisma.js'
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

/* 
 * providers:
 * custom CredentialsProvider
 *  - takes in credentials obj containing email, password
 *  - authorize() by retrieving user and comparing passwords
 *  - returns object containing user infomation
 * GoogleProvider
 *  - authenticate using google client
 * 
 * session:
 * handles authenitcation using jwt tokens
 * 
 * callbacks:
 * jwt
 *  - called when jwt token created/updated (login requests)
 *  - stores information returned by authorise() inside token
 * session
 *  - called when session object is checked or fetched (useSession(), getSession())
 *  - copies information in token into session for access
 * 
 * pages:
 *  - redirects to /login when rerouting client for login
 */
export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await prisma.credentials.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !await bcrypt.compare(credentials.password, user.password)) {
          return null;
        }
        return { id: user.id, Fname: user.firstName, Lname: user.lastName, email: user.email };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
