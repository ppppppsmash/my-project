import PageToButton from '@/components/Button/PageToButton'
import AnalysisTableListParent from '@/components/AnalysisTableListParent'
import { Suspense } from 'react'

export default function PsiList() {

  return (
    <div className='w-full mx-auto'>
      <div className='my-6 flex justify-start'>
        <PageToButton
          label='ページ登録'
          pageURL='/list/add'
        />
      </div>
      <div className='mb-5'>
        <h2 className='text-xl text-center font-semibold'>ページ一覧</h2>
      </div>

      <AnalysisTableListParent />
    </div>
  )
}
