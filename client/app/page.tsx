import { FC } from 'react'
import { Inter } from 'next/font/google'

interface Props {}

const inter = Inter({ subsets: ['latin'] })

const Home: FC<Props> = (props): JSX.Element => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>テスト</div>
    </main>
  )
}

export default Home
