'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const FlashContext = createContext(null)

export function FlashProvider({ children }) {
  const [flashes, setFlashes] = useState([])

  const addFlash = useCallback((message, level = 'info') => {
    const id = Date.now()
    setFlashes(prev => [...prev, { id, message, level }])
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setFlashes(prev => prev.filter(flash => flash.id !== id))
    }, 5000)
  }, [])

  const removeFlash = useCallback((id) => {
    setFlashes(prev => prev.filter(flash => flash.id !== id))
  }, [])

  return (
    <FlashContext.Provider value={{ flashes, addFlash, removeFlash }}>
      {children}
    </FlashContext.Provider>
  )
}

export function useFlashes() {
  const context = useContext(FlashContext)
  if (!context) {
    throw new Error('useFlashes must be used within a FlashProvider')
  }
  return context
}
