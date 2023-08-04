'use client'
import { FC, useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { PSIDataType } from '@/type'
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
  pageList: PSIDataType[]
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

export default function Graph({pageList}: Props) {
  const labels = pageList.map((page) => (page.name))

  const testData = [
    {id: 1, label:'テスト', data: pageList.map((page) => (page.score)), backgroundColor: 'rgba(105, 105, 105, 0.5)',},
  ]
  console.log(pageList)
  console.log(labels)
  const data = {
    labels,
    datasets: testData,
  }

  return (
    <div>
      <Line datasetIdKey='id' options={options} data={data} />
    </div>
  )
}

