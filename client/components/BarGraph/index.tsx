'use client'
import { FC, useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { ApiResultType } from '@/type'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
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

const index: FC<Props> = ({pageList}): JSX.Element => {
  const [labels, setLabels] = useState<string[]>([`${monthNow}.${today}`])

  useEffect(() => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentDay = currentDate.getDate()
    const newLabel = `${currentMonth}月${currentDay}日`

    // 既存のlabelsにnewLabelが含まれていない場合にのみ追加
    if (!labels.includes(newLabel)) {
      setLabels((prevLabels) => [...prevLabels, newLabel])
    }
  }, [])

  const testData = [
    {id: 1, label:'テスト', data: pageList.map((page) => {
      page.score
    }), backgroundColor: 'rgba(105, 105, 105, 0.5)',},
  ]
  console.log(labels)
  const data = {
    labels,
    datasets: testData,
  }

  console.log

  return (
    <div>
      {/* <Bar datasetIdKey='id' options={options} data={data} /> */}
      <Line datasetIdKey='id' options={options} data={data} />
    </div>
  )
}

export default index
