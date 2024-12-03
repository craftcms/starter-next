export const GUESTBOOK_QUERY = `
  query Guestbook {
    guestbookEntries: entries(section: "guestbook", limit: 1) {
      ... on page_Entry {
        id
        title
        pageContent
        pageSubheading
        authorId
      }
    }
  }
`