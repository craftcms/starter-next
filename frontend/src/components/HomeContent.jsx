export function HomeContent({ pageData }) {
  return (
    <div>
      <header className="container mx-auto pt-12 pb-6 px-2 text-2xl">
        <h1 className="font-bold text-4xl sm:text-6xl lg:text-9xl">
          {pageData.title}
        </h1>
        {pageData.pageSubheading && (
          <p className="mt-4">
            {pageData.pageSubheading}
          </p>
        )}
      </header>
      <section className="page__content">
        <div 
          className="container mx-auto py-12 px-2 text-balance prose prose-slate lg:prose-xl" 
          dangerouslySetInnerHTML={{ __html: pageData.pageContent }}
        />
      </section>
    </div>
  )
}
