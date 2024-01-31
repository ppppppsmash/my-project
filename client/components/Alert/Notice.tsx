'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BellIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function Notice() {
  const [noticeFlagId, setNoticeFlagId] = React.useState<string>('')

  return (
    <div className=''>
      <div className='absolute top-14 -right-4 inset-y-0 pr-4 pt-4'>
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
                className='relative z-50 w-64 p-5 shadow-xl rounded-xl bg-white'
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
                  whileHover={{ scale: 1.05 }}
                  type='button'
                  aria-label='close'
                  className='absolute -left-4 -top-2 text-xs bg-white shadow-sm rounded-full px-1.5 py-0.5 border border-white/10 z-50'
                  onClick={() => setNoticeFlagId('')}
                >
                  <XCircleIcon
                    className='w-4 h-4'
                  />
                </motion.button>

                <p className='text-sm'>9/15: 通知アラートが実装できた！</p>
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </div>

      <div className='absolute top-5 sm:right-[120px] right-10 z-50 flex items-center justify-center'>
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.05 }}
          layoutId='1'
          type='button'
          className=''
          onClick={() => setNoticeFlagId('1')}
        >
          <BellIcon
            className='w-6 h-6 text-yellow-400 hover:scale-[1.2] transition duration-300'
          />
        </motion.button>
      </div>
    </div>
  )
}