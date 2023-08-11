'use client'
import { useEffect, useState } from 'react'
import { PSIDataType } from '@/type'
import AnalysisTableList from '@/components/Table/AnalysisTableList'
import { deleteData, getDataAll } from '@/utils/fetchData'
import { getPsiDataAgain } from '@/utils/getPsi'

interface Props {}

export default function List() {
  const [pageList, setPageList] = useState<PSIDataType[]>([])

  const handlePsiData = async (url: string, index: number, id: number, device: string) => {
    await getPsiDataAgain(url, index, id, device)
  }

  const deleteItem = async (index: number, id: number) => {
    await deleteData('psi_site_list', id)

    setPageList((prevState) => {
      const updatedList = [...prevState];
      updatedList.splice(index, 1);
      return updatedList;
    });
  }

  useEffect(() => {
    const getDataByAll = async () => {
      const data = await getDataAll('psi_site_list')
      console.log(data)

      setPageList(prevState => {
        const updatedList = data.map((item: any) => ({
          id: item.id,
          device: item.device,
          name: item.name,
          url: item.url,
          score: item.score,
          date: item.date,
        }))
        return [...prevState, ...updatedList]
      })
    }

    getDataByAll()
  }, [])

  return (
    <AnalysisTableList
      pageList={pageList}
      getScoreAgain={handlePsiData}
      deleteItem={deleteItem}
    />
  )
}
