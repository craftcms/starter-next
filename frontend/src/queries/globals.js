export const GLOBALS_QUERY = `
  query Globals {
    globalEntries(limit: 1) {
      ... on global_Entry {
        id
        title
        logo {
          url
          alt
        }
        address {
          addressLine1
          addressLine2
          addressLine3
          countryCode
          locality
          postalCode
          title
        }
      }
    }
    pagesEntries(level: 1) {
      ... on page_Entry {
        id
        title
        uri
      }
    }
  }
`
