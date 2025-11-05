import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-text/15 animation-duration-[800ms] animate-pulse", className)}
      {...props}
    />
  )
}

export { Skeleton }
