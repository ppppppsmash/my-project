import NextAuth from 'next-auth'
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
          const [user] = await db.query('SELECT * FROM user WHERE email = ?', [credentials?.email])

          if (!credentials?.email || !credentials?.password) {
            return Promise.resolve(null)
          }

          if (user && credentials?.password) {
            const passwordMatch = await bcrypt.compare(credentials.password, user[0].password)

            if (passwordMatch) {
              let loginedAt = user[0].loginedAt
              let lastLoginedAt = user[0].lastLoginedAt

              if (loginedAt) {
                lastLoginedAt = loginedAt
              }

              loginedAt = new Date().toISOString()

              await db.query('UPDATE user SET loginedAt = ?, lastLoginedAt = ? WHERE email = ?', [loginedAt, lastLoginedAt, credentials?.email])

              return Promise.resolve({ ...user[0] , loginedAt, lastLoginedAt })
            }
          }

          // 登録&パスワードのハッシュ化
          const hashedPassword = await bcrypt.hash(credentials.password, 10)
          // ユーザーの作成
          const newUser = {
            email: credentials.email,
            password: hashedPassword,
            loginedAt: new Date().toISOString(),
            lastLoginedAt: null
          }

          // ユーザーをデータベースに保存
          const result = await db.query('INSERT INTO user SET ?', newUser)

          if (result.insertId) {
            // 登録に成功した場合、ユーザー情報を返す
            return Promise.resolve({ ...newUser, id: result.insertId })
          } else {
            return Promise.resolve(null) // 登録に失敗した場合
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
          session.user.loginedAt = user[0].loginedAt
          session.user.lastLoginedAt = user[0].lastLoginedAt
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/auth',
    signOut: '/auth'
  }
})

export { handler as GET, handler as POST }
