import { Preview } from '../components/Preview'
import { Content } from '../components/Content'
import { fetchGraphQL } from './graphql'

export function createPage(query, transform, CustomContent) {
  return async function Page({ params, searchParams }) {
    const uri = Array.isArray(params?.slug) 
      ? params.slug.join('/') 
      : params?.slug || ''
    
    const resolvedParams = await searchParams
    
    const currentPage = parseInt(String(resolvedParams?.page || '1'))
    const perPage = 4
    const offset = (currentPage - 1) * perPage

    const data = await fetchGraphQL(query, { 
      uri,
      limit: perPage,
      offset: offset
    })
    
    const isPreview = Boolean(
      resolvedParams?.token && 
      resolvedParams?.['x-craft-live-preview']
    )

    const transformedData = transform ? transform(data) : data?.entries?.[0] || {}

    if (isPreview) {
      return (
        <Preview 
          initialData={data} 
          query={query}
          variables={{ 
            uri,
            limit: perPage,
            offset: offset
          }}
        />
      )
    }

    const ContentComponent = CustomContent || Content
    return <ContentComponent 
      pageData={transformedData} 
      initialData={data} 
      searchParams={resolvedParams}
    />
  }
} 