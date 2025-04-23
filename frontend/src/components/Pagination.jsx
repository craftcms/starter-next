'use client'

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  pageTitle,
  siteName 
}) {
  const prevPageNum = Math.max(1, currentPage - 1)
  const nextPageNum = Math.min(totalPages, currentPage + 1)

  return (
    <nav className="pt-6 text-sm" role="navigation" aria-label="Entry pagination">
      <ul className="flex justify-between">
        <li>
          {currentPage > 1 ? (
            <button 
              onClick={() => onPageChange(prevPageNum)} 
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
              onClick={() => onPageChange(nextPageNum)} 
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
