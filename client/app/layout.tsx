import { Suspense } from 'react'
import Nav from '@/components/Nav/Navbar'
import DelaySection from '@/components/DelaySection'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className='h-full dark:bg-gray-950 dark:text-white'>
        <div className=''>
          <Nav />
        </div>
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
          <DelaySection delay={0.2}>
            <Suspense fallback='Loading...🌀'>
              {children}
            </Suspense>
          </DelaySection>
        </main>
      </body>
    </html>
  )
}
