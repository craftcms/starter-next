import Link from 'next/link'
import Image from 'next/image'

export function Teaser({ entry, featured = false }) {
  return (
    <article className="py-6 mb-12">
      {featured && (
        <figure>
          <Link
            href={`/${entry.uri}`}
            className="text-red-600 hover:underline focus:underline cursor-pointer block mb-4"
          >
            {entry.image && entry.image.length > 0 ? (
              <Image 
                src={entry.image[0].url} 
                alt={entry.image[0].alt || ''} 
                width={entry.image[0].width} 
                height={entry.image[0].height} 
                className="w-full h-auto"
              />
            ) : (
              <div className="bg-slate-200 aspect-video hover:bg-slate-300" />
            )}
          </Link>
        </figure>
      )}
      
      <div className="mb-4">
        <h2 className="font-bold mb-2 text-4xl">
          <Link 
            href={`/${entry.uri}`}
            className="text-red-600 hover:underline focus:underline cursor-pointer"
          >
            {entry.title}
          </Link>
        </h2>
        
        {entry.pageSubheading && (
          <p>{entry.pageSubheading}</p>
        )}
        
        <p>
          <time className="text-sm" dateTime={entry.postDate}>
            {entry.postDate}
          </time>
        </p>
      </div>
    </article>
  )
}
