import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { PSIDataType, UserHistory } from '@/type'
import {
  Card,
  Title,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
  Color,
} from '@tremor/react'
import { getData, getDataAll } from '@/utils/fetchData'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { formatDate } from '@/utils/formatDate'

interface NewPSIDataType extends PSIDataType {
  score?: string
}

export default function PsiHistory() {
  const { data: session, status } = useSession()
  const [userHistory, setUserHistory] = useState([])

  const queryClient = useQueryClient()

  const getDataByAll = async () => {
    const data = await getDataAll('psi_site_list', Number(session?.user?.id))
    return data
  }

  const { data: result, isLoading } = useQuery<NewPSIDataType[]>({
    queryKey: ['history'],
    queryFn: getDataByAll,
    refetchInterval: 10000
  })

  const { data: history } = useQuery<UserHistory[]>({
    queryKey: ['user_history'],
    queryFn: async () => {
      const data = await getData('user_history', Number(session?.user?.id))
      return data
    },
    refetchInterval: 10000
  })

  console.log(history)

  if (!result) return <h1 className='mt-14 text-md text-center'>データがありません.</h1>

  return (
    <div className='mt-14'>
      <Card>
        <Text className="mt-2">履歴一覧</Text>
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>History</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {history?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <div key={index}>
                  {formatDate(item.action_date)}
                </div>
              </TableCell>
              <TableCell>
                サイト名：{item.site_name} 「{item.site_url}」 から{item.action}。
              </TableCell>
            </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </Card>
    </div>
  )

}