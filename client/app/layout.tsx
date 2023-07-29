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
          <div className='flex-1 bg-gray-100'>
            <BreadCrumbs navItems={navItems} />
            <div className='p-6 bg-primary'>
              <main className="flex min-h-screen flex-col items-center justify-between bg-white rounded-lg shadow-md p-4">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
