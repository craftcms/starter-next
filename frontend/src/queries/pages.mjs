export const PAGE_QUERY = `
  query PageEntry($uri: [String]!) {
    entry(uri: $uri) {
      ... on page_Entry {
        id
        title
        uri
        pageSubheading
        pageContent
        image {
          url @transform(handle: "hero")
          alt
        }
      }
    }
  }
`