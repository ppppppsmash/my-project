import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const page: NextPage<Props> = (): JSX.Element => {
  return (
    <div className='w-full mx-auto'>
      <h2>ページ登録 - register</h2>
      <div>
        <p>テストテスト</p>
      </div>
    </div>
  )
}

export default page