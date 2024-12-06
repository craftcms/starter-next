'use client'

import { useSearchParams } from 'next/navigation'

export function usePreview() {
  const searchParams = useSearchParams()
  
  const isPreview = () => {
    return Boolean(searchParams?.get('x-craft-live-preview'))
  }

  const getPreviewToken = () => {
    return searchParams?.get('token') || null
  }

  const getPreviewTimestamp = () => {
    return Date.now()
  }

  const refreshPreview = () => {
    window.location.reload()
  }

  return {
    isPreview,
    previewToken: getPreviewToken(),
    previewTimestamp: getPreviewTimestamp(),
    refreshPreview
  }
}
