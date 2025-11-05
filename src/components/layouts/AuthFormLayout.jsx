import { motion } from "framer-motion"

export default function AuthFormLayout({children, onSubmit }) {
  return (
    <motion.div
    initial={{ opacity: 0, x: '20vw', scale: 0.8 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: '-20vw', scale: 0.8}}
    transition={{ duration: 0.3, type: 'tween' }}
    onSubmit={onSubmit && onSubmit}
    className="relative block">
        {children}
    </motion.div>
  )
}
