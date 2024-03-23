import Header from '@/components/layouts/Header'

export default function HeaderLayout({ children }) {
  return (
    <>
      {children}
      {/* <script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      /> */}
    </>
  )
}
