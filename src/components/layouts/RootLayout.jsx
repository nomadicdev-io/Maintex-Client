import { motion } from 'motion/react'
import BGImage from './BGImage'

export default function RootLayout({ children }) {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, delay: 0.2, type: 'tween' }}
    className="relative flex flex-col w-full min-h-screen overflow-hidden">
      {/* <BGImage /> */}
        {children}
    </motion.div>
  )
}
