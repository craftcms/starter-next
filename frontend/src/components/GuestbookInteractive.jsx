'use client'

import { useRef } from 'react'
import { PostForm } from './PostForm'
import { PostList } from './PostList'

export function GuestbookInteractive({ authorId }) {
  const postListRef = useRef()

  return (
    <div className="container mx-auto px-2 sm:grid gap-6 grid-cols-2">
      <section className="mb-12">
        <PostList ref={postListRef} />
      </section>
      <section>
        <div className="bg-slate-200 p-6 mb-9 rounded">
          <h2 className="font-bold text-3xl mb-4">Post an entry</h2>
          <PostForm 
            authorId={authorId}
            onPostSubmitted={() => postListRef.current?.refresh()}
          />
        </div>
      </section>
    </div>
  )
} 