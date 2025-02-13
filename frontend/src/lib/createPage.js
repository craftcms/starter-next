import { fetchGraphQL } from './graphql'
import { Preview } from '../components/Preview'

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

      const isPreview = Boolean(
        resolvedSearchParams?.token && 
        resolvedSearchParams['x-craft-live-preview']
      )

      const data = await fetchGraphQL(query, variables, {
        preview: isPreview
      })

      const transformedData = transform ? transform(data, isPreview) : (
        data?.entry || 
        data?.entries?.[0] || 
        data?.blogPostsEntries?.[0] || 
        data
      )

      return (
        <Preview 
          initialData={transformedData || {}}
          query={query}
          variables={variables}
          CustomContent={CustomContent}
        />
      )
    } catch (error) {
      console.error('Page Error:', error)
      return null
    }
  }
} 
