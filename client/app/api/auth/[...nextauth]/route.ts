import NextAuth from 'next-auth'
//import { TypeORMAdapter } from '@auth/typeorm-adapter'
//import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { ConnectionOptions } from 'typeorm'
//import { authOptions } from "@/lib/auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { dbConnect } from '@/lib/dbConnect'

const handler = NextAuth({
//  adapter: TypeORMAdapter(connection, { entities }),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const db = await dbConnect()
          const [user] = await db.query(
            'SELECT * FROM user WHERE email = ? AND password = ?',
            [credentials?.email, credentials?.password]
          )

          console.log(user[0])

          if (user) {
            // 認証成功
            return Promise.resolve(user[0])
          } else {
            // 認証失敗
            return Promise.resolve(null);
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
    maxAge: 60 * 60 * 24 * 10,
    updateAge: 60 * 1
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    // async session({ session, token }) {
    //   if (session?.user) {
    //     session.user.id = token.sub;
    //   }
    //   return session;
    // },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = (token as { sub: string }).sub
      }
      return session
    }
  },
  pages: {
    signIn: '/signin',
    signOut: '/signin'
  }
})

export { handler as GET, handler as POST }
