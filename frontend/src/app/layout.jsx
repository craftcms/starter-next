import { GLOBALS_QUERY } from '../queries/globals'
import { fetchGraphQL } from '../lib/graphql'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "./globals.css"

export default async function RootLayout({ children }) {
  const data = await fetchGraphQL(GLOBALS_QUERY)
  const globalsData = data?.globalEntries?.[0] || {}
  const pages = data?.pagesEntries || []
  const siteName = process.env.SITE_NAME || 'Next Starter'

  return (
    <html lang="en">
      <body>
        <Header 
          siteName={siteName} 
          logo={globalsData.logo} 
          pages={pages}
        />
        {children}
        <Footer address={globalsData.address} />
      </body>
    </html>
  )
}
