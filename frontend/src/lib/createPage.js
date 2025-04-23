import { fetchGraphQL } from './graphql'
import { Preview } from '../components/Preview'
import { Suspense } from 'react'

function extractFirstEntry(data) {
  if (!data) return {}
  
  const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]))
  
  if (arrayKey && data[arrayKey]?.[0]) {
    return data[arrayKey][0]
  }
  
  if (data.entry) {
    return data.entry
  }
  
  return data
}

export function createPage(query, transform, CustomContent, options = {}) {
  return async function Page({ params, searchParams }) {
    try {
      const resolvedParams = await params
      const resolvedSearchParams = await searchParams
      
      const { slug } = resolvedParams
      const uri = Array.isArray(slug) ? slug.join('/') : slug || ''
      
      const varsFromOptions = options.variables
        ? (typeof options.variables === 'function'
            ? options.variables({ params: resolvedParams, searchParams: resolvedSearchParams })
            : options.variables)
        : {}
      const variables = { uri, ...varsFromOptions }

      const isPreview = Boolean(
        resolvedSearchParams?.token && 
        resolvedSearchParams['x-craft-live-preview']
      )

      const data = await fetchGraphQL(query, variables, {
        preview: isPreview,
        cache: isPreview ? 'no-store' : 'force-cache',
        next: { revalidate: isPreview ? 0 : 3600 }
      })

      const transformedData = transform ? transform(data) : extractFirstEntry(data)

      return (
        <Suspense fallback={<div className="py-4 text-center">Loading preview...</div>}>
          <Preview 
            initialData={transformedData || {}}
            query={query}
            variables={variables}
            CustomContent={CustomContent}
          />
        </Suspense>
      )
    } catch (error) {
      console.error('Page Error:', error)
      return null
    }
  }
} 
