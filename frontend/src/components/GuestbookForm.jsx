'use client'

import { PostForm } from './PostForm'
import { PostList } from './PostList'

export function GuestbookForm({ authorId, previewToken }) {
  const handlePostSubmitted = async () => {
    if (window) window.location.reload()
  }

  return (
    <section className="container mx-auto mb-6 px-2">
      <PostForm 
        authorId={authorId}
        onPostSubmitted={handlePostSubmitted}
      />
      
      <PostList 
        previewToken={previewToken}
      />
    </section>
  )
} 