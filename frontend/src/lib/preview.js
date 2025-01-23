'use client'

import { useSearchParams } from 'next/navigation'

export function usePreview() {
  const searchParams = useSearchParams()

  const isPreview = () => Boolean(searchParams?.get('x-craft-live-preview'))
  const getPreviewToken = () => searchParams?.get('token') || null
  const getPreviewTimestamp = () => Date.now()
  const refreshPreview = () => window.location.reload()

  return {
    isPreview,
    previewToken: getPreviewToken(),
    previewTimestamp: getPreviewTimestamp(),
    refreshPreview
  }
}
