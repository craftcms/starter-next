'use client'

import { useFlashes } from '../lib/flashes'

export function Alert() {
  const { flashes } = useFlashes()

  if (flashes.length === 0) return null

  return (
    <div 
      role="alert"
      className="absolute top-0 left-0 right-0 z-50"
    >
      {flashes.map((flash) => (
        <p 
          key={flash.id}
          className={`
            container mx-auto p-2 text-md text-center text-slate-50
            ${flash.level === 'error' ? 'bg-red-600' : ''}
            ${flash.level === 'success' ? 'bg-emerald-600' : ''}
            ${flash.level === 'warning' ? 'bg-yellow-500' : ''}
            ${flash.level === 'info' ? 'bg-blue-600' : ''}
          `}
        >
          {flash.message}
        </p>
      ))}
    </div>
  )
}
