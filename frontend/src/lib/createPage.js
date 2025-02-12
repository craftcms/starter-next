import { notFound } from 'next/navigation'
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

      const data = await fetchGraphQL(query, variables, {
        preview: Boolean(
          resolvedSearchParams?.token && 
          resolvedSearchParams['x-craft-live-preview']
        )
      })

      const transformedData = transform ? transform(data) : data?.entry || data?.entries?.[0]
      
      if (!transformedData) notFound()

      return (
        <Preview 
          initialData={transformedData}
          query={query}
          variables={variables}
          CustomContent={CustomContent}
        />
      )
    } catch (error) {
      console.error('Page Error:', error)
      notFound()
    }
  }
} 
