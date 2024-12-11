import { createPage } from '../../lib/createPage'
import { GUESTBOOK_QUERY } from '../../queries/guestbook'
import { Content } from '../../components/Content'
import { GuestbookInteractive } from '../../components/GuestbookInteractive'
import { FlashProvider } from '@/lib/flashes'
import { Alert } from '@/components/Alert'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const transform = (data) => {
  if (!data?.guestbookEntries?.[0]) {
    throw new Error('Guestbook page not found')
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

function GuestbookPage({ pageData }) {
  return (
    <FlashProvider>
      <Alert />
      <Content pageData={pageData} />
      <GuestbookInteractive authorId={pageData.authorId} />
    </FlashProvider>
  )
}

export default function Page(props) {
  return createPage(GUESTBOOK_QUERY, transform, GuestbookPage)(props)
}
