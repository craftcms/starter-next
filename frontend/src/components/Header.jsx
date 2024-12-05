import Navigation from './Navigation'
import Logo from './Logo'

export default function Header({ siteName, logo, pages }) {
  return (
    <header className="navigation py-6 px-2 bg-slate-50">
      <div className="sm:flex justify-between container items-center mx-auto">
        <div className="logo sm:basis-1/3 font-bold p-1">
          <Logo siteName={siteName} logo={logo} />
        </div>
        <div>
          <Navigation pages={pages} />
        </div>
      </div>
    </header>
  )
}
