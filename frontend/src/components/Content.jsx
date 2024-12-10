export function Content({ pageData }) {
  const {
    title,
    pageSubheading,
    pageContent,
    image
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
    </div>
  )
} 