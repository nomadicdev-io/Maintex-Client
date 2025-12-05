import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden min-w-[80px]",
  {
    variants: {
      variant: {
        default: 
          "border-transparent bg-bg-100 text-text [a&]:hover:bg-bg-300/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground border-border-600 text-text/85 bg-bg-300",
        teal: "border-teal-500/15 bg-teal-500/10 text-text [a&]:hover:bg-teal-500/20",
        sky: "border-sky-500/15 bg-sky-500/10 text-text [a&]:hover:bg-sky-500/20",
        amber: "border-amber-500/15 bg-amber-500/10 text-text [a&]:hover:bg-amber-500/20",
        red: "border-red-500/15 bg-red-500/10 text-text [a&]:hover:bg-red-500/20",
        gray: "border-gray-500/15 bg-gray-500/10 text-text [a&]:hover:bg-gray-500/20",
      },
      size: {
        default: "text-xs",
        sm: "text-xs",
        lg: "text-base px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className, props.size === 'lg' ? 'text-base px-3 py-1' : props.size === 'sm' ? 'text-xs' : 'text-xs')}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
