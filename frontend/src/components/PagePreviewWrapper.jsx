'use client'

import { usePreview } from '../lib/preview'
import { Preview } from './Preview'
import { Content } from './Content'

export function PagePreviewWrapper({ data, transformedData, query, variables, CustomContent }) {
  const { isPreview } = usePreview()
  const isPreviewMode = isPreview()

  console.log('PagePreviewWrapper:', {
    isPreviewMode,
    hasData: Boolean(data),
    hasTransformedData: Boolean(transformedData)
  })

  if (isPreviewMode) {
    return (
      <Preview 
        initialData={data} 
        query={query}
        variables={variables}
        CustomContent={CustomContent}
      />
    )
  }

  // In normal mode, require transformed data
  if (!transformedData) return null

  const ContentComponent = CustomContent || Content
  return <ContentComponent pageData={transformedData} initialData={data} />
} 