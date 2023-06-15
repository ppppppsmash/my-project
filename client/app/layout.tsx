'use client'
import './globals.css'
import Nav from '@/components/Nav'
import BreadCrumbs from '@/components/Nav/Breadcrumbs'



import { navItems } from '@/components/Nav/NavItems'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <div className='flex'>
          <Nav navItems={navItems} />
          <div className='flex-1 p-10 text-primary-dark bg-primary'>
            <BreadCrumbs navItems={navItems} />
            <main className="flex min-h-screen flex-col items-center justify-between">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
