import { Image } from './Image'
import Link from 'next/link'

export function Content({ pageData = {} }) {
  // Early return with empty div if no pageData
  if (!pageData) {
    return <div />
  }

  const {
    title = '',
    pageSubheading = '',
    pageContent = '',
    image = [],
    ancestors = [],
    children = []
  } = pageData

  return (
    <div>
      {image?.[0] && (
        <figure>
          <Image 
            image={image[0]} 
            alt={image[0].alt || title || 'Page header image'} 
          />
        </figure>
      )}

      <header className="container mx-auto pt-12 pb-6 px-2 text-2xl">
        {ancestors?.length > 0 && (
          <ul className="mb-2 text-base text-slate-500">
            {ancestors.map((ancestor) => (
              <li key={ancestor.uri}>
                <Link href={`/${ancestor.uri}`}>{ancestor.title}</Link>
              </li>
            ))}
          </ul>
        )}
        {title && (
          <h1 className="font-bold text-4xl sm:text-6xl lg:text-9xl">
            {title}
          </h1>
        )}
        {pageSubheading && (
          <p className="mt-4">{pageSubheading}</p>
        )}
      </header>

      {pageContent && (
        <section className="page__content">
          <div 
            className="container mx-auto py-12 px-2 text-balance prose prose-slate lg:prose-xl" 
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </section>
      )}
      
      {children?.length > 0 && (
        <footer>
          <div className="container mx-auto py-12 px-2">
            <h3 className="font-bold text-3xl mb-4">Children</h3>
            <ul>
              {children.map((child) => (
                <li key={child.uri}>
                  <span className="text-slate-400 mr-2" aria-hidden="true">&rarr;</span>
                  <Link href={`/${child.uri}`} className="text-red-600 hover:underline">{child.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      )}
    </div>
  )
} 