'use client'

import NextImage from 'next/image'

export function Image({ image }) {
  if (!image) return null

  return (
    <picture>
      <source data-sizes="100vw" />
      <NextImage 
        src={image.url}
        alt={image.alt || ''}
        width={image.width || 1200}
        height={image.height || 800}
        sizes="100vw"
        quality={75}
        className="w-full h-auto"
      />
    </picture>
  )
}
