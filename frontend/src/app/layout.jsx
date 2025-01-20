import { GLOBALS_QUERY } from '../queries/globals'
import { fetchGraphQL } from '../lib/graphql'
import { FlashProvider } from '../lib/flashes'
import { Alert } from '../components/Alert'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "./globals.css"
import { RouteAnnouncer } from '../components/RouteAnnouncer'

export default async function RootLayout({ children }) {
  const data = await fetchGraphQL(GLOBALS_QUERY)
  const globals = data?.globalEntries?.[0] || {}
  const pages = data?.pagesEntries || []
  const siteName = process.env.SITE_NAME || 'Next Starter'

  return (
    <html lang="en">
      <body>
        <RouteAnnouncer />
        <Header 
          siteName={siteName} 
          logo={globals.logo?.[0] || null}
          pages={pages}
        />
        <div className="min-h-screen">
          <FlashProvider>
            <Alert />
            {children}
          </FlashProvider>
        </div>
        <Footer address={globals.address?.[0] || globals.address || null} />
      </body>
    </html>
  )
}
