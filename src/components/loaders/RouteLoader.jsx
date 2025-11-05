import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import Lottie from 'lottie-react'
import loaderDark from '@animations/maintex-loader-dark.json'
import loaderLight from '@animations/maintex-loader-light.json'

export default function RouteLoader() {

  const {resolvedTheme} = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.15, type: 'tween' }}
      className="fixed bottom-0  m-5 right-0 w-auto bg-bg-300 backdrop-blur-md p-2 rounded-xl border border-border/80 z-9999 overflow-hidden " 
    >
      <Lottie animationData={resolvedTheme === 'dark' ? loaderDark : loaderLight} className='w-[1.75rem] h-[1.75rem] grayscale opacity-60' loop={true}/>

    </motion.div>
  )
}
