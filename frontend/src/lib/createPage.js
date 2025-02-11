import { notFound } from 'next/navigation'
import { fetchGraphQL } from './graphql'
import { Preview } from '../components/Preview'
import { Content } from '../components/Content'

export function createPage(query, transform, CustomContent, options = {}) {
  return async function Page({ params, searchParams }) {

    const isPreview = Boolean(
      searchParams?.token && 
      searchParams?.['x-craft-live-preview']
    )

    try {
      const variables = typeof options.variables === 'function' 
        ? options.variables({ params }) 
        : options.variables || {}

      const data = await fetchGraphQL(query, variables, {
        preview: isPreview,
        token: searchParams?.token
      })

      if (!data) {
        console.error('No data returned from GraphQL')
        return notFound()
      }

      const transformedData = transform ? transform(data) : data

      if (isPreview) {
        return (
          <Preview 
            initialData={data}
            transformedData={transformedData}
            query={query}
            variables={variables}
            CustomContent={CustomContent}
          />
        )
      }

      if (!transformedData) {
        console.error('Transform returned null')
        return notFound()
      }

      const ContentComponent = CustomContent || Content
      return <ContentComponent pageData={transformedData} />

    } catch (error) {
      console.error('Page Error:', error)
      if (isPreview) {
        return (
          <Preview 
            initialData={{}}
            transformedData={null}
            query={query}
            variables={variables}
            CustomContent={CustomContent}
          />
        )
      }
      return notFound()
    }
  }
} 
