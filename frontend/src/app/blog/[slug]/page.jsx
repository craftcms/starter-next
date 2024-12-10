import { createPage } from '../../../lib/createPage'
import { BLOG_POSTS_QUERY } from '../../../queries/blogPosts'

const transform = (data) => {
  if (!data?.blogPostsEntries?.[0]) {
    throw new Error('Page not found')
  }
  
  const post = data.blogPostsEntries[0]
  return {
    ...post,
    title: post.title || '',
    pageSubheading: post.pageSubheading || '',
    pageContent: post.pageContent || '',
    image: post.image || [],
    authorName: post.authorName,
    postDate: post.postDate,
    category: post.category,
    next: post.next,
    prev: post.prev
  }
}

export default createPage(BLOG_POSTS_QUERY, transform)
