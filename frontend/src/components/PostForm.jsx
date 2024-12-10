'use client'

import { useState } from 'react'
import { fetchGraphQL } from '@/lib/graphql'
import { CREATE_POST_MUTATION } from '@/queries/post.mjs'

export function PostForm({ authorId, onPostSubmitted }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const generateTitle = (text) => {
    const words = text.split(' ').slice(0, 3).join(' ').trim()
    return `Post: ${words}${words ? '...' : ''}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) return

    setLoading(true)
    try {
      const response = await fetchGraphQL(
        CREATE_POST_MUTATION, 
        {
          title: generateTitle(message),
          message: message,
          authorId: authorId.toString()
        },
        { private: true }
      )

      if (!response?.save_guestbookPosts_text_Entry) {
        throw new Error('Failed to create post')
      }

      setMessage('')
      
      // Call the callback instead of refreshing the page
      if (onPostSubmitted) {
        onPostSubmitted()
      }
      
    } catch (error) {
      alert(error.message || 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="mb-6 mt-4">
        <label htmlFor="message" className="font-bold">Message</label>
        <textarea 
          name="message" 
          className="w-full px-6 py-4" 
          required 
          id="message" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <input 
        type="submit" 
        className="rounded font-bold bg-red-600 text-slate-50 px-6 py-4" 
        value="Post entry" 
        disabled={loading}
      />
    </form>
  )
}