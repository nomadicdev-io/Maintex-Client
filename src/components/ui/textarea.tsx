import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, isError, isFallbackError, ...props }: React.ComponentProps<"textarea"> & { isError?: boolean, isFallbackError?: boolean }) { 
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "ile:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-border-600/80 flex h-20 w-full min-w-0 rounded-lg border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-primary/50 focus-visible:ring-[1px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ",
        isError ? "border-danger/75" : null,
        isFallbackError ? "border-danger/75" : null,
        className
      )}
      {...props}
    />
  ) 
}

export { Textarea }
