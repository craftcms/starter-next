import Link from 'next/link'

export function Content({ pageData }) {
  const {
    title,
    pageSubheading,
    pageContent,
    image,
    ancestors,
    children
  } = pageData

  return (
    <div>
      {/* Hero Image */}
      {image && image.length > 0 && (
        <figure>
          <img src={image[0].url} alt={image[0].alt} />
        </figure>
      )}

      <header className="container mx-auto pt-12 pb-6 px-2 text-2xl">
        {ancestors && ancestors.length > 0 && (
          <ul className="mb-2 text-base text-slate-400">
            {ancestors.map((ancestor) => (
              <li key={ancestor.uri}>
                <Link href={ancestor.uri}>{ancestor.title}</Link>
              </li>
            ))}
          </ul>
        )}
        <h1 className="font-bold text-4xl sm:text-6xl lg:text-9xl">
          {title}
        </h1>
        {pageSubheading && (
          <p className="mt-4">
            {pageSubheading}
          </p>
        )}
      </header>

      <section className="page__content">
        <div 
          className="container mx-auto py-12 px-2 text-balance prose prose-slate lg:prose-xl" 
          dangerouslySetInnerHTML={{ __html: pageContent }}
        />
      </section>
      {children && children.length > 0 && (
        <footer className="page__extra">
          <div className="container mx-auto py-12 px-2 text-balance">
            <h3 className="font-bold text-3xl mb-4">Children</h3>
            <ul>
              {children.map((child) => (
                <li key={child.uri}>
                  <span className="text-slate-400 mr-2" aria-hidden="true">&rarr;</span>
                  <Link href={child.uri} className="text-red-600 hover:underline">{child.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      )}
    </div>
  )
} 