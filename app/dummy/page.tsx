import { NextPage } from 'next'

interface Props {}

const Dummy: NextPage<Props> = () => {
  return (
    <div className='h-screen md:flex'>
      <div className='md:w-1/3 justify-center py-10 items-center bg-white'>
        <form className='bg-white w-[70%] mx-auto'>
          <div className='border-2 py-2 px-3 rounded-2xl mb-4'>
            <input className='pl-2 outline-none border-none' type='text' name='' placeholder='サイト名' />
          </div>
          <div className='border-2 py-2 px-3 rounded-2xl mb-4'>
            <input className='pl-2 outline-none border-none' type='text' name='' placeholder='URL' />
          </div>
          <button type='submit' className='block w-1/3 bg-gray-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2'>登録</button>
        </form>
      </div>
      <div className='md:w-2/3 justify-center py-10 items-center'>
        <div className='w-[80%] mx-auto'>
          <p className='text-lg text-center font-bold m-5'>テキスト</p>
          <table className='rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800'>
            <thead>
              <tr className='text-left border-b-2 border-gray-300'>
                <th className='px-4 py-3'>URL</th>
                <th className='px-4 py-3'>スコア</th>
                <th className='px-4 py-3'>取得日時</th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-gray-100 border-b border-gray-200'>
                <td className='px-4 py-3'>https://gohan.soudan-anshin.com/</td>
                <td className='px-4 py-3'>66</td>
                <td className='px-4 py-3'>2023/4/14 23:21:43</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dummy