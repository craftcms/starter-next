import { notFound } from 'next/navigation'
import { fetchGraphQL } from '../../lib/graphql'
import { GUESTBOOK_QUERY } from '../../queries/guestbook'
import { Content } from '../../components/Content'
import { GuestbookInteractive } from '../../components/GuestbookInteractive'

export const dynamic = 'force-static'
export const revalidate = 3600

const transform = (data) => {
  if (!data?.guestbookEntries?.[0]) {
    return notFound()
  }
  
  const entry = data.guestbookEntries[0]
  return {
    ...entry,
    title: entry.title || '',
    pageSubheading: entry.pageSubheading || '',
    pageContent: entry.pageContent || '',
    authorId: entry.authorId
  }
}

export default async function Page({ searchParams }) {
  const data = await fetchGraphQL(GUESTBOOK_QUERY, {}, {
    preview: Boolean(
      searchParams?.token && 
      searchParams?.['x-craft-live-preview']
    )
  })
  
  const pageData = transform(data)

  return (
    <>
      <Content pageData={pageData} />
      <div className="mt-8">
        <GuestbookInteractive authorId={pageData.authorId} />
      </div>
    </>
  )
}
