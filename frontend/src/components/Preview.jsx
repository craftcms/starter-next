'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchGraphQL } from '../lib/graphql'
import { Content } from './Content'

export function Preview({ 
  initialData, 
  transformedData,
  query, 
  variables = {}, 
  CustomContent 
}) {
  const searchParams = useSearchParams()
  const [data, setData] = useState(transformedData || initialData)
  
  const token = searchParams?.get('token')
  const craftPreview = searchParams?.get('x-craft-live-preview')
  const isPreview = Boolean(token && craftPreview)

  useEffect(() => {
    if (isPreview) {
      fetchGraphQL(query, variables, {
        preview: true,
        token,
      }).then(newData => {
        console.log('Preview data updated:', newData)
        setData(newData)
      })
    }
  }, [isPreview, token, query, variables])

  const ContentComponent = CustomContent || Content
  return <ContentComponent pageData={data} />
} 
