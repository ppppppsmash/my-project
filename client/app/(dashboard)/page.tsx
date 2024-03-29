'use client'

import {
  Text,
  Card
} from '@tremor/react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamicImport from 'next/dynamic'
import { formatDate, jpFormatDate } from '@/utils/formatDate'
import { PSIDataType } from '@/type'
import HistorySiteDetail from '@/components/History/HistorySiteDetail'

interface NewPSIDataType extends PSIDataType {
  score?: string
}

const queryClient = new QueryClient()

const DynamicPsiHistoryComponent = dynamicImport(() => import('@/components/History/HistoryCard'))

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <QueryClientProvider client={queryClient}>
        <div className='w-full mx-auto'>
          { status === 'authenticated' &&
            <>
              <div className='flex items-center gap-x-8'>
                {session.user.image && (
                  <Image
                    className='rounded-full border-gray-300 border shadow-sm'
                    src={session?.user?.image}
                    width={150}
                    height={150}
                    alt='webcrew member'
                  />
                )}

                <div className='flex items-start gap-x-10 w-full'>
                  <div className='w-1/2'>
                    <Text className='dark:text-white text-md'>
                      <span className='group'>
                        <span className='font-mono font-bold text-lg'>&lt;</span>
                        <span
                          id='member'
                          className='group font-extrabold bg-clip-text text-transparent tracking-tight bg-gradient-to-r from-pink-400 via-green-500 to-violet-600'
                        >
                          {session?.user?.name}
                        </span>
                        <span className='font-mono font-bold text-lg'>{' '}/&gt;</span>{' '}
                        <span className={`invisible inline-flex text-gray-950 before:content-['|'] before:w-4 group-hover:visible group-hover:animate-typing dark:text-white`} />
                      </span>
                      <br />お疲れ様です！🤟
                    </Text>

                    <Text className='mt-2 dark:text-white'>Email: <br className='block sm:hidden' />{session?.user?.email}</Text>

                    { session?.user?.lastLoginedAt && (
                      <Text className='mt-6 dark:text-white text-xs text-gray-400'>前回ログイン: <br className='block sm:hidden' />{jpFormatDate(session?.user?.lastLoginedAt)}</Text>
                    )}
                    <Text className='mt-2 dark:text-white'>ログイン時間: <br className='block sm:hidden' />{jpFormatDate(session?.user?.loginedAt)}</Text>
                  </div>

                  <HistorySiteDetail />
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
