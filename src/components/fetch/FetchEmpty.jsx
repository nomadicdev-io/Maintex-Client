import { cn } from "@/lib/utils"

export default function FetchEmpty({title = "Sorry, No Results Found", description = "Your request does not match any results. Please try again.", children, classNames}) {
  return (
    <div className={cn("relative w-full flex flex-col items-center justify-center pt-[5rem]", classNames?.wrapper)}>

      <div className="relative w-[35%] mb-10 h-auto opacity-20 grayscale dark:invert-0 invert-100">
        <img src={'/no-data.png'} alt="Empty" className="w-full h-auto object-contain" />
      </div>

      {
        title ? <h2 className={cn("text-2xl font-semibold mb-2", classNames?.title)}>{title}</h2> : null
      }
      {
        description ? <p className={cn("text-sm text-text/50", classNames?.description)}>{description}</p> : null
      }

      {
        children ? children : null
      }
    </div>
  )
}
