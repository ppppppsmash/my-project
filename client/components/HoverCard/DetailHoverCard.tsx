import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { clsx } from 'clsx'
import React, { useState } from 'react'
import {
  Text
} from '@tremor/react'
import { SparklesIcon } from '@heroicons/react/24/solid'

const { Root, Trigger, Portal } = HoverCardPrimitive

const DetailHoverCard = ({children}: {children: React.ReactNode}) => (
  <HoverCardPrimitive.Root>
    <HoverCardPrimitive.Trigger asChild>
      {children}
    </HoverCardPrimitive.Trigger>
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        className={clsx(
          'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'max-w-md rounded-lg p-4 md:w-full whitespace-pre break-all',
          'bg-white dark:bg-gray-800 p-4 rounded shadow-md',
          'focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'
        )} sideOffset={5}>
          <div className='flex gap-x-2 items-center'>
            <SparklesIcon className='w-5 h-5 text-[#FFC042]' />
            <Text className='text-sm dark:text-white'>
              詳細ページへ遷移できるよ
            </Text>
          </div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  </HoverCardPrimitive.Root>
)

export default DetailHoverCard
