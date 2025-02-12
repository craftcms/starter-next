import { notFound } from 'next/navigation'
import { createPage } from '../../lib/createPage'
import { PAGE_QUERY } from '../../queries/pages'

export const dynamic = 'force-static'
export const revalidate = 3600

const transform = (data) => {
  if (!data?.entry) return notFound()
  
  return {
    ...data.entry,
    title: data.entry.title || '',
    pageSubheading: data.entry.pageSubheading || '',
    pageContent: data.entry.pageContent || '',
    image: data.entry.image || []
  }
}

export default createPage(PAGE_QUERY, transform, null, {
  variables: ({ params }) => ({
    uri: params?.slug?.join('/') || ''
  })
})
