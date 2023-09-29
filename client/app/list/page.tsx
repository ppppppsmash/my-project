'use client'
import Link from 'next/link'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamicImport from 'next/dynamic'
import {
  Card,
  Title,
  Button
} from '@tremor/react'
const queryClient = new QueryClient()

const DynamicComponent = dynamicImport(() => import('@/components/PsiTable'))

export default function PsiList() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Title className='dark:text-white'>ページ一覧</Title>

        <div className='mt-5 text-right'>
          <Button
            className='w-[150px] bg-gray-950 hover:bg-gray-700
            py-2 px-4 rounded active:bg-gray-500 duration-150
            focus:shadow-outline ease-in-out'
            color='gray'
          >
            <Link href='/list/add'>
              ページ登録
            </Link>
          </Button>
        </div>

        <Card className='mt-6 shadow-lg dark:bg-gray-950 overflow-x-scroll'>
          <Title className='dark:text-white'>PSI</Title>
          {/* <PsiSearchMultipleBox /> */}
          <DynamicComponent />
        </Card>
      </div>
    </QueryClientProvider>
  )
}
