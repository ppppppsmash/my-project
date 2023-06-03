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

const today = new Date().toLocaleDateString()

const labels = ['1日', '2日', '3日', '4日', '5日', '6日', '7日']

const index: FC<Props> = ({pageList}): JSX.Element => {
  const todayScore = pageList.filter(page => page.date === today)
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