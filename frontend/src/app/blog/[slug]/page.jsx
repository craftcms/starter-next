import { notFound } from 'next/navigation'
import { createPage } from '../../../lib/createPage'
import { BLOG_POSTS_QUERY } from '../../../queries/blogPosts'

export const dynamic = 'force-static'
export const revalidate = 3600

const transform = (data) => {
  if (!data?.blogPostsEntries?.[0]) {
    return notFound()
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
