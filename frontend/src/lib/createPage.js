import { notFound } from 'next/navigation'
import { PagePreviewWrapper } from '../components/PagePreviewWrapper'
import { fetchGraphQL } from './graphql'

const ENTRIES_PER_PAGE = 4

export function createPage(query, transform, CustomContent, options = {}) {
  return async function Page({ params, searchParams }) {
    try {
      const resolvedParams = await params
      const resolvedSearchParams = await searchParams
      
      const { slug } = resolvedParams
      const uri = Array.isArray(slug) ? slug.join('/') : slug || ''
      
      const variables = {
        uri,
        ...options.variables
      }

      const data = await fetchGraphQL(query, variables, {
        preview: Boolean(
          resolvedSearchParams?.token && 
          resolvedSearchParams?.['x-craft-live-preview']
        ),
        revalidate: 3600
      })

      if (!data) {
        notFound()
      }

      // Transform the data on the server side
      let transformedData
      try {
        transformedData = transform ? transform(data) : data?.entry || data?.entries?.[0]
        if (!transformedData) {
          notFound()
        }
      } catch (error) {
        console.error('Transform Error:', error)
        notFound()
      }

      const pageTitle = transformedData.title
      const isBlog = data?.entry?.sectionHandle === 'blogPosts' || data?.entries?.[0]?.sectionHandle === 'blogPosts'
      const isGuestbook = data?.entry?.sectionHandle === 'guestbook' || data?.entries?.[0]?.sectionHandle === 'guestbook'
      
      let title = pageTitle
      if ((isBlog || isGuestbook) && parseInt(String(resolvedSearchParams?.page || '1')) > 1) {
        title = `${pageTitle} (Page ${parseInt(String(resolvedSearchParams?.page || '1'))})`
      }
      
      const metadata = {
        title: `${title} | ${process.env.SITE_NAME}`
      }

      return (
        <>
          <title>{metadata.title}</title>
          <PagePreviewWrapper 
            data={data}
            transformedData={transformedData}
            query={query}
            variables={variables}
            CustomContent={CustomContent}
          />
        </>
      )
    } catch (error) {
      console.error('Page Error:', error)
      notFound()
    }
  }
} 
