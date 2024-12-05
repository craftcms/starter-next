'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({ pages = [] }) {
  const pathname = usePathname()
  
  return (
    <nav className="sm:basis-2/3 grow-1" aria-label="Primary">
      <ul className="sm:flex">
        <li>
          <Link 
            href="/blog" 
            className={`block p-2 hover:underline text-red-600 hover:text-red-600 ${
              pathname === '/blog' ? 'text-red-600' : ''
            }`}
            aria-current={pathname === '/blog' ? 'page' : undefined}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link 
            href="/guestbook" 
            className={`block p-2 hover:underline text-red-600 hover:text-red-600 ${
              pathname === '/guestbook' ? 'text-red-600' : ''
            }`}
            aria-current={pathname === '/guestbook' ? 'page' : undefined}
          >
            Guestbook
          </Link>
        </li>
        {pages.map(page => (
          <li key={page.id}>
            <Link 
              href={`/${page.uri}`}
              className={`block p-2 hover:underline text-red-600 hover:text-red-600 ${
                pathname === `/${page.uri}` ? 'text-red-600' : ''
              }`}
              aria-current={pathname === `/${page.uri}` ? 'page' : undefined}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
