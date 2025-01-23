'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function Pagination({ currentPage, totalPages, pageTitle }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof document === 'undefined') return

    const baseTitle = pageTitle || document.title.split('|')[0].trim()
    const pageSuffix = currentPage > 1 ? ` (Page ${currentPage})` : ''
    document.title = `${baseTitle}${pageSuffix} | ${process.env.SITE_NAME}`
  }, [currentPage, pageTitle])

  const updateCurrentPage = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`?${params.toString()}`)
  }

  const prevPageNum = Math.max(1, currentPage - 1)
  const nextPageNum = Math.min(totalPages, currentPage + 1)

  return (
    <nav className="pt-6 text-sm" role="navigation" aria-label="Entry pagination">
      <ul className="flex justify-between">
        <li>
          {currentPage > 1 ? (
            <button 
              onClick={() => updateCurrentPage(prevPageNum)} 
              aria-label={`Previous Page (${prevPageNum} of ${totalPages})`}
              className="text-red-600 cursor-pointer font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              ← Previous page ({prevPageNum} of {totalPages})
            </button>
          ) : <span />}
        </li>
        <li>
          {currentPage < totalPages ? (
            <button 
              onClick={() => updateCurrentPage(nextPageNum)} 
              aria-label={`Next Page (${nextPageNum} of ${totalPages})`}
              className="text-red-600 cursor-pointer font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              Next page ({nextPageNum} of {totalPages}) →
            </button>
          ) : <span />}
        </li>
      </ul>
    </nav>
  )
}
