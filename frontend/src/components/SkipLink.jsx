'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function SkipLink() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const myRef = useRef(null)
  const hasPageBeenRendered = useRef(false);

  useEffect(() => {
    // Only focus skip link on route changes after initial page render
    if (hasPageBeenRendered.current) {
      myRef.current.focus();
    }
    
    hasPageBeenRendered.current = true;
  }, [pathname, searchParams])

  return (
    <a
      href="#main"
      ref={myRef}
      className="skip-link absolute rounded font-bold bg-red-600 text-slate-50 px-6 py-4"
    >
      Skip to main content
    </a>
  )
} 