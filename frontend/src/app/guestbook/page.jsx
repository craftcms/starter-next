import { notFound } from 'next/navigation'
import { createPage } from '../../lib/createPage'
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

const CustomContent = ({ pageData }) => (
  <>
    <Content pageData={pageData} />
    <div className="mt-8">
      <GuestbookInteractive authorId={pageData.authorId} />
    </div>
  </>
)

export default createPage(
  GUESTBOOK_QUERY,
  transform,
  CustomContent,
  {
    variables: () => ({})
  }
)
