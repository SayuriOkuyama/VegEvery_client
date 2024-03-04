import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <div>
        <Link href={'/'} className="logo_link">
          <Image
            priority
            src="/logo.png"
            alt="VegEvery"
            width={50}
            height={50}
            className="mx-auto"
          />
        </Link>
      </div>
    </>
  )
}
