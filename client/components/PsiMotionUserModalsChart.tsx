'use client'
import { useState } from 'react'
import { PSIMetrics } from '@/type'
import { Flex, Card, Text, LineChart, Color as TremorColor } from '@tremor/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowsPointingInIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/utils/formatDate'

interface Props {
  siteMetrics: PSIMetrics[]
  categories: string[]
}

export default function PsiMotionUserModalsChart({ categories, siteMetrics }: Props) {
  const [userSelectedId, setUserSelectedId] = useState<string | null>(null)
  const colors: TremorColor[] = ['rose', 'emerald', 'orange', 'lime', 'violet', 'pink']
  const formattedSiteMetrics = siteMetrics.map(metric => ({
    ...metric,
    createdAt: formatDate(metric.createdAt),
  }))

  const formattedCategories = (category: string) : string => {
    switch (category) {
      case 'user_lcp':
        return 'Largest Contentful Paint (LCP)'
      case 'user_fid':
        return 'First Input Delay (FID)'
      case 'user_cls':
        return 'Cumulative Layout Shift (CLS)'
      case 'user_fcp':
        return 'First Contentful Paint (FCP)'
      case 'user_inp':
        return 'Interaction to Next Paint (INP)'
      case 'user_ttfb':
        return 'Time to First Byte (TTFB)'
      default:
        return category
    }
  }

  return (
    <Flex className='w-full flex-wrap justify-start box-border p-2 -mx-2'>
      {categories.map((category, index) => (
        <div className='w-1/3 p-2' key={index}>
          <motion.div
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
            layoutId={index.toString()}
            onClick={() => setUserSelectedId(index.toString())}
          >
            <Card>
              <Text>{formattedCategories(category)}</Text>
              <LineChart
                data={formattedSiteMetrics}
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
        {userSelectedId && (
          <Card className='fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -webkit-transform mx-auto w-[1000px] z-10'>
            <motion.div
              className='relative p-4'
              layoutId={userSelectedId}>
              <motion.button
                className='absolute -top-4 right-0'
                whileTap={{ scale: 1.5 }}
                onClick={() => setUserSelectedId(null)}
              >
                <ArrowsPointingInIcon className='w-5 h-5 text-gray-600 hover:scale-[0.9]' />
              </motion.button>
              <LineChart
                data={formattedSiteMetrics}
                index='createdAt'
                categories={[categories[parseInt(userSelectedId)]]}
                colors={[colors[parseInt(userSelectedId)]]}
                yAxisWidth={40}
              />
            </motion.div>
          </Card>
        )}
      </AnimatePresence>
    </Flex>
  )
}
