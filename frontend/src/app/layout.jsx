import { GLOBALS_QUERY } from '../queries/globals'
import { fetchGraphQL } from '../lib/graphql'
import { FlashProvider } from '../lib/flashes'
import { Alert } from '../components/Alert'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "./globals.css"
import { SkipLink } from '../components/SkipLink'

export const metadata = {
  title: process.env.SITE_NAME,
  description: 'A minimal, production-ready starter for Next.js 15 and Craft CMS'
}

export default async function RootLayout({ children }) {
  const data = await fetchGraphQL(GLOBALS_QUERY, {}, {
    cache: 'force-cache',
    next: { revalidate: 3600 }
  })

  const globals = data?.globalEntries?.[0] || {}
  const pages = data?.pagesEntries || []
  const siteName = process.env.SITE_NAME || ''

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SkipLink />
        <Header 
          siteName={siteName} 
          logo={globals?.logo?.[0]}
          pages={pages}
        />
        <main id="main" className="min-h-screen">
          <FlashProvider>
            <Alert />
            {children}
          </FlashProvider>
        </main>
        <Footer address={globals?.address?.[0] || globals?.address} />
      </body>
    </html>
  )
}
