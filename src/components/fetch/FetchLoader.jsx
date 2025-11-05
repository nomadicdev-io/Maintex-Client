import {motion} from 'motion/react'
import Lottie from 'lottie-react'
import loaderDark from '@animations/maintex-loader-dark.json'
import loaderLight from '@animations/maintex-loader-light.json'
import { useTheme } from 'next-themes'

export default function FetchLoader() {

  const {resolvedTheme} = useTheme()

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, type: 'tween' }}
    className='absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center bg-bg/80 backdrop-blur-md'>
        <Lottie animationData={resolvedTheme === 'dark' ? loaderDark : loaderLight} className='w-[5rem] h-[5rem] grayscale opacity-60' loop={true}/>
    </motion.div>
  )
}
