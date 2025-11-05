import { motion } from 'motion/react'
import Lottie from "lottie-react";
import loaderAnimation from '@animations/spinner-anim.json'

export default function FormLoader({size}) {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: 'tween' }}
        className='absolute inset-0 z-10 flex items-center justify-center bg-bg/80 backdrop-blur-md overflow-hidden'
    >
            <Lottie animationData={loaderAnimation} className={`w-auto dark:invert-100 ${size === 'sm' ? 'h-[3rem]' : 'h-[5rem]'}`} loop={true}/>

        
    </motion.div>
  )
}
