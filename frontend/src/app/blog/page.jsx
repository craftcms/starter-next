import { createPage } from '../../lib/createPage'
import { BLOG_QUERY } from '../../queries/blog'
import { Teaser } from '../../components/Teaser'
import { Pagination } from '../../components/Pagination'

const transform = (data) => {
  if (!data?.blogEntries?.[0]) {
    throw new Error('Blog page not found')
  }
  
  return {
    // Main content from blogEntries
    ...data.blogEntries[0],
    title: data.blogEntries[0].title || '',
    pageSubheading: data.blogEntries[0].pageSubheading || '',
    pageContent: data.blogEntries[0].pageContent || '',
    // Blog posts list
    posts: data.blogPostsEntries || [],
    // Pagination data
    totalEntries: data.entryCount || 0
  }
}

// Custom Content component for blog listing
function BlogContent({ pageData }) {
  const {
    title,
    pageSubheading,
    pageContent,
    posts,
    totalEntries
  } = pageData

  return (
    <div>
      <header className="container mx-auto pt-12 pb-6 px-2 text-2xl">
        <h1 className="font-bold text-4xl sm:text-6xl lg:text-9xl">
          {title}
        </h1>
        {pageSubheading && (
          <p className="mt-4">{pageSubheading}</p>
        )}
      </header>

      <section className="page__content">
        <div 
          className="container mx-auto py-12 px-2 text-balance"
          dangerouslySetInnerHTML={{ __html: pageContent }}
        />
      </section>

      <section className="container mx-auto mb-6 px-2 divide-y divide-slate-300">
       {/* {posts.length > 0 ? (
          <div className="sm:grid sm:grid-cols-2 sm:gap-6">
            {posts.map(entry => (
              <Teaser 
                key={entry.id}
                entry={entry}
                featured={true}
              />
            ))}
          </div>
        ) : (
          <p>No posts yet.</p>
        )}
        
         Add Pagination here */}
      </section>
    </div>
  )
}

// Export the page with custom content component
export default createPage(BLOG_QUERY, transform, BlogContent)
