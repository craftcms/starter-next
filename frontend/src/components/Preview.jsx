'use client'

import { useEffect, useState } from 'react'
import { fetchGraphQL } from '../lib/graphql'
import { Content } from './Content'

export function Preview({ 
  initialData, 
  query, 
  variables = {}, 
  CustomContent,
  transform
}) {
  const [data, setData] = useState(initialData)
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get('token')
    const isPreview = searchParams.has('x-craft-live-preview')

    if (isPreview && token) {
      console.log('Fetching preview data')
      fetchGraphQL(query, variables, {
        preview: true,
        token
      }).then(newData => {
        if (newData) {
          const transformedData = transform ? transform(newData, true) : newData
          console.log('Preview data transformed:', transformedData)

          const finalData = 
            transformedData.blogPostsEntries?.[0] || 
            transformedData.entries?.[0] || 
            transformedData.entry || 
            transformedData
          setData(finalData)
        }
      })
    }
  }, [query, variables, transform])

  const ContentComponent = CustomContent || Content
  return <ContentComponent pageData={data} />
} 
