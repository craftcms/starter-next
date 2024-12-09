import { createPage } from '../../lib/createPage'
import { GUESTBOOK_QUERY } from '../../queries/guestbook'
import { Content } from '../../components/Content'
import { GuestbookForm } from '../../components/GuestbookForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const transform = (data) => {
  if (!data?.guestbookEntries?.[0]) {
    throw new Error('Guestbook page not found')
  }
  
  return {
    ...data.guestbookEntries[0],
    title: data.guestbookEntries[0].title || '',
    pageSubheading: data.guestbookEntries[0].pageSubheading || '',
    pageContent: data.guestbookEntries[0].pageContent || '',
    authorId: data.guestbookEntries[0].authorId
  }
}

function GuestbookPage({ pageData, initialData, searchParams }) {
  return (
    <>
      <Content pageData={pageData} />
      <GuestbookForm 
        authorId={pageData.authorId}
        previewToken={searchParams?.token}
      />
    </>
  )
}

export default function Page(props) {
  return createPage(GUESTBOOK_QUERY, transform, GuestbookPage)(props)
}
