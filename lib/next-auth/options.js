import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import prisma from '../prisma'

export const nextAuthOptions = {
  debug: false,
  providers: [
    // 他にも Google など設定できる
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    }),
  ],
  // vercel postgres に Prisma でユーザーを保存したいので↓を設定
  // adapter: PrismaAdapter(prisma),
  // セッションやユーザー情報を返すことができる
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
    },
  },
}
