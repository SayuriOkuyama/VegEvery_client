import Image from 'next/image'
import Link from 'next/link'

function Logo({ size }) {
  return (
    <Link href={'/'} className="logo_link">
      <Image
        priority
        src="/logo.png"
        alt="VegEvery"
        width={size}
        height={(size / 10) * 11}
        className="mx-auto"
      />
    </Link>
  )
}

export default Logo
