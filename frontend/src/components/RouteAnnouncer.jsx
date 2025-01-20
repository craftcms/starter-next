'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export function RouteAnnouncer() {
  const pathname = usePathname()
  const [announced, setAnnounced] = useState(false)
  const skipLinkRef = useRef(null)

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
        
        // Focus the skip link
        if (skipLinkRef.current) {
          skipLinkRef.current.focus()
        }

        // Clean up
        setTimeout(() => {
          document.body.removeChild(announcer)
          setAnnounced(true)
        }, 1000)
      }, 100)
    }

    return () => setAnnounced(false)
  }, [pathname, announced])

  const handleSkip = (e) => {
    e.preventDefault()
    const main = document.querySelector('main') || document.querySelector('h1')
    if (main) {
      main.setAttribute('tabindex', '-1')
      main.focus()
      // Remove tabindex after focus to prevent unwanted tab stop
      main.removeAttribute('tabindex')
    }
  }

  return (
    <>
      <a
        ref={skipLinkRef}
        href="#main"
        onClick={handleSkip}
        className="sr-only"
      >
        Skip to main content
      </a>
    </>
  )
} 