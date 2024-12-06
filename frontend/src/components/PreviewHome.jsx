'use client'

import { useEffect, useState } from 'react'
import { usePreview } from '../lib/preview'
import { fetchGraphQL } from '../lib/graphql'
import { HOME_QUERY } from '../queries/home'
import { HomeContent } from './HomeContent'

export function PreviewHome({ initialData }) {
  const { previewToken, previewTimestamp } = usePreview()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (previewToken) {
      fetchGraphQL(HOME_QUERY, {}, previewToken)
        .then(newData => setData(newData))
    }
  }, [previewToken, previewTimestamp])

  const pageData = data?.entries?.[0] || {}
  return <HomeContent pageData={pageData} />
} 