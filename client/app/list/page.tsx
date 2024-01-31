'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamicImport from 'next/dynamic'
import {
  Card,
  Title
} from '@tremor/react'
import { zenKaku } from '@/utils/font'
import Demo from '@/components/DemoButton'
const queryClient = new QueryClient()

const DynamicComponent = dynamicImport(() => import('@/components/Tab/TableTab'))

export default function PsiList() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Title className={`${zenKaku.className} relative md:text-xl dark:text-white dark:after:from-white after:block after:bg-bottom
          after:bg-gradient-to-r after:from-gray-700 after:via-gray-300 after:to-transparent after:h-[1px]`}>ページ一覧</Title>
          {/* <Demo /> */}
        <Card className='mt-6 shadow-lg dark:bg-gray-950'>
          <DynamicComponent />
        </Card>
      </div>
    </QueryClientProvider>
  )
}
