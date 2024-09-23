import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        code: { label: '6 or 9 Digit Code', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // User authentication logic here
        const user = { id: '1', name: 'John Doe', code: credentials?.code, role: 'student' }; // Default role set
        const isValidCode = /^\d{6}$|^\d{9}$/.test(credentials?.code || '');
        if (isValidCode && credentials?.code === '123456' && credentials.password === 'password') {
          return user; // Return user on successful authentication
        } else {
          return null; // Return null on authentication failure
        }
      },
    }),
  ],

  // Use JWT to manage session
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Secret key for signing JWT
  },
  pages: {
    signIn: '/signin', // Login page path
    error: '/error', // Error page path
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role; // Add user role to token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string; // Add user role to session
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async redirect({ baseUrl, token }: { baseUrl: string; token?: any }) {
      if (token?.role === 'professor') {
        return '/professor/dashboard';
      } else if (token?.role === 'student') {
        return '/student/dashboard';
      }
      return baseUrl; // 기본 경로로 리다이렉트
    },
  },
};

// NextAuth handler setup
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
