import { createPage } from '../../lib/createPage'
import { PAGE_QUERY } from '../../queries/pages'

export const dynamic = 'force-static'
export const revalidate = 3600

const transform = (data, isPreview = false) => {
  const entry = data?.entry || data?.entries?.[0] || {}
  
  return {
    title: entry.title || '',
    pageSubheading: entry.pageSubheading || '',
    pageContent: entry.pageContent || '',
    image: entry.image ? [entry.image] : undefined,
    ancestors: entry.ancestors || [],
    children: entry.children || [],
    ...entry
  }
}

export default createPage(PAGE_QUERY, transform, null, {
  variables: ({ params }) => ({
    uri: params?.slug?.join('/') || ''
  })
})
