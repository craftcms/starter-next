'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({ pages = [] }) {
  const pathname = usePathname()
  
  const renderPageLinks = (pages) => {
    return pages.map(page => (
      <li key={page.id} role="none" className="relative">
        <Link 
          href={`/${page.uri}`}
          role="menuitem"
          tabIndex={0}
          className={`block p-2 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
            pathname === `/${page.uri}` ? 'text-black' : 'text-red-600 hover:text-red-600'
          }`}
          aria-current={pathname === `/${page.uri}` ? 'page' : undefined}
        >
          {page.title}
        </Link>
        {page.children?.length > 0 && (
          <ul className="pl-4" role="menu">
            {renderPageLinks(page.children)}
          </ul>
        )}
      </li>
    ))
  }
  
  return (
    <nav className="sm:basis-2/3 grow-1 relative z-10" aria-label="Primary">
      <ul className="sm:flex" role="menubar">
        <li role="none" className="relative">
          <Link 
            href="/blog" 
            role="menuitem"
            tabIndex={0}
            className={`block p-2 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
              pathname === '/blog' ? 'text-black' : 'text-red-600 hover:text-red-600'
            }`}
            aria-current={pathname === '/blog' ? 'page' : undefined}
          >
            Blog
          </Link>
        </li>
        <li role="none" className="relative">
          <Link 
            href="/guestbook" 
            role="menuitem"
            tabIndex={0}
            className={`block p-2 outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
              pathname === '/guestbook' ? 'text-black' : 'text-red-600 hover:text-red-600 hover:underline'
            }`}
            aria-current={pathname === '/guestbook' ? 'page' : undefined}
          >
            Guestbook
          </Link>
        </li>
        {renderPageLinks(pages)}
      </ul>
    </nav>
  )
}
