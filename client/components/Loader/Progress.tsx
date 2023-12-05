'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import React, { useState, useEffect } from 'react'
import BounceLoader from 'react-spinners/BounceLoader'

interface ProgressProps {
    progress: number
}

const ProgressLoading = ({ progress }: ProgressProps) => {
  const [progress_, setProgress_] = useState<number>(0)

  // const getRandomArbitrary = (min: number, max: number) => {
  //   return Math.random() * (max - min) + min
  // }

  useEffect(() => {
    let timerId: null | NodeJS.Timer = null

    timerId = setInterval(() => {
      setProgress_(30)
      setProgress_(progress)
    }, 5000)

    return () => {
      if (timerId) {
        clearInterval(timerId)
      }
    }
  }, [])

  return (
    <div className='fixed inset-0 z-50 flex items-center flex-col bg-background/80 backdrop-blur-sm justify-center enter enter-active'>
      <BounceLoader
        color='black'
        size={20}
      />
      <ProgressPrimitive.Root
        value={progress}
        className="h-3 sm:w-1/5 w-2/3 overflow-hidden rounded-full bg-gray-700 dark:bg-white mt-8 border border-gray-700 dark:border-white"
      >
      <ProgressPrimitive.Indicator
        style={{ width: `${progress}%` }}
        className="h-full dark:bg-gray-950  duration-300 ease-in-out bg-white"
      />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { ProgressLoading }