'use client'

import { useState } from 'react'
import { fetchGraphQL } from '../lib/graphql'
import { CREATE_POST_MUTATION } from '../queries/post'

export function PostForm({ authorId, onPostSubmitted }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const generateTitle = (text) => {
    const words = text.split(' ').slice(0, 3).join(' ').trim()
    return `Post: ${words}${words ? '...' : ''}`
  }

  const submitPost = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) {
      console.error('Message is required')
      return
    }

    setLoading(true)
    try {
      const title = generateTitle(message)
      console.log('Submitting with:', {
        title,
        message,
        authorId
      })

      const result = await fetchGraphQL(
        CREATE_POST_MUTATION, 
        {
          title,
          message,
          authorId: authorId.toString()
        },
        { private: true }
      )

      console.log('Mutation result:', result)

      if (!result?.save_guestbookPosts_text_Entry) {
        throw new Error('No data returned from the mutation')
      }

      // TODO: Add flash message functionality
      setMessage('')
      if (onPostSubmitted) onPostSubmitted()
    } catch (err) {
      // TODO: Add flash message functionality
      console.error('Error creating post:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form method="post" onSubmit={submitPost}>
      <div className="mb-6 mt-4">
        <label htmlFor="message" className="font-bold">Message</label>
        <textarea 
          name="message" 
          className="w-full px-6 py-4" 
          required 
          id="message" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
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
