import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { PSIDataType, UserHistory } from '@/type'
import {
  Card,
  Title,
  Bold,
  Text,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody
} from '@tremor/react'
import { getData, getDataAll } from '@/utils/fetchData'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { formatDate } from '@/utils/formatDate'
import InfiniteScrollBox from '@/components/InfinityScroll'

interface NewPSIDataType extends PSIDataType {
  score?: string
}

export default function HistoryCard() {
  const { data: session, status } = useSession()
  const [userHistory, setUserHistory] = useState([])

  const queryClient = useQueryClient()

  const getDataByAll = async () => {
    const data = await getDataAll('psi_site_list', Number(session?.user?.id))
    return data
  }

  const { data: results, isLoading } = useQuery<NewPSIDataType[]>({
    queryKey: ['history'],
    queryFn: getDataByAll,
    refetchInterval: 5000
  })

  console.log(results)

  const { data: history } = useQuery<UserHistory[]>({
    queryKey: ['user_history'],
    queryFn: async () => {
      const data = await getData('user_history', Number(session?.user?.id))
      return data
    },
    refetchInterval: 10000
  })

  if (!history?.length) {
    return (
      <Text className='mt-14 text-md text-center font-extrabold text-gray-500 dark:text-gray-100'>
        🤪 データがありません.
      </Text>
    )
    }

  return (
    <div className='mt-14'>
      <Card className='dark:bg-gray-950'>
        <Text className='mt-2 dark:text-white'>履歴一覧</Text>
        <Table className='mt-6 dark:text-white'>
          <div className='flex items-center pl-4 gap-x-[13rem] mb-2'>
            <Bold className=''>Date</Bold>
            <Bold>Action</Bold>
          </div>
          <TableBody className='dark:text-white'>
            <InfiniteScrollBox>
            {history?.map((item, index) => (
              <TableRow
                key={index}
                className='opacity-0 translate-y-10 animate-slide-in'
                style={{animationDelay: `${index * 0.1 + 1.3}s`}}
              >
                <TableCell className='pr-14'>
                  <div key={index}>
                    {formatDate(item.action_date)}
                  </div>
                </TableCell>
                <TableCell>
                  <span className='bg-gradient-to-r from-pink-400 via-indigo-500 to-violet-600
                    bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200
                    dark:to-sky-400'>
                      {item.site_name}
                  </span>
                  「（{item.device}）{item.site_url}」:  {item.action}.
                </TableCell>
              </TableRow>
            ))}
            </InfiniteScrollBox>
          </TableBody>

        </Table>
      </Card>
    </div>
  )

}
