'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function RouteAnnouncer() {
  const pathname = usePathname()
  const skipLinkRef = useRef(null)
  const previousPathRef = useRef(pathname)

  useEffect(() => {
    // Debug focusable elements
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    console.log('Focusable elements:', focusableElements)

    // Only announce and focus if the path has actually changed
    if (previousPathRef.current !== pathname) {
      // Wait for the new page content to be ready
      requestAnimationFrame(() => {
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

        // Focus the skip link only on route changes and when appropriate
        if (skipLinkRef.current && 
            (!document.activeElement || document.activeElement === document.body)) {
          skipLinkRef.current.focus()
        }

        // Clean up
        setTimeout(() => {
          document.body.removeChild(announcer)
        }, 1000)

        previousPathRef.current = pathname
      })
    }
  }, [pathname])

  const handleSkip = (e) => {
    e.preventDefault()
    const main = document.querySelector('main')
    if (main) {
      // Ensure main is focusable but won't remain in tab order
      main.setAttribute('tabindex', '-1')
      main.focus()
      
      // Remove tabindex after focus
      requestAnimationFrame(() => {
        main.removeAttribute('tabindex')
      })
    }
  }

  return (
    <a
      ref={skipLinkRef}
      href="#main"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 focus:bg-white focus:p-4 focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
    >
      Skip to main content
    </a>
  )
} 