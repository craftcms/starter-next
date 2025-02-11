'use client'

import { useEffect, useState } from 'react'
import { usePreview } from '../lib/preview'
import { fetchGraphQL } from '../lib/graphql'
import { Content } from './Content'

export function Preview({ initialData, query, variables = {}, CustomContent }) {
  const { previewToken } = usePreview()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (previewToken) {
      fetchGraphQL(query, variables, {
        preview: true,
        token: previewToken,
      }).then(newData => {
        console.log('Preview data updated:', newData)
        setData(newData)
      })
    }
  }, [previewToken, query, variables])

  const pageData = data?.blogPostsEntries?.[0] || data?.entry || data?.entries?.[0] || {
    title: 'New Entry',
    pageSubheading: '',
    pageContent: '',
    image: [],
    authorName: '',
    postDate: '',
    category: null,
    next: null,
    prev: null
  }

  const ContentComponent = CustomContent || Content
  return <ContentComponent pageData={pageData} initialData={data} />
} 
