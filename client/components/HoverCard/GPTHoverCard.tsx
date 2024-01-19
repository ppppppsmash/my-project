import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { clsx } from 'clsx'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Text,
  Bold,
  Flex
} from '@tremor/react'
import { LightBulbIcon } from '@heroicons/react/24/outline'
import CircleLoader from 'react-spinners/CircleLoader'

const GPTHoverCard = ({ children, message }: { children: React.ReactNode, message: string }) => {
  const [hovered, setHovered] = useState(false);
  const [response, setResponse] = useState<string>('')

  const fetchChatResponse = async (message: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}chatgpt/diagnosis?message=${message}`, {
        cache: 'no-store',
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const handleMouseEnter = async () => {
    if (!hovered) {
      setHovered(true)
      const response = await fetchChatResponse(message)

      if(response?.ok) {
        const responseData = await response.json()
        const result = responseData.choices[0].message.content
        setResponse(result)
      }
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const Loading = () => {
    return (
      <Flex className='flex-direction justify-center gap-x-3'>
        <CircleLoader size={22} />
        <Bold className='animate-pulse'>
            <span className='bg-gradient-to-r from-fuchsia-500 to-emerald-400
              bg-clip-text font-bold tracking-tight text-transparent'>
                ChatGPTは考え中...
            </span>
          </Bold>
      </Flex>
    )
  }

  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal className='!block'>
        <HoverCardPrimitive.Content
          className={clsx(
            'w-[700] h-[350px] radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'max-w-full rounded-lg p-4 w-full whitespace-pre break-all',
            'bg-white dark:bg-gray-800 p-4 rounded shadow-md',
            'focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75',
          )}
          sideOffset={5}
        >
          <motion.div
            className='w-[700px] overflow-hidden pointer-events-none relative z-50 origin-top !p-0'
            initial={{
              opacity: 0,
              scale: 0.965,
              y: 9,
              height:0
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: 300
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              y: 8,
              height: 0
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <div className='w-full h-full flex gap-x-2 items-center'>
              <Text className='w-[700px] text-xs dark:text-white whitespace-pre break-all'>
                {hovered ? (response !== '' ? (`ChatGPT:\n ${response}`) : <Loading />) : ''}
              </Text>
            </div>
          </motion.div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}

export default GPTHoverCard
