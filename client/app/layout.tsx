import { Suspense } from 'react'
import './globals.css'
import Nav from '@/components/Nav/Navbar'
import DelaySection from '@/components/DelaySection'

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
          <DelaySection delay={0.2}>
            {children}
          </DelaySection>
        </main>
      </body>
    </html>
  )
}
