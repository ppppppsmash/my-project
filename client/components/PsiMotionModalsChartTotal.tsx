'use client'
import { useState } from 'react'
import { PSIMetrics } from '@/type'
import { Flex, Card, Text, LineChart, Color as TremorColor } from '@tremor/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowsPointingInIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface Props {
  siteMetricsLeft: PSIMetrics[];
  siteMetricsRight: PSIMetrics[];
}

export default function PsiMotionModalsChartTotal({ siteMetricsLeft, siteMetricsRight }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const categories = ['lcp', 'fid', 'cls', 'fcp', 'tbt', 'si']
  const colors: TremorColor[] = ['rose', 'emerald', 'orange', 'lime', 'violet', 'pink']

  // データの加工や変換のための関数を定義することもできます

  const nameDataLeft = siteMetricsLeft.map((metric) => metric.name)
  const nameDataRight = siteMetricsRight.map((metric) => metric.name)

  const dateDataLeft = siteMetricsLeft.map((metric) => metric.updatedAt)
  const dateDataRight = siteMetricsRight.map((metric) => metric.updatedAt)

  // スコアのデータを抽出
  const scoreDataLeft = siteMetricsLeft.map((metric) => metric.score)
  const scoreDataRight = siteMetricsRight.map((metric) => metric.score)

  // 他のデータを抽出
  // 例えば、LCPのデータを抽出する場合
  const lcpDataLeft = siteMetricsLeft.map((metric) => metric.lcp)
  const lcpDataRight = siteMetricsRight.map((metric) => metric.lcp)

  // 他のデータも同様に抽出できます

  return (
    <div className='w-full box-border p-2 -mx-2'>
      <div className='p-2'>
        <motion.div>
          <Text>Test</Text>
          <LineChart
            data={[
              { date: dateDataLeft, label: nameDataLeft, 'left-lcp': lcpDataLeft },
              { date: dateDataRight, label: nameDataRight, 'lcp': lcpDataRight },
              // { label: nameDataLeft, 'lcp': lcpDataLeft },
              // { label: nameDataRight, 'lcp': lcpDataRight },
              // 他のデータも追加することができます
            ]}
            index='date'
            categories={categories}
            colors={colors}
            yAxisWidth={40}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <Card className='fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -webkit-transform mx-auto w-[800px] z-10'>
            <motion.div layoutId={selectedId}>
              <motion.button whileTap={{ scale: 1.5 }} onClick={() => setSelectedId(null)}>
              <ArrowsPointingInIcon className='w-5 h-5' />
              </motion.button>
              <LineChart
                data={[
                  { label: 'Site Left - Score', 'score': scoreDataLeft },
                  { label: 'Site Right - Score', 'score': scoreDataRight },
                  { label: 'Site Left - LCP', 'lcp': lcpDataLeft },
                  { label: 'Site Right - LCP', 'lcp': lcpDataRight },
                  // 他のデータも追加することができます
                ]}
                index='label'
                categories={categories}
                colors={colors}
                yAxisWidth={40}
              />
            </motion.div>
          </Card>
        )}
      </AnimatePresence>
    </div>
  )
}
