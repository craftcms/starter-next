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
      fetchGraphQL(query, variables, previewToken)
        .then(newData => setData(newData))
    }
  }, [previewToken, previewTimestamp, query, variables])

  const pageData = data?.blogPostsEntries?.[0] || data?.entry || data?.entries?.[0] || {}
  return <Content pageData={pageData} />
} 