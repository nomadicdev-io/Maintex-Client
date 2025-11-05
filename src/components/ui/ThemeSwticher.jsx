import { Button } from "@/components/ui/button"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'motion/react'

export default function ThemeSwticher() {

    const { theme, setTheme } = useTheme()

    const handleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

  return (
    <Button variant="secondary" size="icon" className="size-9 cursor-pointer overflow-hidden relative" onClick={handleTheme}>
		<AnimatePresence>
        {theme === 'light' &&
            <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, type: 'spring' }}
            key="light-icon"
            className="absolute inset-0 w-full h-full flex items-center justify-center">
                <Moon className="w-5 h-5" />
            </motion.div> 
        }
        {theme === 'dark' &&
            <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, type: 'spring' }}
            key="dark-icon"
            className="absolute inset-0 w-full h-full flex items-center justify-center">
                <Sun className="w-5 h-5" />
            </motion.div>
        }
        </AnimatePresence>
	</Button>
  )
}
