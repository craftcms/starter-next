import './globals.css'
import { GLOBALS_QUERY } from '../queries/globals'
import { fetchGraphQL } from '../lib/graphql'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default async function RootLayout({ children }) {
  const data = await fetchGraphQL(GLOBALS_QUERY)
  const globalData = data?.globalEntries?.[0] || {}
  const pagesData = data?.pagesEntries || []

  return (
    <html lang="en">
      <body>
        <Header globalData={globalData} />
        <main>{children}</main>
        <Footer address={globalData.address} />
      </body>
    </html>
  )
}
