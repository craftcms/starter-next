'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function SkipLink() {
  const pathname = usePathname()
  const myRef = useRef(null)
  const hasPageBeenRendered = useRef(false)

  useEffect(() => {
    if (hasPageBeenRendered.current) {
      myRef.current.focus()
    }
    
    hasPageBeenRendered.current = true
  }, [pathname])

  return (
    <a
      href="#main"
      ref={myRef}
      className="
        absolute -left-[1000px] -top-[1000px] w-px h-px overflow-hidden
        focus-visible:left-[10px] focus-visible:top-[10px] focus-visible:w-auto focus-visible:h-auto
        rounded font-bold bg-red-600 text-slate-50 px-6 py-4
      "
    >
      Skip to main content
    </a>
  )
} 