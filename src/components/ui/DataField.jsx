import { cn } from "@/lib/utils"

export default function DataField({label, description, children, className, classNames, helpers}) {
  return (
    <div className={cn("relative grid grid-cols-2 gap-6 p-6 border-b border-border justify-between", className, classNames?.wrapper)}>
        <div className="relative w-full flex flex-col">
          {
            label ? <h3 className={cn("text-base font-medium text-text/80", classNames?.title)}>{label}</h3> : null
          }
          {
            description ? <p className={cn("text-sm text-text/40", classNames?.description)}>{description}</p> : null
          }
          {
            helpers ? helpers : null
          }
        </div>

        {children ? children: null}

      </div>

  )
}
