'use client'

import { useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Content } from './Content'
import { BlogTeaser } from './Teaser'
import { Pagination } from './Pagination'

export default function BlogList({ data, currentPage, totalPages, baseUrl }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const title = data.blogEntries?.[0]?.title || ''
      document.title = currentPage > 1
        ? `${title} - Page ${currentPage}`
        : title
    }
  }, [currentPage, data.blogEntries])

  if (!data.blogEntries || data.blogEntries.length === 0) {
    return <div className="p-4">No blog section content found.</div>
  }

  const pageData = {
    ...data.blogEntries[0],
    title: data.blogEntries[0].title || '',
    pageSubheading: data.blogEntries[0].pageSubheading || '',
    pageContent: data.blogEntries[0].pageContent || ''
  }

  const handlePageChange = (page) => {
    startTransition(() => {
      const href = `${baseUrl}?page=${page}`
      router.push(href)
    })
  }

  return (
    <>
      <Content pageData={pageData} />
      <section className="container mx-auto mb-6 px-2 divide-y divide-slate-300">
        {isPending ? (
          <div className="py-4 text-center">Loading posts...</div>
        ) : data.blogPostsEntries && data.blogPostsEntries.length > 0 ? (
          <>
            <div className="sm:grid sm:grid-cols-2 sm:gap-6">
              {data.blogPostsEntries.map(post => (
                <BlogTeaser key={post.id} entry={post} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
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