import { createPage } from '../../../lib/createPage'
import { BLOG_POSTS_QUERY } from '../../../queries/blogPosts'

export const dynamic = 'force-static'
export const revalidate = 3600

const transform = (data, isPreview = false) => {
  const entry = data?.entry || data?.blogPostsEntries?.[0] || {}
  
  return {
    title: entry.title || '',
    pageSubheading: entry.pageSubheading || '',
    pageContent: entry.pageContent || '',
    authorName: entry.authorName || '',
    authorId: entry.authorId || '',
    sectionHandle: entry.sectionHandle || '',
    postDate: entry.postDate || '',
    image: entry.image ? [entry.image] : undefined,
    next: entry.next || null,
    prev: entry.prev || null,
    category: entry.category || null,
    ...entry
  }
}

export default createPage(BLOG_POSTS_QUERY, transform, null, {
  variables: ({ params }) => ({
    slug: [params?.slug].filter(Boolean)
  })
})
