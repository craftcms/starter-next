import { fetchGraphQL } from '../../lib/graphql'
import { BLOG_QUERY } from '../../queries/blog'
import BlogList from '../../components/BlogList'

const ITEMS_PER_PAGE = 4

async function getData(page = 1) {
  const data = await fetchGraphQL(BLOG_QUERY, {
    limit: ITEMS_PER_PAGE,
    offset: (page - 1) * ITEMS_PER_PAGE
  })

  if (!data?.blogEntries?.[0]) {
    throw new Error('No blog entries found')
  }

  return {
    ...data,
    totalPages: Math.ceil((data?.entryCount || 0) / ITEMS_PER_PAGE)
  }
}

export const dynamic = 'force-dynamic'

export default async function BlogPage({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || '1', 10)

  const data = await getData(currentPage)

  return <BlogList 
    data={data}
    currentPage={currentPage}
    totalPages={data.totalPages}
    baseUrl="/blog"
  />
} 