import { createPage } from '../lib/createPage'
import { HOME_QUERY } from '../queries/home'

export const dynamic = 'force-static'
export const revalidate = 3600

const transform = (data) => {
  if (!data?.entry) {
    return null
  }
  
  return {
    ...data.entry,
    title: data.entry.title || '',
    pageSubheading: data.entry.pageSubheading || '',
    pageContent: data.entry.pageContent || '',
    image: data.entry.image || []
  }
}

export default createPage(
  HOME_QUERY,
  transform,
  null,
  {
    variables: () => ({})
  }
)