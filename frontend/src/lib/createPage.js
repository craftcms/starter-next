import { Preview } from '../components/Preview'
import { Content } from '../components/Content'
import { fetchGraphQL } from './graphql'

export function createPage(query, transform) {
  return async function Page({ params, searchParams }) {
    const uri = params?.slug ? params.slug.join('/') : ''
    
    const data = await fetchGraphQL(query, { uri })
    
    const isPreview = Boolean(
      searchParams['x-craft-live-preview'] && 
      searchParams['token']
    )

    if (isPreview) {
      return (
        <Preview 
          initialData={data} 
          query={query}
          transform={transform}
          variables={{ uri }}
        />
      )
    }

    const pageData = transform ? transform(data) : data?.entries?.[0] || {}
    return <Content pageData={pageData} />
  }
} 