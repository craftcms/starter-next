import { GLOBALS_QUERY } from '../queries/globals'
import { fetchGraphQL } from '../lib/graphql'
import { FlashProvider } from '../lib/flashes'
import { Alert } from '../components/Alert'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "./globals.css"
import { RouteAnnouncer } from '../components/RouteAnnouncer'

export const metadata = {
  title: process.env.SITE_NAME,
  description: 'A minimal, production-ready starter for Next.js 15 and Craft CMS'
}

export default async function RootLayout({ children }) {
  let globals = {}
  let pages = []

  try {
    const data = await fetchGraphQL(GLOBALS_QUERY, {}, {
      cache: 'force-cache',
      next: { revalidate: 3600 }
    })

    if (!data) {
      console.error('No data returned from globals query')
    } else {
      globals = data?.globalEntries?.[0] || {}
      pages = data?.pagesEntries || []
    }
  } catch (error) {
    console.error('Error fetching globals:', error)
  }

  const siteName = process.env.SITE_NAME || ''

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <RouteAnnouncer />
        <Header 
          siteName={siteName} 
          logo={globals?.logo?.[0] || null}
          pages={pages}
        />
        <main id="main" className="min-h-screen">
          <FlashProvider>
            <Alert />
            {children}
          </FlashProvider>
        </main>
        <Footer 
          address={globals?.address?.[0] || globals?.address || null} 
        />
      </body>
    </html>
  )
}
