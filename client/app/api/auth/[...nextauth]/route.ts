import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import { dbConnect } from '@/lib/dbConnect'
import bcrypt from 'bcrypt'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@gmail.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const db = await dbConnect();
          const [user] = await db.query('SELECT * FROM user WHERE email = ?', [credentials?.email])

          if (!credentials?.email || !credentials?.password) {
            return Promise.resolve(null)
          }

          if (user && credentials?.password) {
            const passwordMatch = await bcrypt.compare(credentials.password, user[0].password)
            if (passwordMatch) {
              return Promise.resolve(user[0])
            }
          }
          return Promise.resolve(null)
        } catch (error) {
          console.error('Authentication error:', error)
          return Promise.resolve(null)
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60,
    updateAge: 2 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = (token as { sub: string }).sub

        const db = await dbConnect()
        const [user] = await db.query('SELECT * FROM user WHERE email = ?', [session.user.email])
        if(user) {
          session.user.image = user[0].image
        }
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
    signOut: '/signin'
  }
});

export { handler as GET, handler as POST }
