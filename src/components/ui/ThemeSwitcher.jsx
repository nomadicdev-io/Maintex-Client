import { useTheme } from "next-themes"
import { useCallback } from "react"
import { Button } from "./button"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ThemeSwitcher({classNames}) {

    const {resolvedTheme, setTheme} = useTheme()
  
    const onThemeSwitch = useCallback(() => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }, [resolvedTheme])
  
    return (
      <div className={cn("absolute top-0 right-0 p-5", classNames)}>
        <Button size={'icon'} variant={'defaultIcon'} onClick={onThemeSwitch}>
        {
          resolvedTheme === 'dark' ? 
          <Sun />
          :
          <Moon />
        }
        </Button>
      </div>
    )
  }