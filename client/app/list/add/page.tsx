import dynamicImport from 'next/dynamic'
import { Card, Title } from '@tremor/react'
import PsiTab from '@/components/PsiTab'

const DynamicComponent = dynamicImport(() => import('@/components/PsiTab'))

export default function AddList() {
  return (
    <div>
      <Title className='dark:text-white'>ページ登録</Title>
      <Card className='mt-6 shadow-lg dark:bg-gray-950 dark:text-white'>
        <DynamicComponent />
      </Card>
    </div>
  )
}
