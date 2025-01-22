'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({ pages = [] }) {
  const pathname = usePathname()
  
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
        {pages.map(page => {
          const isCurrentPage = pathname === `/${page.uri}`
          const hasChildren = page.children && page.children.length > 0
          const isOnChildPage = hasChildren && page.children.some(child => 
            pathname === `/${child.uri}` || 
            child.children?.some(grandchild => pathname === `/${grandchild.uri}`)
          )
          
          return (
            <li key={page.id} role="none" className="relative">
              <Link 
                href={`/${page.uri}`}
                role="menuitem"
                tabIndex={0}
                aria-expanded={hasChildren && (isCurrentPage || isOnChildPage) ? 'true' : 'false'}
                aria-haspopup={hasChildren ? 'true' : undefined}
                className={`block p-2 outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
                  isCurrentPage ? 'text-black' : 'text-red-600 hover:text-red-600 hover:underline'
                }`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {page.title}
              </Link>
              {hasChildren && (isCurrentPage || isOnChildPage) && (
                <ul role="menu" className="pl-4 sm:pl-2">
                  {page.children.map(child => (
                    <li key={child.id} role="none" className="relative">
                      <Link 
                        href={`/${child.uri}`}
                        role="menuitem"
                        tabIndex={0}
                        className={`block p-1 outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
                          pathname === `/${child.uri}` ? 'text-black' : 'text-red-600 hover:underline hover:text-red-600'
                        }`}
                        aria-current={pathname === `/${child.uri}` ? 'page' : undefined}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
