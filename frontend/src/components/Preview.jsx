'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchGraphQL } from '../lib/graphql'
import { Content } from './Content'

export function Preview({ 
  initialData, 
  query, 
  variables = {}, 
  transform,
  CustomContent 
}) {
  const searchParams = useSearchParams()
  const [data, setData] = useState(initialData)
  
  const token = searchParams?.get('token')
  const craftPreview = searchParams?.get('x-craft-live-preview')
  const isPreviewMode = Boolean(token && craftPreview)

  useEffect(() => {
    if (token && isPreviewMode) {
      fetchGraphQL(query, variables, {
        preview: true,
        token,
        headers: {
          'X-Craft-Preview': '1',
          'X-Craft-Live-Preview': '1',
          'X-Craft-Token': token
        }
      }).then(newData => {
        if (newData) {
          const transformedData = transform ? transform(newData) : newData
          setData(transformedData)
        }
      })
    }
  }, [token, query, variables, transform, isPreviewMode])

  const ContentComponent = CustomContent || Content
  const pageData = data?.entry || data?.entries?.[0] || data
  
  return <ContentComponent pageData={pageData} />
} 
