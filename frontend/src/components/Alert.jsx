'use client'

import { useFlashes } from '../lib/flashes'

export function Alert() {
  const { flashes } = useFlashes()

  if (!flashes.length) return null

  return (
    <div role="alert" className="absolute top-0 left-0 right-0 z-50">
      {flashes.map(({ id, message, level }) => (
        <p 
          key={id}
          className={`
            container mx-auto p-2 text-md text-center text-slate-50
            ${level === 'error' ? 'bg-red-600' : ''}
            ${level === 'success' ? 'bg-emerald-600' : ''}
            ${level === 'warning' ? 'bg-yellow-500' : ''}
            ${level === 'info' ? 'bg-blue-600' : ''}
          `}
        >
          {message}
        </p>
      ))}
    </div>
  )
}
