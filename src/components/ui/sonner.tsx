"use client"

import { AlertCircle, CircleAlert, CircleCheck, FileText, Info } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          toast: "!gap-3 !rounded-xl",
          
        }
      }}
      className="toaster group"
      position="top-center"
      style={
        {
          "--normal-bg": "var(--color-bg-300)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--color-border)",
        } as React.CSSProperties
      }
      icons={{
        success: <div className="w-[1.8rem] h-[1.8rem] rounded-full bg-emerald-500/35 flex items-center justify-center">
          <CircleCheck className="text-emerald-500" size={20} />
        </div>,
        error: <div className="w-[1.8rem] h-[1.8rem] rounded-full bg-red-500/35 flex items-center justify-center">
          <CircleAlert className="text-red-500" size={20} />
        </div>,
        info: <div className="w-[1.8rem] h-[1.8rem] rounded-full bg-blue-500/35 flex items-center justify-center">
          <Info className="text-blue-500" size={20} />
        </div>,
        warning: <div className="w-[1.8rem] h-[1.8rem] rounded-full bg-yellow-500/35 flex items-center justify-center">
          <AlertCircle className="text-yellow-500" size={20} />
        </div>,
      }}
      {...props}
    />
  )
}

export { Toaster }
