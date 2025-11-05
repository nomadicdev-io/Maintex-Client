import { motion } from 'motion/react'
import { BarLoader } from 'react-spinners'

export default function AppLoader() {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: 'tween' }}
        className='fixed inset-0 z-9999 flex items-center justify-center'
    >
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className='w-auto h-[4.5rem]'
        >
          <BarLoader height={3} width={'100%'} color="#EF4852" />
        </motion.div>
    </motion.div>
  )
}
