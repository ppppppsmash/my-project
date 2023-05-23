import { FC } from 'react'
import { Inter } from 'next/font/google'

interface Props {}

const inter = Inter({ subsets: ['latin'] })

const Home: FC<Props> = (props): JSX.Element => {
  return (
    <div>テスト</div>
  )
}

export default Home
