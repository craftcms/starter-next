import { Preview } from '../components/Preview'
import { Content } from '../components/Content'
import { fetchGraphQL } from './graphql'

export function createPage(query, transform, CustomContent) {
  return async function Page({ params, searchParams }) {
    const uri = Array.isArray(params?.slug) 
      ? params.slug.join('/') 
      : params?.slug || ''
    
    const page = Number(searchParams.page) || 1
    const perPage = Number(searchParams.perPage) || 10
    
    const data = await fetchGraphQL(query, { 
      uri,
      limit: perPage,
      offset: (page - 1) * perPage
    })
    
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
          variables={{ uri, limit: perPage, offset: (page - 1) * perPage }}
        />
      )
    }

    const ContentComponent = CustomContent || Content
    return <ContentComponent pageData={transformedData} />
  }
} 