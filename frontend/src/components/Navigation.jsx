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
            className={`block p-2 hover:underline ${
              pathname === '/blog' ? 'text-black' : 'text-red-600 hover:text-red-600'
            }`}
            aria-current={pathname === '/blog' ? 'page' : undefined}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link 
            href="/guestbook" 
            className={`block p-2 ${
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
          // Check if we're on any of the child pages
          const isOnChildPage = hasChildren && page.children.some(child => 
            pathname === `/${child.uri}` || 
            child.children?.some(grandchild => pathname === `/${grandchild.uri}`)
          )
          
          return (
            <li key={page.id}>
              <Link 
                href={`/${page.uri}`}
                className={`block p-2 ${
                  isCurrentPage ? 'text-black' : 'text-red-600 hover:text-red-600 hover:underline'
                }`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {page.title}
              </Link>
              {/* Show children if we're on the parent page OR any child page */}
              {hasChildren && (isCurrentPage || isOnChildPage) && (
                <ul className="">
                  {page.children.map(child => (
                    <li key={child.id}>
                      <Link 
                        href={`/${child.uri}`}
                        className={`block pl-6 sm:pl-2 p-1 ${
                          pathname === `/${child.uri}` ? 'text-black' : 'text-red-600 hover:underline hover:text-red-600 '
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
