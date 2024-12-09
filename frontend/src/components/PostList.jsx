'use client'

import { useEffect, useState } from 'react'
import { fetchGraphQL } from '../lib/graphql'
import { Pagination } from './Pagination'
import { GUESTBOOK_POSTS_QUERY } from '../queries/guestbookPosts'

export function PostList({ previewToken, onRefresh }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  const loadPosts = async (page = currentPage) => {
    setLoading(true)
    try {
      const result = await fetchGraphQL(
        GUESTBOOK_POSTS_QUERY,
        {
          limit: perPage,
          offset: (page - 1) * perPage
        },
        { previewToken }
      )
      
      setData({
        posts: result?.guestbookPostsEntries || [],
        total: result?.entryCount || 0
      })
    } catch (err) {
      console.error('GraphQL Error:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  // Load posts when page changes
  useEffect(() => {
    loadPosts()
  }, [currentPage])

  // Allow parent to trigger refresh
  useEffect(() => {
    if (onRefresh) {
      onRefresh(loadPosts)
    }
  }, [onRefresh])

  const totalPages = Math.ceil((data?.total || 0) / perPage)

  if (loading) return <div className="py-4">Loading...</div>
  if (error) return <div className="py-4 text-red-600">{error.message}</div>

  return (
    <div>
      {data?.posts?.length > 0 ? (
        <>
          <ol className="mb-2 divide-y divide-slate-300">
            {data.posts.map(post => (
              <li key={post.id}>
                <article className="text-xl py-6">
                  <div dangerouslySetInnerHTML={{ __html: post.textBlock }} />
                  <p className="text-sm mt-1">
                    <time dateTime={post.postDate}>{post.postDate}</time>
                  </p>
                </article>
              </li>
            ))}
          </ol>
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </>
      ) : (
        <p className="text-2xl">No entries yet. Create one using the form.</p>
      )}
    </div>
  )
}
