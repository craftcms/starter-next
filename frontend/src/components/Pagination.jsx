'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function Pagination({ currentPage, totalPages }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Debug the values
  console.log('Pagination Component Values:', { 
    currentPage, 
    totalPages,
    isCurrentPageOne: currentPage === 1,
    showPrev: currentPage > 1,
    showNext: currentPage < totalPages,
    searchParams: Object.fromEntries(searchParams.entries())
  })

  const updateCurrentPage = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    const newUrl = `?${params.toString()}`
    console.log('Updating page:', { newPage, newUrl })
    router.push(newUrl)
  }

  // Calculate page numbers for display
  const prevPageNum = Math.max(1, currentPage - 1)
  const nextPageNum = Math.min(totalPages, currentPage + 1)

  return (
    <nav className="pt-6 text-sm" role="navigation" aria-label="Entry pagination">
      <ul className="flex justify-between">
        <li>
          {currentPage > 1 ? (
            <button 
              onClick={() => updateCurrentPage(prevPageNum)} 
              aria-label="Previous Page"
              className="text-red-600 cursor-pointer font-bold hover:underline focus:underline"
            >
              ← Previous page ({prevPageNum} of {totalPages})
            </button>
          ) : <span />}
        </li>
        <li>
          {currentPage < totalPages ? (
            <button 
              onClick={() => updateCurrentPage(nextPageNum)} 
              aria-label="Next Page"
              className="text-red-600 cursor-pointer font-bold hover:underline focus:underline"
            >
              Next page ({nextPageNum} of {totalPages}) →
            </button>
          ) : <span />}
        </li>
      </ul>
    </nav>
  )
}
