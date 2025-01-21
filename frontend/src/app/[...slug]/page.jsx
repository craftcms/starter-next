import { createPage } from '../../lib/createPage'
import { PAGE_QUERY } from '../../queries/pages'

export const dynamic = 'force-static'
export const revalidate = 3600

// Custom transform function to match the data structure
const transform = (data) => {
  if (!data?.entry) {
    throw new Error('Page not found')
  }
  
  return {
    ...data.entry,
    title: data.entry.title || '',
    pageSubheading: data.entry.pageSubheading || '',
    pageContent: data.entry.pageContent || '',
    image: data.entry.image || []
  }
}

export default createPage(PAGE_QUERY, transform)
