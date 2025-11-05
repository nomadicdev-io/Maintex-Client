import { motion } from "motion/react"
import Lottie from "lottie-react"
import animation from '@animations/no-internet-anim.json'

export default function NoInternet() {
  return (
    <motion.div
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, type: 'tween' }}
    className="fixed inset-0 flex-1 w-screen h-screen flex items-center justify-center overflow-hidden z-99999"
    >
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        key={'no-internet-overlay'}
        className="absolute inset-0 w-full h-full bg-bg/5 backdrop-blur-xl " />
  
        <div className="flex flex-col items-center justify-center text-center gap-5 grayscale-100">
            <Lottie animationData={animation} className={`w-auto dark:invert-100 h-90`} loop={true}/>
            <h1 className="text-4xl font-bold">You are currently offline</h1>
            <p className="text-base text-text/50">Please check your internet connection and try again</p>
        </div>
    </motion.div>
  )
}
