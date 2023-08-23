import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"; 
import dbConnect from '../../api/db';
import User from '../../../models/User';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },

      },

      authorize: async (credentials) => {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });

        if (user && user.password === credentials.password) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // customize the error page
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session(session, token) {
      session.user = token;
      return session;
    },
  },
});
