import { Suspense } from 'react'
import './globals.css'
import Nav from '@/components/Nav/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className='h-full'>
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
          {children}
        </main>
      </body>
    </html>
  )
}
