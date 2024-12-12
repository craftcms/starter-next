'use client'

import { useSearchParams } from 'next/navigation'

export function usePreview() {
  const searchParams = useSearchParams()
  const previewToken = ref(searchParams?.get('token') || null)
  const previewTimestamp = ref(Date.now())
  
  const isPreview = () => {
    return Boolean(searchParams?.get('x-craft-live-preview'))
  }

  const refreshPreview = () => {
    previewTimestamp.value = Date.now()
  }

  return {
    isPreview,
    previewToken,
    previewTimestamp,
    refreshPreview
  }
}
