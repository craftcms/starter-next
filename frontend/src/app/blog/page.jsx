import { createPage } from '../../lib/createPage'
import { BLOG_QUERY } from '../../queries/blog'
import { Content } from '../../components/Content'
import { Teaser } from '../../components/Teaser'
import { Pagination } from '../../components/Pagination'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const transform = (data) => {
  if (!data?.blogEntries?.[0]) {
    throw new Error('Blog page not found')
  }
  
  return {
    ...data.blogEntries[0],
    title: data.blogEntries[0].title || '',
    pageSubheading: data.blogEntries[0].pageSubheading || '',
    pageContent: data.blogEntries[0].pageContent || '',
    posts: data.blogPostsEntries || [],
    totalEntries: data.entryCount || 0
  }
}

function BlogPage({ pageData, initialData, searchParams }) {
  const currentPage = parseInt(searchParams?.page) || 1
  const perPage = 4
  const offset = (currentPage - 1) * perPage
  const totalPages = Math.ceil(pageData.totalEntries / perPage)

  console.log('Blog Page:', { 
    currentPage, 
    totalPages, 
    totalEntries: pageData.totalEntries,
    postsCount: pageData.posts.length,
    offset,
    perPage
  })

  return (
    <>
      <Content pageData={pageData} />
      
      <section className="container mx-auto mb-6 px-2 divide-y divide-slate-300">
        {pageData.posts.length > 0 ? (
          <>
            <div className="sm:grid sm:grid-cols-2 sm:gap-6">
              {pageData.posts.map(entry => (
                <Teaser 
                  key={entry.id}
                  entry={entry}
                  featured={true}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
              />
            )}
          </>
        ) : (
          <p>No posts yet.</p>
        )}
      </section>
    </>
  )
}

export default function Page(props) {
  return createPage(BLOG_QUERY, transform, BlogPage)(props)
}
