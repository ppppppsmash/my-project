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
      className="mb-6"
    >
      {children}
    </motion.div>
  )
}