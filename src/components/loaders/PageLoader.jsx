import Lottie from "lottie-react";
import loaderDark from '@animations/maintex-loader-dark.json'
import loaderLight from '@animations/maintex-loader-light.json'
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

export default function PageLoader() {
  
  const {resolvedTheme} = useTheme()
  return (
      <motion.div 
        key={'page-loader'}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.4, type: 'tween', delay: 0.3 } }}
        transition={{ duration: 0.4, type: 'tween' }}
        className="fixed top-0 left-0 w-full h-full overflow-hidden flex items-end z-999 bg-bg">
          <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, type: 'tween' }}
          className="flex items-center gap-6 p-10 justify-start">
           
            <Lottie animationData={resolvedTheme === 'dark' ? loaderDark : loaderLight} className='w-[5rem] h-[5rem] grayscale dark:invert-0 invert-100' loop={true}/>
            <p className="text-2xl text-text/75 font-regular animate-pulse duration-500">Please wait, Preparing Dashboard</p>
          </motion.div>
      </motion.div>
  )
}
