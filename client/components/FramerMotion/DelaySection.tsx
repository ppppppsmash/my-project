'use client'

import { motion } from 'framer-motion'

export default function DelaySection ({
    children,
    delay = 0
} : {
    children: React.ReactNode
    delay: number
}) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      // animate={{ y: 0, opacity: 1, scale: 1 }}
      // transition={{
      //   duration: 0.3,
      //   ease: [0, 0.71, 0.2, 1.01],
      //   scale: {
      //     type: "spring",
      //     damping: 5,
      //     stiffness: 100,
      //     restDelta: 0.001
      //   }
      // }}
      className='mb-6'
    >
      {children}
    </motion.div>
  )
}