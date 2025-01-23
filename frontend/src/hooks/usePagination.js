'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function usePagination(initialItemsPerPage = 4) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page')) || 1
  )
  const [itemsPerPage] = useState(initialItemsPerPage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalItems, setTotalItems] = useState(0)

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const updateCurrentPage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
      const params = new URLSearchParams(searchParams)
      params.set('page', newPage.toString())
      router.push(`?${params.toString()}`)
      setCurrentPage(newPage)
    }
  }

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1
    setCurrentPage(page)
  }, [searchParams])

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    loading,
    setLoading,
    error,
    setError,
    updateCurrentPage,
    setTotalItems
  }
} 