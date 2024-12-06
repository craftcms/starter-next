import { Preview } from '../components/Preview'
import { Content } from '../components/Content'
import { fetchGraphQL } from './graphql'

export function createPage(query, transform) {
  return async function Page({ params, searchParams }) {
    const uri = Array.isArray(params?.slug) 
      ? params.slug.join('/') 
      : params?.slug || ''
    
    const data = await fetchGraphQL(query, { uri })
    
    const isPreview = Boolean(
      searchParams['x-craft-live-preview'] && 
      searchParams['token']
    )

    const transformedData = transform ? transform(data) : data?.entries?.[0] || {}

    if (isPreview) {
      return (
        <Preview 
          initialData={data} 
          query={query}
          variables={{ uri }}
        />
      )
    }

    return <Content pageData={transformedData} />
  }
} 