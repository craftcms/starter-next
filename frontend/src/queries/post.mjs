export const CREATE_POST_MUTATION = `
  mutation createGuestbookPost($title: String!, $message: String, $authorId: ID!) {
    save_guestbookPosts_text_Entry(
      title: $title,
      textBlock: $message,
      authorId: $authorId
    ) {
      title
      textBlock
    }
  }
`