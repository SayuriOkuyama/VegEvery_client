import Header from '@/components/layouts/Header'

export default function HeaderLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
