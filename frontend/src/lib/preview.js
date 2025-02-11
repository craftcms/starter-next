'use client'

import { useSearchParams } from 'next/navigation'

export function usePreview() {
  const searchParams = useSearchParams()

  const isPreview = () => {
    const token = searchParams?.get('token')
    const craftPreview = searchParams?.get('x-craft-live-preview')
    
    console.log('Preview Detection:', {
      token,
      craftPreview,
      allParams: Object.fromEntries(searchParams?.entries() || [])
    })
    
    return Boolean(token && craftPreview)
  }

  const getPreviewToken = () => searchParams?.get('token')

  return {
    isPreview,
    previewToken: getPreviewToken(),
    previewTimestamp: Date.now(),
    refreshPreview: () => window.location.reload()
  }
}
