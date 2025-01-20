'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function RouteAnnouncer() {
  const pathname = usePathname()
  const [announced, setAnnounced] = useState(false)

  useEffect(() => {
    if (!announced) {
      // Wait a brief moment for the DOM to update with the new page content
      setTimeout(() => {
        const h1 = document.querySelector('h1')
        const pageTitle = h1 ? h1.textContent : pathname
        const message = `Navigated to ${pageTitle}`
        
        const announcer = document.createElement('div')
        announcer.setAttribute('aria-live', 'assertive')
        announcer.setAttribute('aria-atomic', 'true')
        announcer.setAttribute('role', 'alert')
        announcer.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;'
        announcer.textContent = message
        document.body.appendChild(announcer)
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(announcer)
          setAnnounced(true)
        }, 1000)
      }, 100) // Small delay to ensure h1 is available
    }

    return () => setAnnounced(false)
  }, [pathname, announced])

  return null
} 