'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SetStateAction, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [url, setUrl] = useState('');
  const [score, setScore] = useState(0);

  const getScore = async () => {
    const res = await fetch(`http://localhost:3000/api/pagespeedInsights?url=${url}`, {
      cache: "no-store",
    })
    if(res.ok) {
      const data =await res.json()
      setScore(data.score)
    }
  }

  const handleUrlChange = (event: { target: { value: SetStateAction<string> } }) => {
    setUrl(event.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <label htmlFor="url-input">URL:</label>
      <input className='text-gray-900' id="url-input" type="text" value={url} onChange={handleUrlChange} />
      <div className='mt-3 text-right'>
        {score ? <div>スコア: {score}</div> : <div><button className='rounded-full bg-white text-gray-900' onClick={getScore}>スコア取得</button></div>}
      </div>
    </div>
    </main>
  )
}
