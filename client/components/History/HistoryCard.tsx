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
import { DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
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
          <TableHead>
            <TableRow>
              <TableHeaderCell className='dark:text-white'>Date</TableHeaderCell>
              <TableHeaderCell className='dark:text-white'>History</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className='dark:text-white'>
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
                  <div className='flex gap-x-2'>
                    { item?.device === 'mobile' &&  <DevicePhoneMobileIcon className='w-5 h-5' /> }
                    { item?.device === 'desktop' &&  <ComputerDesktopIcon className='w-5 h-5' /> }

                    <span className='bg-gradient-to-r from-stone-400 via-zinc-500 to-neutral-400
                      bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200
                      dark:to-sky-400'>
                        { item?.site_name }{' '}{ item?.site_url }{' '}{ item.action }
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Card>
    </div>
  )

}
