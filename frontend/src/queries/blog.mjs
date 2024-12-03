export const BLOG_QUERY = `
  query Blog($limit: Int!, $offset: Int!) {
    blogEntries(limit: 1) {
      ... on page_Entry {
        id
        slug
        title
        pageSubheading
        pageContent
      }
    }
    blogPostsEntries(limit: $limit, offset: $offset) {
      ... on page_Entry {
        id
        slug
        title
        uri
        pageSubheading
        pageContent
        postDate @formatDateTime(format: "F j, Y")
        image {
          alt
          url @transform(handle: "wide")
        }
      }
    }
    entryCount(section: "blogPosts")
  }
`
