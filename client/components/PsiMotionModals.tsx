'use client'
import { useState } from 'react'
import { PSIMetrics } from '@/type'
import { Flex, Card, Text, LineChart, Color as TremorColor } from '@tremor/react'
import { AnimatePresence, motion } from 'framer-motion'
import { XCircleIcon } from '@heroicons/react/24/outline'

interface Props {
  siteMetrics: PSIMetrics[]
}

export default function PsiMotionModals({ siteMetrics }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const categories = ['lcp', 'fid', 'cls', 'fcp', 'tbt', 'si']
  const colors: TremorColor[] = ['rose', 'emerald', 'orange', 'lime', 'violet', 'pink']

  return (
    <Flex className='w-full flex-wrap box-border p-2 -mx-2'>
      {categories.map((category, index) => (
        <div className='w-1/3 p-2' key={index}>
          <motion.div
            layoutId={index.toString()}
            onClick={() => setSelectedId(index.toString())}
          >
            <Card>
              <Text>{category}-{index}</Text>
              <LineChart
                data={siteMetrics}
                index='createdAt'
                categories={[category]}
                colors={[colors[index]]}
                yAxisWidth={40}
              />
            </Card>
          </motion.div>
        </div>
      ))}
      <AnimatePresence>
        {selectedId && (
          <Card className='fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -webkit-transform mx-auto w-[800px] z-10'>
            <motion.div layoutId={selectedId}>
              <motion.button whileTap={{ scale: 1.5 }} onClick={() => setSelectedId(null)}>
                <XCircleIcon className='w-5 h-5' />
              </motion.button>
              <LineChart
                data={siteMetrics}
                index='createdAt'
                categories={[categories[parseInt(selectedId)]]}
                colors={[colors[parseInt(selectedId)]]}
                yAxisWidth={40}
              />
            </motion.div>
          </Card>
        )}
      </AnimatePresence>
    </Flex>
  )
}
