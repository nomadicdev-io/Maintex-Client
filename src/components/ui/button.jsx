import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
import { BounceLoader, HashLoader } from "react-spinners";

const buttonVariants = cva(
  "relative inline-flex border border-transparent font-medium dark:font-semibold items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[0.9rem] font-regular transition-all duration-450 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/90 text-bg dark:hover:bg-bg-300 hover:bg-primary-600 dark:hover:text-text hover:border-border-600",
        dark:
            "bg-text text-white hover:bg-text/90 dark:text-bg font-medium",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-border bg-text/2 text-text hover:bg-text/20 hover:text-text ",
        secondary:
          "bg-secondary text-secondary-foreground  hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        shade: "bg-bg-300 border border-text/15 text-text/75 hover:bg-text/20 hover:text-text", 
        shadeLow: "bg-bg-100/30 border border-border/45 text-text/50 hover:bg-bg-100/80 hover:text-text", 
        whiteShade: "bg-white/7 border border-white/15 text-white/75 hover:bg-white/20 hover:text-bg",
        dangerShade: "bg-red-300/10 border border-red-300/10 text-red-300/75 hover:bg-danger-600/20 hover:text-text",
        primaryIcon: "bg-text/2 border border-gray-200 hover:bg-gray-100 hover:border-gray-200 text-secondary",
        success: "bg-success text-white hover:bg-success/90",
        defaultIcon: "bg-text/2 border border-border-600 text-text",
        black: "bg-text text-text/75 hover:bg-text-300/90 dark:text-bg font-medium",
        blurShade: "bg-bg/50 border border-text/15 text-text/75 backdrop-blur-sm hover:bg-bg/80 hover:text-text"
      },
      size: {
        default: "h-10 rounded-lg px-5 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-xl px-8 has-[>svg]:px-5 text-lg",
        icon: "size-10 rounded-lg hover:bg-primary/10",
        iconSm: "size-8 rounded-lg hover:bg-primary/10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  isLoading = false,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      disabled={isLoading || props.disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} >
         {isLoading ? 
          <div className={
            cn("absolute inset-0 flex items-center justify-center bg-text z-10", isLoading && "bg-text"
            
          )}>
            <svg className="btn--loader animate-spin speed-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
              width="22" height="22">
              <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor" strokeWidth="" strokeLinecap="round" strokeLinejoin="round"></path>
              <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" className="text-bg">
              </path>
            </svg>
          </div>
          : null}
           {props.children}
      </Comp>
  );
}

export { Button, buttonVariants }
