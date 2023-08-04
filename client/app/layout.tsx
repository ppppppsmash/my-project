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
          {children}
      </body>
    </html>
  )
}
