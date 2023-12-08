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
          const db = await dbConnect()
          // const passwordHashed = bcrypt.hashSync(credentials.password, 10)
          // console.log(passwordHashed)
          const [user] = await db.query(
            'SELECT * FROM user WHERE email = ?',
            [credentials?.email]
          )

          if (user && credentials?.password && await bcrypt.compareSync(credentials.password, user[0].password)) {
            return Promise.resolve(user[0])
          } else {
            return Promise.resolve(null)
          }
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
