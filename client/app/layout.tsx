import { Suspense } from 'react'
import Nav from '@/components/Nav/Navbar'
import DelaySection from '@/components/FramerMotion/DelaySection'
import AuthGuard from '@/components/Auth/AuthGuard'
import './globals.css'
import type { Metadata } from 'next'
import Favicon from '@/public/favicon.ico'
import MoonLoader from 'react-spinners/MoonLoader'
import Providers from './Providers'

export const metadata: Metadata = {
  title: 'Page Speed Measurement',
  description: 'created by liming.pei',
  icons: [{ rel: 'icon', url: Favicon.src }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className='h-full dark:bg-gray-950 dark:text-white bg-[url("/grid-black.svg")] dark:bg-[url("/grid.svg")]'>
        <Providers>
          <AuthGuard>
            <div className='mb-16'>
              <Nav />
            </div>
            <main className='p-4 md:py-10 md:px-16 mx-auto max-w-full relative'>
              <DelaySection delay={0.2}>
                <Suspense fallback={<h1 className='flex items-center justify-center my-4'><MoonLoader size={22} /></h1>}>
                  {children}
                </Suspense>
              </DelaySection>
            </main>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  )
}
