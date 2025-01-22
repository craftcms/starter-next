import BlogList from '../../components/BlogList'
import { fetchGraphQL } from '../../lib/graphql'
import { BLOG_QUERY } from '../../queries/blog'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = 3600

const ITEMS_PER_PAGE = 4

export default async function BlogPage({ searchParams }) {
  const currentPage = parseInt(searchParams?.page) || 1
  
  try {
    const initialData = await fetchGraphQL(
      BLOG_QUERY,
      {
        limit: ITEMS_PER_PAGE,
        offset: (currentPage - 1) * ITEMS_PER_PAGE
      }
    )
    
    if (!initialData?.blogEntries?.[0]) {
      notFound()
    }

    return <BlogList initialData={initialData} />
  } catch (error) {
    console.error('Blog Error:', error)
    notFound()
  }
}
