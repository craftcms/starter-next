import Navigation from './Navigation'
import Logo from './Logo'

export default function Header() {
  const siteName = process.env.SITE_NAME || 'Site Name'
  
  return (
    <header className="navigation py-6 px-2 bg-slate-50">
      <div className="sm:flex justify-between container items-center mx-auto">
        <div className="logo sm:basis-1/3 font-bold p-1">
          <Logo siteName={siteName} />
        </div>
        <div>
          <Navigation />
        </div>
      </div>
    </header>
  )
}
