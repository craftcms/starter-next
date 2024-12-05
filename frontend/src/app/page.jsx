'use client'

import { useEffect, useState } from 'react'
import { HOME_QUERY } from '../queries/home'
import { fetchGraphQL } from '../lib/graphql'
import { usePreview } from '../lib/preview'

// Client-side preview component
function PreviewHome({ initialData }) {
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

// Reusable content component
function HomeContent({ pageData }) {
  return (
    <div>
      <header className="container mx-auto pt-12 pb-6 px-2 text-2xl">
        <h1 className="font-bold text-4xl sm:text-6xl lg:text-9xl">
          {pageData.title}
        </h1>
        {pageData.pageSubheading && (
          <p className="mt-4">
            {pageData.pageSubheading}
          </p>
        )}
      </header>
      <section className="page__content">
        <div 
          className="container mx-auto py-12 px-2 text-balance prose prose-slate lg:prose-xl" 
          dangerouslySetInnerHTML={{ __html: pageData.pageContent }}
        />
      </section>
    </div>
  )
}

// Main page component
export default async function Home({ searchParams }) {
  const data = await fetchGraphQL(HOME_QUERY)
  
  // If we're in preview mode, use the client-side component
  if (searchParams['x-craft-live-preview']) {
    return <PreviewHome initialData={data} />
  }

  // Otherwise, render server-side
  const pageData = data?.entries?.[0] || {}
  return <HomeContent pageData={pageData} />
}
