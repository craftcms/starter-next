'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export function usePagination(totalItems, itemsPerPage = 4) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const currentPage = parseInt(searchParams.get('page')) || 1
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
      const params = new URLSearchParams(searchParams)
      params.set('page', newPage.toString())
      router.push(`?${params.toString()}`)
    }
  }

  return {
    currentPage,
    totalPages,
    handlePageChange
  }
} 