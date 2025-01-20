import { Preview } from '../components/Preview'
import { Content } from '../components/Content'
import { fetchGraphQL } from './graphql'

const ENTRIES_PER_PAGE = 4

export function createPage(query, transform, CustomContent) {
  return async function Page({ params, searchParams }) {
    try {
      const { slug } = await params;

      // Handle URI construction
      const uri = Array.isArray(slug)
        ? slug.join('/') 
        : slug || ''

      // Handle pagination
      const resolvedParams = await searchParams
      const currentPage = parseInt(String(resolvedParams?.page || '1'))
      const offset = (currentPage - 1) * ENTRIES_PER_PAGE

      // Fetch data
      const variables = {
        uri,
        limit: ENTRIES_PER_PAGE,
        offset
      }

      const data = await fetchGraphQL(query, variables)

      // Handle preview mode
      const isPreview = Boolean(
        resolvedParams?.token && 
        resolvedParams?.['x-craft-live-preview']
      )

      if (isPreview) {
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
      } catch (error) {
        if (error.message === 'Page not found') {
          throw error
        }
        console.error('Data Transform Error:', error)
        throw new Error('Failed to process page data')
      }

      const pageTitle = transformedData.title
      const isBlog = transformedData.sectionHandle === 'blogPosts'
      
      const metadata = {
        title: isBlog
          ? `${pageTitle} - Blog | ${process.env.SITE_NAME}`
          : `${pageTitle} | ${process.env.SITE_NAME}`
      }

      // Render page
      const ContentComponent = CustomContent || Content
      return (
        <>
          <title>{metadata.title}</title>
          <ContentComponent 
            pageData={transformedData} 
            initialData={data} 
            searchParams={resolvedParams}
          />
        </>
      )
    } catch (error) {
      console.error('Page Error:', {
        message: error.message,
        params,
        searchParams
      })

      if (error.message.includes('Page not found')) {
        throw new Error('Page not found')
      }
      
      throw error
    }
  }
} 
