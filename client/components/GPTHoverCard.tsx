import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { clsx } from 'clsx'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Text,
  Flex
} from '@tremor/react'
import { SparklesIcon } from '@heroicons/react/24/solid'
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
    setHovered(true)
    const response = await fetchChatResponse(message)

    if(response?.ok) {
      const responseData = await response.json()
      const result = responseData.choices[0].message.content
      setResponse(result)
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setResponse('')
  }

  const Loading = () => {
    return (
      <Flex className='justify-center gap-x-3'>
        <Text>Loading...</Text>
        <CircleLoader size={20} />
      </Flex>
    )
  }

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
          <motion.div
            className='w-[450px] h-[450px] pointer-events-none relative z-50 origin-top overflow-hidden !p-0'
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
              height: 250
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
            <div className='w-full h-full flex gap-x-2 items-start'>
              <LightBulbIcon className='w-5 h-5 text-[#FFC042]' />
              <Text className='block w-full text-sm dark:text-white'>
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
