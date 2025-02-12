import { createPage } from '../../../lib/createPage'
import { BLOG_POSTS_QUERY } from '../../../queries/blogPosts'

export const dynamic = 'force-static'
export const revalidate = 3600

const transform = (data) => {
  if (!data?.blogPostsEntries?.[0]) return null
  
  const post = data.blogPostsEntries[0]
  return {
    title: post.title || '',
    pageSubheading: post.pageSubheading || '',
    pageContent: post.pageContent || '',
    image: post.image ? [post.image] : [],
    postDate: post.postDate || '',
  }
}

export default createPage(BLOG_POSTS_QUERY, transform, null, {
  variables: ({ params }) => ({
    slug: [params?.slug].filter(Boolean)
  })
})
