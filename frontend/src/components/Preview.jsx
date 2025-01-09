'use client'

import { useEffect, useState } from 'react'
import { usePreview } from '../lib/preview'
import { fetchGraphQL } from '../lib/graphql'
import { Content } from './Content'

export function Preview({ initialData, query, variables = {} }) {
  const { previewToken, previewTimestamp } = usePreview()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (previewToken) {
      // Re-request the preview data:
      fetchGraphQL(query, variables, {
        preview: true,
        token: previewToken,
      })
        .then(newData => setData(newData))
    }
  }, [previewToken, query, variables])

  const pageData = data?.blogPostsEntries?.[0] || data?.entry || data?.entries?.[0] || {}
  return <Content pageData={pageData} />
} 
