'use client'

import NextImage from 'next/image'

export function Image({ image }) {
  if (!image) return null

  // Helper function to generate photo URL with width
  const getPhotoUrl = (photo, width) => {
    return `${photo.url}?width=${width}`
  }

  return (
    <picture>
      <source data-sizes="100vw" />
      <NextImage 
        src={image.url}
        alt={image.alt || ''}
        width={image.width || 1200}
        height={image.height || 800}
        sizes="100vw"
        priority={false}
        quality={75}
        className="w-full h-auto"
      />
    </picture>
  )
}
