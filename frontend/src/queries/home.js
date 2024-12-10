export const HOME_QUERY = `
  query Home {
    entries(section: "home", limit: 1) {
      ... on page_Entry {
        id
        title
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
