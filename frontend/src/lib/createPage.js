import { Preview } from '../components/Preview'
import { Content } from '../components/Content'
import { fetchGraphQL } from './graphql'

const DEFAULT_PAGE_SIZE = 4

/**
 * Creates a Next.js page component with GraphQL data fetching
 * @param {string} query - GraphQL query
 * @param {Function} transform - Data transform function
 * @param {React.Component} CustomContent - Optional custom content component
 */
export function createPage(query, transform, CustomContent) {
  return async function Page({ params, searchParams }) {
    try {
      // Handle URI construction
      const uri = Array.isArray(params?.slug) 
        ? params.slug.join('/') 
        : params?.slug || ''
      
      // Handle pagination
      const resolvedParams = await searchParams
      const currentPage = parseInt(String(resolvedParams?.page || '1'))
      const offset = (currentPage - 1) * DEFAULT_PAGE_SIZE

      // Fetch data
      const variables = {
        uri,
        limit: DEFAULT_PAGE_SIZE,
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

      // Transform data
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

      // Render page
      const ContentComponent = CustomContent || Content
      return (
        <ContentComponent 
          pageData={transformedData} 
          initialData={data} 
          searchParams={resolvedParams}
        />
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