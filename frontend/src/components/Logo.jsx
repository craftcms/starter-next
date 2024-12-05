import Link from 'next/link'
import Image from 'next/image'

export default function Logo({ siteName = 'Site Name', logo = { url: '', alt: '' } }) {
  return (
    <Link href="/" className="text-red-600 block">
      {logo.length > 0 ? (
        <>
          <span className="sr-only">{siteName}</span>
          <Image 
            src={logo[0].url}
            alt={logo[0].alt}
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
