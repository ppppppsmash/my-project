'use client'

import dynamicImport from 'next/dynamic'
import { Card, Title } from '@tremor/react'
import PsiTab from '@/components/PsiTab'
import { zenKaku } from '@/utils/font'
import { signIn, signOut, useSession } from 'next-auth/react'

const DynamicComponent = dynamicImport(() => import('@/components/PsiTab'))

export default function AddList() {
  const { data: session } = useSession()

  return (
    <>
    { session &&
      <div>
        <Title className={`dark:text-white ${zenKaku.className} relative md:text-xl dark:text-white dark:after:from-white after:block after:bg-bottom
            after:bg-gradient-to-r after:from-gray-700 after:via-gray-300 after:to-transparent after:h-[1px]`}>ページ登録</Title>
        <Card className='mt-6 shadow-lg dark:bg-gray-950 dark:text-white'>
          <DynamicComponent />
        </Card>
      </div>
    }
  </>
  )
}
