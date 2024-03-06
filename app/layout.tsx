import type { Metadata } from 'next'
import { Zen_Kaku_Gothic_New } from 'next/font/google'
import './globals.css'
import Header from '@/components/layouts/Header'
import Navigation from '@/components/layouts/Navigation/Navigation'

const zenKakuGothic = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['500'],
})

export const metadata: Metadata = {
  title: 'VegEvery',
  description: 'for Every Vegetarian',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={zenKakuGothic.className}>
        <Header />
        {children}
        <Navigation />
      </body>
    </html>
  )
}
