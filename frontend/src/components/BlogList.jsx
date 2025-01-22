'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchGraphQL } from '../lib/graphql'
import { BLOG_QUERY } from '../queries/blog'
import { Content } from './Content'
import { Teaser } from './Teaser'
import { Pagination } from './Pagination'
import { useSearchParams, useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'

const ITEMS_PER_PAGE = 4

export default function BlogList({ initialData }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(initialData)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const currentPage = parseInt(searchParams.get('page')) || 1
  
  const loadPosts = useCallback(async (page = currentPage) => {
    setLoading(true)
    try {
      const result = await fetchGraphQL(
        BLOG_QUERY,
        {
          limit: ITEMS_PER_PAGE,
          offset: (page - 1) * ITEMS_PER_PAGE
        }
      )
      
      if (!result?.blogEntries?.[0]) {
        notFound()
      }

      setData(result)
    } catch (err) {
      console.error('GraphQL Error:', err)
      setError(err instanceof Error ? err : new Error('Failed to load posts'))
    } finally {
      setLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    loadPosts(currentPage)
  }, [currentPage, loadPosts])

  useEffect(() => {
    if (typeof document !== 'undefined' && data?.blogEntries?.[0]) {
      const baseTitle = data.blogEntries[0].title
      const pageSuffix = currentPage > 1 ? ` (Page ${currentPage})` : ''
      const siteName = process.env.SITE_NAME
      document.title = `${baseTitle}${pageSuffix} | ${siteName}`
    }
  }, [currentPage, data])

  const totalPages = Math.ceil((data?.entryCount || 0) / ITEMS_PER_PAGE)

  if (loading) return <div className="py-4">Loading...</div>
  if (error) return (
    <div className="py-4 text-red-600">
      Error loading posts: {error.message}
    </div>
  )

  const pageData = {
    ...data.blogEntries[0],
    title: data.blogEntries[0].title || '',
    pageSubheading: data.blogEntries[0].pageSubheading || '',
    pageContent: data.blogEntries[0].pageContent || '',
  }

  return (
    <>
      <Content pageData={pageData} />
      
      <section className="container mx-auto mb-6 px-2 divide-y divide-slate-300">
        {data.blogPostsEntries?.length > 0 ? (
          <>
            <div className="sm:grid sm:grid-cols-2 sm:gap-6">
              {data.blogPostsEntries.map(entry => (
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
                pageTitle={pageData.title}
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