import { useRouter } from "@tanstack/react-router"
import { useCallback } from "react"
import { cn } from "@/lib/utils"

export default function CustomTabs({tabs, active}) {

    const router = useRouter()

    const handleTabClick = useCallback((slug) => {
        router.navigate({search: {
            tab: slug
        }})
    }, [active])

  return (
    <div data-slot="custom-tabs" className="relative w-full flex-col gap-5 ">
        <div data-slot="custom-tab-list" className="relative flex items-center justify-start border-b border-border pb-3 gap-3">
            {
                tabs.map((tab) => (
                    <div key={tab.id} data-slot="custom-tab-item" className="relative flex items-center justify-start">
                        <button onClick={() => handleTabClick(tab.slug)} type="button" className={cn(
                            "relative gap-5 dark:font-light font-regular opacity-75 px-4 rounded-lg py-2 cursor-pointer", 
                            active === tab.slug && "opacity-100 bg-bg-100")} value={tab.slug}>{tab.label}</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
