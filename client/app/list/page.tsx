'use client'
import { useEffect, useState } from 'react'
import PsiTable from '@/components/PsiTable'
import { PSIDataType } from '@/type'
import { deleteData, getDataAll, patchData, postData } from '@/utils/fetchData'
import { getPsiDataAgain } from '@/utils/getPsi'
import {
  Card,
  Title,
  Button
} from '@tremor/react'

export default function PsiList() {
  const [pageList, setPageList] = useState<PSIDataType[]>([])

  const handlePsiData = async (url: string, index: number, id: number, device: string) => {
    await getPsiDataAgain(url, index, id, device)
  }

  const deleteItem = async (index: number, id: number) => {
    await deleteData('psi_site_list', id)

    setPageList((prevState) => {
      const updatedList = [...prevState]
      updatedList.splice(index, 1)
      return updatedList
    })
  }

  useEffect(()=> {
    const getDataByAll = async () => {
      const data = await getDataAll('psi_site_list')
      setPageList(data)
    }
    getDataByAll()
  }, [])

  return (
    <div>
      <Title>ページ一覧</Title>

      <Card className='mt-6'>
        <PsiTable
          pageList={pageList}
          getScoreAgain={handlePsiData}
          deleteItem={deleteItem}
        />
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
