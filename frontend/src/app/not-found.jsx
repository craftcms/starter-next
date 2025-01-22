import Link from 'next/link'
export const dynamic = 'force-static' 

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link 
        href="/" 
        className="text-red-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 rounded"
      >
        Return to homepage
      </Link>
    </div>
  )
}