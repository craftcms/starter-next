'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function RouteAnnouncer() {
  const pathname = usePathname()
  const skipLinkRef = useRef(null)
  const previousPathRef = useRef(pathname)

  useEffect(() => {
    if (previousPathRef.current !== pathname) {
      // Wait for the new page content to be ready
      requestAnimationFrame(() => {
        // Force a reflow to ensure focus is managed correctly
        document.body.getBoundingClientRect()

        // Find the first focusable element in the main content
        const main = document.querySelector('main')
        const focusableElements = main?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )

        // Get page title for announcement
        const h1 = document.querySelector('h1')
        const pageTitle = h1 ? h1.textContent : pathname
        const message = `Navigated to ${pageTitle}`
        
        // Create and append live region
        const announcer = document.createElement('div')
        announcer.setAttribute('aria-live', 'assertive')
        announcer.setAttribute('aria-atomic', 'true')
        announcer.setAttribute('role', 'alert')
        announcer.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;'
        announcer.textContent = message
        document.body.appendChild(announcer)

        // Focus management
        if (skipLinkRef.current) {
          // Always make skip link focusable
          skipLinkRef.current.setAttribute('tabindex', '0')
          
          // Focus skip link on navigation if no specific element needs focus
          if (!document.activeElement || document.activeElement === document.body) {
            skipLinkRef.current.focus()
          }
        }

        // Debug info in development
        if (process.env.NODE_ENV === 'development') {
          console.group('Route Change Focus Management')
          console.log('Focusable elements:', focusableElements)
          console.log('Current focus:', document.activeElement)
          console.log('Skip link:', skipLinkRef.current)
          console.groupEnd()
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
      className="sr-only"
    >
      Skip to main content
    </a>
  )
} 