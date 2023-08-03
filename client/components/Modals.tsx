'use client'
import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

interface Props {
  onOpen(): void
  onClose(): void
  getPsiData(id: number): void
  id: number
}

export default function Modals({ onOpen, onClose, getPsiData, id }: Props) {
  const handleClick = () => {
    getPsiData(id)
    onClose()
  }

  return (
    <div className='fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center enter enter-active'>
      <div className='w-full px-6 py-4 overflow-hidden rounded-t-lg bg-white sm:rounded-lg sm:m-4 sm:max-w-xl shadow-md'>
        <header className='flex justify-end'>
          <button className='inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150
            rounded 0 hover: hover:text-gray-700'
            onClick={()=>onClose()}
          >
            <RxCross2 size={20} />
          </button>
        </header>
        <p className='mt-4 mb-2 text-lg font-semibold text-gray-900 dark:text-gray-900'>
          登録しますか？
        </p>
        <div className='mb-6 text-sm text-gray-700 dark:text-gray-400'>
          テキストテキスト
        </div>
        <footer className='flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-100'>
          <div className='hidden sm:block'>
            <button className='align-bottom inline-flex items-center justify-center cursor-pointer
              leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2
              rounded-lg text-sm text-gray-600 border-gray-300 border dark:text-gray-400
              focus:outline-none active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:ring focus:ring-gray-300'
              onClick={()=>onClose()}
            >
              キャンセル
            </button>
          </div>
          <div className='hidden sm:block'>
            <button className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150
              font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-gray-900 border border-transparent
              active:hover:bg-gray-600 hover:bg-gray-700 focus:ring focus:ring-gray-300'
              onClick={handleClick}
            >
              確認
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}