import Head from 'next/head'
import { Zen_Kaku_Gothic_New } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layouts/Navigation/Navigation'
import { UserProvider } from '@/contexts/userProvider'
import Footer from '@/components/layouts/Footer'

const zenKakuGothic = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['500'],
})

export const metadata = {
  title: 'VegEvery',
  description:
    'for Every Vegetarian：すべてのベジタリアンのための"食"情報サイト',
}

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/logo.png" />
      </Head>
      <html lang="ja">
        <body
          className={`${zenKakuGothic.className} min-h-full sm:pb-50 relative`}>
          <UserProvider>
            {children}
            <Navigation />
            <footer className="hidden sm:block w-full mt-auto bg-green">
              <Footer />
            </footer>
          </UserProvider>
        </body>
      </html>
    </>
  )
}
