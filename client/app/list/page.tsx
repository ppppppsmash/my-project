'use client'
import PsiTable from '@/components/PsiTable'
import {
  Card,
  Title,
  Button
} from '@tremor/react'

export default function PsiList() {
  return (
    <div>
      <Title>ページ一覧</Title>

      <Card className='mt-6'>
        <PsiTable/>
      </Card>

      <div className='mt-5'>
        <Button
          className='w-[150px] bg-gray-900 hover:bg-gray-700
          py-2 px-4 rounded active:bg-gray-500
          duration-150 focus:shadow-outline ease-in-out'
          color='gray'
        >
          <a href='/list/add'>
            ページ登録
          </a>
        </Button>
      </div>
    </div>
  )
}
