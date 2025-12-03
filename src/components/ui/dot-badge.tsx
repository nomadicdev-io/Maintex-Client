import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dotBadgeVariants = cva(
  "inline-flex items-center justify-start rounded-md border px-2 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border-600 bg-bg-100/50 text-text",
  {
    variants: {
      variant: {
       
      },
    },
    defaultVariants: {
    },
  }
)

function DotBadge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof dotBadgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="dot-badge"
      className={cn(dotBadgeVariants({ variant }), className)}
      {...props}
    >
        <i className={cn([
            "w-2 h-2 rounded-full bg-text me-1",
            variant === "teal" ? "bg-teal-500" : variant === "sky" ? "bg-sky-500" : variant === "amber" ? "bg-amber-500" : variant === "red" ? "bg-red-500" : variant === "blue" ? "bg-blue-500" : variant === "cyan" ? "bg-cyan-500" : "bg-text",
        ])}></i>
        {props.children}
    </Comp>
  )
}

export { DotBadge, dotBadgeVariants }
