'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SetStateAction, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  interface pageList {
    name: string,
    url: string,
    score: number,
    date: string
  }

  const [pageList, setPageList] = useState<pageList[]>([])
  //const [page, setPage] = useState<string>('')

  const [url, setUrl] = useState('')
  const [name, setName] = useState('')

  const getScore = async () => {
    const res = await fetch(`http://localhost:3000/api/pagespeedInsights?url=${url}`, {
      cache: "no-store",
    })
    if(res.ok) {
      const data =await res.json()
      const score = data.score
      setPageList((pageList) => [...pageList, {name, score, url, date: new Date().toLocaleString()}])
    }
  }

  const getScoreAgain = async (existedUrl: string) => {
    const res = await fetch(`http://localhost:3000/api/pagespeedInsights?url=${existedUrl}`, {
      cache: "no-store",
    })
    if(res.ok) {
      const data =await res.json()
      const score = data.score
      setPageList((pageList) => {
        const updatedPageList = pageList.map((page) => {
          if (page.url === existedUrl) {
            return { ...page, score, date: new Date().toLocaleString() }
          } else {
            return page
          }
        })
        return updatedPageList
      })
    }
  }
  

  const handleNameChange = (event: { target: { value: SetStateAction<string> } }) => {
    setName(event.target.value);
  }

  const handleUrlChange = (event: { target: { value: SetStateAction<string> } }) => {
    setUrl(event.target.value);
  }


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '各ページのスコア',
      },
    },
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  const graphData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (

    <div className='h-screen md:flex'>
      <div className='md:w-1/3 justify-center py-10 items-center bg-white'>
        <p className='text-lg text-center font-bold m-5'>追加で計測をしたいサイトを登録してください</p>
        <form className='bg-white w-[80%] mx-auto'>
          <div className='border-2 py-2 px-3 rounded-2xl mb-4'>
            <input className='pl-2 outline-none border-none' type='text' name='' placeholder='サイト名' value={name} onChange={handleNameChange} />
          </div>
          <div className='border-2 py-2 px-3 rounded-2xl mb-4'>
            <input className='pl-2 outline-none border-none' type='text' name='' placeholder='URL' value={url} onChange={handleUrlChange} />
          </div>
          <button type='button' className='block w-1/3 bg-gray-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2' onClick={getScore}>登録</button>
        </form>

        <form className='bg-white w-[80%] mx-auto mt-10'>
          <div className='border-2 py-2 px-3 rounded-2xl mb-4'>
          <input className='pl-2 outline-none border-none' type='text' name='' placeholder='URL' value={url} onChange={handleUrlChange} />
          </div>
          <div className='mt-3 text-right'>
            <div><button type='button' className='block w-1/3 bg-gray-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2' onClick={getScore}>スコア取得</button></div>
          </div>
        </form>
      </div>

      <div className='md:w-2/3 justify-center py-10 items-center'>
        <div className='w-[80%] mx-auto'>
          <p className='text-lg text-center font-bold m-5'>計測対象ページ</p>
          {pageList.map((page, index) => (
          <div key={index}>
            <h3 className='text-2xl font-bold mx-auto w-5/6 mt-8'>{page.name}</h3>
            <table className='rounded-t-lg my-3 w-5/6 mx-auto bg-gray-200 text-gray-800'>
              <thead>
                <tr className='text-left border-b-2 border-gray-300'>
                  <th className='px-4 py-3'>URL</th>
                  <th className='px-4 py-3'>スコア</th>
                  <th className='px-4 py-3'>取得日時</th>
                </tr>
              </thead>
              <tbody>
              <tr className='bg-gray-100 border-b border-gray-200'>
                  <td className='px-4 py-3'>{page.url}</td>
                  <td className='px-4 py-3'>{page.score}</td>
                  <td className='px-4 py-3'>{page.date}</td>
                  <td className='px-4 py-3'><button type='button' className='block w-full bg-gray-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2' onClick={() => getScoreAgain(page.url)}>再取得</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          ))}

          <h3 className='text-2xl font-bold mx-auto w-5/6 mt-8'>線グラフ</h3>
          <Bar
            height={300}
            width={300}
            data={graphData}
            options={options}
            id='chart-key'
          />
        </div>
      </div>
    </div>

  )
}
