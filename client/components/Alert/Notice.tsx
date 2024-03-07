'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XCircleIcon, BellIcon } from '@heroicons/react/24/outline'

export default function Notice() {
  const [noticeFlagId, setNoticeFlagId] = React.useState<string>('')

  return (
    <div className=''>
      <div className='absolute top-14 -right-5 inset-y-0 pr-4 pt-4'>
        <ul className='grid grid-cols-1 gap-4'>
          <AnimatePresence initial={false}>
            {noticeFlagId && (
              <motion.li
                layout='position'
                key={noticeFlagId}
                layoutId={noticeFlagId}
                // className='relative z-50 w-64 p-5 text-base bg-white/40 backdrop-brightness-90 backdrop-blur-lg
                //   border font-medium text-transparent bg-clip-text bg-gradient-to-br from-zinc-50 to-zinc-200/20
                //   border-white/40 shadow-md rounded-xl'
                className='relative z-50 w-64 p-4 shadow-lg rounded-xl bg-white dark:bg-gray-900 border-[1px] border-gray-300'
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.2 }}
                  type='button'
                  aria-label='close'
                  className='absolute -left-4 -top-2 text-xs bg-white dark:bg-gray-900 shadow-full rounded-full px-1.5 py-0.5 border border-gray-300 z-50'
                  onClick={() => setNoticeFlagId('')}
                >
                  <XCircleIcon
                    className='w-4 h-4'
                  />
                </motion.button>

                <p className='text-xs mb-2 bg-gray-100 p-2 rounded-lg font-thin hover:bg-gray-50 transition dark:text-gray-500'>
                  9/14: 「ヘッダー」通知アラートが実装できた！
                </p>
                <p className='text-xs mb-2 bg-gray-100 p-2 rounded-lg font-thin hover:bg-gray-50 transition dark:text-gray-500'>
                  9/15: 「ページ一覧」: テーブルのURLをマウスオーバーしたら、title、image、descriptionなどを
                  マウスオーバー対象の詳細ページで反映させるように実装した。</p>
                <p className='text-xs mb-2 bg-gray-100 p-2 rounded-lg font-thin hover:bg-gray-50 transition dark:text-gray-500'>
                  9/16: 「履歴一覧」: ログイン時間 & 前回ログイン時間取得
                </p>

                <p className='text-xs mb-2 bg-gray-100 p-2 rounded-lg font-thin hover:bg-gray-50 transition dark:text-gray-500'>
                  9/16: 「ページ一覧」: angel animationを利用して、動的グラーデーションボタンを実装
                </p>

                <p className='text-xs mb-2 bg-gray-100 p-2 rounded-lg font-thin hover:bg-gray-50 transition dark:text-gray-500'>
                  9/17: 「ページ一覧」 → 「詳細ページ」 → 「チャート詳細」: カレンダーから日付期間が選択できるように実装済み.
                </p>

                <p className='text-xs mb-2 bg-gray-100 p-2 rounded-lg font-thin hover:bg-gray-50 transition dark:text-gray-500'>
                  9/18: 「履歴一覧」: もっと見る ボタンを実装.
                </p>

                <p className='text-xs mb-2 bg-gray-100 p-2 rounded-lg font-thin hover:bg-gray-50 transition dark:text-gray-500'>
                  9/22: <span className='font-semibold'>「Cron Job処理」</span>を実装済み.
                </p>
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </div>

      <div className='absolute top-5 sm:right-[120px] right-24 z-50 flex items-center justify-center'>
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.05 }}
          layoutId='100'
          type='button'
          className=''
          onClick={() => setNoticeFlagId('100')}
        >
          <BellIcon
            className='w-6 h-6 text-black dark:text-white hover:scale-[1.2] transition duration-300'
          />
        </motion.button>
      </div>
    </div>
  )
}