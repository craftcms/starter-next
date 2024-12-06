'use client'

import { useEffect, useState } from 'react'
import { usePreview } from '../lib/preview'
import { fetchGraphQL } from '../lib/graphql'
import { Content } from './Content'

export function Preview({ initialData, query, transform, variables = {} }) {
  const { previewToken, previewTimestamp } = usePreview()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (previewToken) {
      fetchGraphQL(query, variables, previewToken)
        .then(newData => setData(newData))
    }
  }, [previewToken, previewTimestamp, query, variables])

  const pageData = transform ? transform(data) : data?.entries?.[0] || {}
  return <Content pageData={pageData} />
} 