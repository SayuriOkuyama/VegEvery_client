import { Zen_Kaku_Gothic_New } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layouts/Navigation/Navigation'
import { UserProvider } from '@/contexts/UserProvider'

const zenKakuGothic = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['500'],
})

export const metadata = {
  title: 'VegEvery',
  description: 'for Every Vegetarian',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={zenKakuGothic.className}>
        <UserProvider>
          {children}
          <Navigation />
        </UserProvider>
      </body>
    </html>
  )
}
