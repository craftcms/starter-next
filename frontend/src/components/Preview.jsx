'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchGraphQL } from '../lib/graphql'
import { Content } from './Content'

function extractFirstEntry(data) {
  if (!data) return {}
  
  const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]))
  
  if (arrayKey && data[arrayKey]?.[0]) {
    return data[arrayKey][0]
  }
  
  if (data.entry) {
    return data.entry
  }
  
  return data
}

export function Preview({ 
  initialData, 
  query, 
  variables = {}, 
  CustomContent
}) {
  const [data, setData] = useState(initialData)
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const token = searchParams.get('token')
    const isPreview = searchParams.has('x-craft-live-preview')

    if (isPreview && token) {
      fetchGraphQL(query, variables, {
        preview: true,
        token
      }).then(newData => {
        if (newData) {
          const transformedData = extractFirstEntry(newData)
          setData(transformedData)
        }
      })
    }
  }, [query, variables, searchParams])

  const ContentComponent = CustomContent || Content
  return <ContentComponent pageData={data} />
} 
