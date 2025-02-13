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
  console.log('Preview mounted with initialData:', initialData)
  const [data, setData] = useState(initialData)
  
  useEffect(() => {
    console.log('Preview effect running')
    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get('token')
    const isPreview = searchParams.has('x-craft-live-preview')
    
    console.log('Preview params:', { token, isPreview })

    if (isPreview && token) {
      console.log('Fetching preview data')
      fetchGraphQL(query, variables, {
        preview: true,
        token
      }).then(newData => {
        if (newData) {
          // First transform the raw GraphQL response
          const transformedData = transform ? transform(newData, true) : newData
          console.log('Preview data transformed:', transformedData)
          
          // Then extract the first entry if it's an array
          const finalData = transformedData.blogPostsEntries?.[0] || transformedData.entry || transformedData
          console.log('Preview data final:', finalData)
          setData(finalData)
        }
      })
    }
  }, [query, variables, transform])

  console.log('Preview rendering with data:', data)
  const ContentComponent = CustomContent || Content
  return <ContentComponent pageData={data} />
} 
