import Link from 'next/link'
import Image from 'next/image'

export default function Logo({ siteName = 'Site Name', logo }) {
  return (
    <Link href="/" className="text-red-600 block">
      {logo?.url ? (
        <>
          <span className="sr-only">{siteName}</span>
          <Image 
            src={logo.url}
            alt={siteName}
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </>
      ) : (
        siteName
      )}
    </Link>
  )
}
