export const PAGE_QUERY = `
  query PageEntry($uri: [String]!) {
    entry(uri: $uri) {
      ancestors {
        id
        title
        uri
      }
      children {
        id
        title
        uri
      }
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
