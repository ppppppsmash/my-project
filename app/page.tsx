'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [score, setScore] = useState(0);

  const getScore = async () => {
    const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://google.com&key=${process.env.NEXT_PUBLIC_API_KEY}&strategy=mobile`)
    if (res.ok) {
      const data = await res.json()
      const lighthouse = data.lighthouseResult
      setScore(lighthouse.categories.performance.score * 100);
  } else {
      console.error('Failed to get data from server');
  }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {score ? <div>Score: {score}</div> : <button onClick={getScore}>Get Score</button>}
      </div>
    </main>
  )
}
