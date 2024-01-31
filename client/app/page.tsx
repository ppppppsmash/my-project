'use client'

import {
  Text
} from '@tremor/react'
import Image from 'next/image'
import { useSession } from "next-auth/react"
import { getCsrfToken } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamicImport from 'next/dynamic'

const queryClient = new QueryClient()

const DynamicPsiHistoryComponent = dynamicImport(() => import('@/components/History/HistoryCard'))

export default async function Home() {
  const { data: session, status } = useSession()
  // const session = await getServerSession(authOptions)

  if (status === 'authenticated') {
    return (
      <QueryClientProvider client={queryClient}>
        <div className='w-full mx-auto'>
          { status === 'authenticated' &&
            <>
              <div className='flex items-center gap-x-6'>
                {session.user.image && (
                  <Image
                    className='rounded-full border-gray-300 border shadow-sm'
                    src={session?.user?.image}
                    width={100}
                    height={100}
                    alt='webcrew member'
                  />
                )}

                <div>
                  <Text className='dark:text-white'>お疲れ様です！🤟 <br className='block sm:hidden' />{session?.user?.name} さん</Text>
                  <Text className='mt-4 dark:text-white'>Email: <br className='block sm:hidden' />{session?.user?.email}</Text>
                </div>
              </div>

              <DynamicPsiHistoryComponent />
            </>
          }
        </div>
      </QueryClientProvider>
    )
  }
}
