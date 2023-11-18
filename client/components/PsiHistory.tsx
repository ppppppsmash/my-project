import { useSession } from 'next-auth/react'
import { PSIDataType, SortType } from '@/type'
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
import { deleteData, getData, getDataAll, patchData } from '@/utils/fetchData'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDate } from '@/utils/formatDate'

interface NewPSIDataType extends PSIDataType {
  score?: string
}

export default function PsiHistory() {
  const { data: session, status } = useSession()

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

  if (!result) return <h1 className='mt-14 text-md text-center'>データがありません.</h1>

  //if (status === 'authenticated') {
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
            {result?.map((item) => (
              item?.siteMetrics?.map((siteMetric, index, array) => (
              <TableRow key={item?.id}>
                <TableCell>
                  <div key={siteMetric.id}>
                    {formatDate(siteMetric.createdAt)}
                  </div>
                </TableCell>
                <TableCell>
                  {index === array.length - 1
                    ? `「${item?.name}」（${item?.url}）を登録しました。`
                    : `「${item?.name}」（${item?.url}）のスコアを再取得しました。`
                  }
                </TableCell>
              </TableRow>
              ))
            ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    )
  //}
}