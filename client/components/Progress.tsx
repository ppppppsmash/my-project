'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import React, { useState, useEffect } from 'react'
import PacmanLoader from 'react-spinners/PacmanLoader'
import FadeLoader from 'react-spinners/FadeLoader'
//import { getRandomArbitrary } from "../utils/math"

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
    <div className='fixed inset-0 z-40 flex items-center flex-col bg-black bg-opacity-70 sm:justify-center enter enter-active'>
      <FadeLoader
        color='#FFFFFF'
      />
      <ProgressPrimitive.Root
        value={progress}
        className="h-3 w-5/12 overflow-hidden rounded-full bg-white dark:bg-gray-900 mt-8"
      >
      <ProgressPrimitive.Indicator
        style={{ width: `${progress}%` }}
        className="h-full bg-gray-950 duration-300 ease-in-out dark:bg-white"
      />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { ProgressLoading }