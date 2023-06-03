import { FC } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ApiResultType } from '@/type'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  pageList: ApiResultType[]
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '推移グラフ',
    }
  }
}

const now = new Date()
const monthNow = now.getMonth() + 1
const today = now.getDate()
const labels = [`${monthNow}月${today}日`]

const index: FC<Props> = ({pageList}): JSX.Element => {
  // const todayScore = pageList.filter((page) => {
  //   const pageDate = new Date(String(page.date))
  //   return (
  //     pageDate.getMonth() + 1 === monthNow &&
  //     pageDate.getDate() === today
  //   )
  // })
  // console.log(todayScore)
  const testData = [
    {id: 1, label:'', data: pageList.map((page) => (page.score)), backgroundColor: 'rgba(105, 105, 105, 0.5)',},
  ]

  const data = {
    labels,
    datasets: testData,
  }

  return (
      <Bar datasetIdKey='id' options={options} data={data} />
  )
}

export default index