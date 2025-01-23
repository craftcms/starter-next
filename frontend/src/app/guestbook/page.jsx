import { notFound } from 'next/navigation'
import { createPage } from '../../lib/createPage'
import { GUESTBOOK_QUERY } from '../../queries/guestbook'
import { Content } from '../../components/Content'
import { GuestbookInteractive } from '../../components/GuestbookInteractive'
import { FlashProvider } from '@/lib/flashes'
import { Alert } from '@/components/Alert'
import { fetchGraphQL } from '../../lib/graphql'

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

export default async function Page(props) {
  // Fetch and transform the data directly instead of using createPage
  const data = await fetchGraphQL(GUESTBOOK_QUERY, {})
  const pageData = transform(data)

  return (
    <FlashProvider>
      <Alert />
      <Content pageData={pageData} />
      <div className="mt-8">
        <GuestbookInteractive authorId={pageData.authorId} />
      </div>
    </FlashProvider>
  )
}
