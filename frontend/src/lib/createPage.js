import { notFound } from 'next/navigation'
import { PagePreviewWrapper } from '../components/PagePreviewWrapper'
import { fetchGraphQL } from './graphql'

const ENTRIES_PER_PAGE = 4

export function createPage(query, transform, CustomContent, options = {}) {
  return async function Page({ params, searchParams }) {
    try {
      let variables = {}
      if (typeof options.variables === 'function') {
        variables = options.variables({ params })
      } else {
        variables = options.variables || {}
      }

      const data = await fetchGraphQL(query, variables)
      const transformedData = transform ? transform(data) : data

      return (
        <PagePreviewWrapper 
          data={data}
          transformedData={transformedData}
          query={query}
          variables={variables}
          CustomContent={CustomContent}
        />
      )
    } catch (error) {
      console.error('Page Error:', error)
      return (
        <PagePreviewWrapper 
          data={{}}
          transformedData={null}
          query={query}
          variables={variables}
          CustomContent={CustomContent}
        />
      )
    }
  }
} 
