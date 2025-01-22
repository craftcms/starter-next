import { notFound } from 'next/navigation'
import { Preview } from '../components/Preview'
import { Content } from '../components/Content'
import { fetchGraphQL } from './graphql'

const ENTRIES_PER_PAGE = 4

export function createPage(query, transform, CustomContent) {
  return async function Page({ params, searchParams }) {
    try {
      const resolvedParams = await params
      const resolvedSearchParams = await searchParams
      
      const { slug } = resolvedParams
      const uri = Array.isArray(slug) ? slug.join('/') : slug || ''
      const currentPage = parseInt(String(resolvedSearchParams?.page || '1'))
      const offset = (currentPage - 1) * ENTRIES_PER_PAGE

      // Handle preview mode
      const isPreview = Boolean(
        resolvedSearchParams?.token && 
        resolvedSearchParams?.['x-craft-live-preview']
      )

      const options = {
        preview: isPreview,
        revalidate: isPreview ? 0 : 3600
      }

      const data = await fetchGraphQL(query, {
        uri,
        limit: ENTRIES_PER_PAGE,
        offset
      }, options)

      // Handle missing data
      if (!data) {
        notFound()
      }

      // Handle preview mode
      if (isPreview) {
        return (
          <Preview 
            initialData={data} 
            query={query}
            variables={{ uri, limit: ENTRIES_PER_PAGE, offset }}
          />
        )
      }

      let transformedData
      try {
        transformedData = transform ? transform(data) : data?.entry || data?.entries?.[0]
        
        if (!transformedData) {
          notFound()
        }
      } catch (error) {
        console.error('Data Transform Error:', error)
        notFound()
      }

      const pageTitle = transformedData.title
      const isBlog = transformedData.sectionHandle === 'blogPosts'
      
      const metadata = {
        title: isBlog
          ? `${pageTitle} - Blog | ${process.env.SITE_NAME}`
          : `${pageTitle} | ${process.env.SITE_NAME}`
      }

      const ContentComponent = CustomContent || Content
      return (
        <>
          <title>{metadata.title}</title>
          <ContentComponent 
            pageData={transformedData} 
            initialData={data} 
            searchParams={resolvedSearchParams}
          />
        </>
      )
    } catch (error) {
      console.error('Page Error:', error)
      notFound()
    }
  }
} 
