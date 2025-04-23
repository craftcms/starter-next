import { fetchGraphQL } from '../../lib/graphql'
import { BLOG_QUERY } from '../../queries/blog'
import BlogList from '../../components/blog/BlogList'

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

export async function generateStaticParams() {
  const data = await getData(1)
  const paths = []
  
  for (let page = 1; page <= data.totalPages; page++) {
    paths.push({ page: page.toString() })
  }
  
  return paths
}

export default async function BlogPage({ params }) {
  const currentPage = parseInt(params?.page || '1', 10)
  const data = await getData(currentPage)

  return <BlogList 
    data={data}
    currentPage={currentPage}
    totalPages={data.totalPages}
    baseUrl="/blog"
  />
}

export const revalidate = 3600 