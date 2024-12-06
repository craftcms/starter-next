import { PreviewHome } from '../components/PreviewHome'
import { HomeContent } from '../components/HomeContent'
import { fetchGraphQL } from '../lib/graphql'
import { HOME_QUERY } from '../queries/home'

// Server Component by default
export default async function Home({ searchParams }) {
  // Fetch initial data on the server
  const data = await fetchGraphQL(HOME_QUERY)
  
  // Check for preview mode
  const isPreview = Boolean(
    searchParams['x-craft-live-preview'] && 
    searchParams['token']
  )

  // If in preview mode, use client-side component
  if (isPreview) {
    return <PreviewHome initialData={data} />
  }

  // Otherwise render server-side
  const pageData = data?.entries?.[0] || {}
  return <HomeContent pageData={pageData} />
}
