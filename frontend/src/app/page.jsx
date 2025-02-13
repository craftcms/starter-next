import { createPage } from '../lib/createPage'
import { HOME_QUERY } from '../queries/home'

export const dynamic = 'force-static'
export const revalidate = 3600

const transform = (data) => {
  if (!data?.entries?.[0]) return null
  
  const entry = data.entries[0]
  return {
    title: entry.title || '',
    pageSubheading: entry.pageSubheading || '',
    pageContent: entry.pageContent || '',
    image: entry.image || [],
  }
}

export default createPage(HOME_QUERY, transform, null)