'use client'

import { usePreview } from '../lib/preview'
import { Preview } from './Preview'
import { Content } from './Content'

export function PagePreviewWrapper({ data, transformedData, query, variables, CustomContent }) {
  const { isPreview } = usePreview()

  if (isPreview()) {
    return (
      <Preview 
        initialData={data} 
        query={query}
        variables={variables}
      />
    )
  }

  if (!transformedData) {
    return null // or some error state
  }

  // If CustomContent is provided, use it, otherwise fall back to Content
  const ContentComponent = CustomContent || Content

  return <ContentComponent pageData={transformedData} initialData={data} />
} 