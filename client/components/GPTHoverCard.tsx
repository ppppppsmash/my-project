import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { clsx } from 'clsx'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CircleLoader from 'react-spinners/CircleLoader'
import {
  Text
} from '@tremor/react'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { LightBulbIcon } from '@heroicons/react/24/outline'
import { chatGPT } from '@/utils/chatGPT'

const { Root, Trigger, Portal } = HoverCardPrimitive

const GPTHoverCard = ({ children, message }: { children: React.ReactNode, message: string }) => {
  const [hovered, setHovered] = useState(false);
  const [response, setResponse] = useState<string>('')

  const handleMouseEnter = async () => {
    setHovered(true)
    const result = await chatGPT(message)
    setResponse(result)
  };

  const handleMouseLeave = () => {
    setHovered(false)
    setResponse('')
  };

  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          className={clsx(
            'w-full h-full radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'max-w-full rounded-lg p-4 w-full whitespace-pre break-all',
            'bg-white dark:bg-gray-800 p-4 rounded shadow-md',
            'focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75',
          )}
          sideOffset={5}
        >
          <div className='w-full h-full flex gap-x-2 items-start'>
            <LightBulbIcon className='w-5 h-5 text-[#FFC042]' />
            <Text className='block w-full text-sm dark:text-white'>
              {hovered ? `ChatGPT:\n ${response}` || 'Loading...' : ''}
            </Text>
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}

export default GPTHoverCard
