import { createPage } from '../../lib/createPage'
import { PAGE_QUERY } from '../../queries/pages'

// Custom transform function to match the data structure
const transform = (data) => {
  if (!data?.entry) {
    throw new Error('Page not found')
  }
  
  return {
    ...data.entry,
    // Ensure all required fields are present
    title: data.entry.title || '',
    pageSubheading: data.entry.pageSubheading || '',
    pageContent: data.entry.pageContent || '',
    image: data.entry.image || []
  }
}

export default createPage(PAGE_QUERY, transform)
