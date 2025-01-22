'use client'

import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react'
import { fetchGraphQL } from '../lib/graphql'
import { GUESTBOOK_POSTS_QUERY } from '../queries/guestbookPosts'
import { Pagination } from './Pagination'
import { useSearchParams, useRouter } from 'next/navigation'

export const PostList = forwardRef(function PostList({ onRefresh }, ref) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const currentPage = parseInt(searchParams.get('page')) || 1
  const perPage = 4

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const baseTitle = 'Guestbook'
      const pageSuffix = currentPage > 1 ? ` (Page ${currentPage})` : ''
      const siteName = process.env.SITE_NAME
      document.title = `${baseTitle}${pageSuffix} | ${siteName}`
    }
  }, [currentPage])

  const loadPosts = useCallback(async (page = currentPage) => {
    setLoading(true)
    try {
      const result = await fetchGraphQL(
        GUESTBOOK_POSTS_QUERY,
        {
          limit: perPage,
          offset: (page - 1) * perPage
        }
      )
      
      if (!result) {
        throw new Error('No data returned from GraphQL')
      }

      setData({
        posts: result?.guestbookPostsEntries || [],
        total: result?.entryCount || 0
      })
      
      if (onRefresh) {
        onRefresh()
      }
    } catch (err) {
      console.error('GraphQL Error:', err)
      setError(err instanceof Error ? err : new Error('Failed to load posts'))
    } finally {
      setLoading(false)
    }
  }, [currentPage, onRefresh, perPage])

  // Expose refresh method to parent
  useImperativeHandle(ref, () => ({
    refresh: () => {
      router.push('/guestbook?page=1')
      loadPosts(1)
    }
  }), [router, loadPosts])

  useEffect(() => {
    loadPosts(currentPage)
  }, [currentPage, loadPosts])

  const totalPages = Math.ceil((data?.total || 0) / perPage)

  const handlePageChange = (newPage) => {
    router.push(`/guestbook?page=${newPage}`)
  }

  if (loading) return <div className="py-4">Loading...</div>
  if (error) return (
    <div className="py-4 text-red-600">
      Error loading posts: {error.message}
    </div>
  )

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
              pageTitle="Guestbook"
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <p className="text-2xl">No entries yet. Create one using the form.</p>
      )}
    </div>
  )
})
