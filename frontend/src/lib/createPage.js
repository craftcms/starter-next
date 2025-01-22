import { notFound } from 'next/navigation'
import { Preview } from '../components/Preview'
import { Content } from '../components/Content'
import { fetchGraphQL } from './graphql'

const ENTRIES_PER_PAGE = 4

export function createPage(query, transform, CustomContent, options = {}) {
  return async function Page({ params, searchParams }) {
    try {
      const resolvedParams = await params
      const resolvedSearchParams = await searchParams
      
      const { slug } = resolvedParams
      const uri = Array.isArray(slug) ? slug.join('/') : slug || ''
      
      // Merge default variables with options
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

      // Handle missing data
      if (!data) {
        notFound()
      }

      // Handle preview mode
      if (Boolean(
        resolvedSearchParams?.token && 
        resolvedSearchParams?.['x-craft-live-preview']
      )) {
        return (
          <Preview 
            initialData={data} 
            query={query}
            variables={variables}
          />
        )
      }

      let transformedData
      try {
        transformedData = transform ? transform(data) : data?.entry || data?.entries?.[0]
        
        if (!transformedData) {
          notFound()
        }
      } catch (error) {
        console.error('Data Transform Error:', error)
        notFound()
      }

      const pageTitle = transformedData.title
      const isBlog = transformedData.sectionHandle === 'blogPosts'
      const isGuestbook = transformedData.sectionHandle === 'guestbook'
      
      // Create page title with pagination info
      let title = pageTitle
      if ((isBlog || isGuestbook) && parseInt(String(resolvedSearchParams?.page || '1')) > 1) {
        title = `${pageTitle} (Page ${parseInt(String(resolvedSearchParams?.page || '1'))})`
      }
      
      const metadata = {
        title: `${title} | ${process.env.SITE_NAME}`
      }

      const ContentComponent = CustomContent || Content
      return (
        <>
          <title>{metadata.title}</title>
          <ContentComponent 
            pageData={transformedData} 
            initialData={data} 
            searchParams={resolvedSearchParams}
          />
        </>
      )
    } catch (error) {
      console.error('Page Error:', error)
      notFound()
    }
  }
} 
