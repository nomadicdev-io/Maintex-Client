import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardBanner({title, description, className, children}) {

  const router = useRouter();

  const handleGoBack = () => {
    router.history.go(-1);
  }

  return (
    <div className={cn('relative w-full flex gap-6  px-5 py-6 border-b border-border items-center', className)}>
      <div className='relative w-full flex-1 flex flex-col'>
        <div className="relative w-full flex gap-3">
          {/* <button onClick={handleGoBack} className="relative w-7 h-7 flex items-center justify-center rounded-lg bg-bg-300 border border-border/50 hover:bg-text/10 hover:border-border/80 transition-all duration-300 cursor-pointer">
            <ArrowLeft size={18} className="text-text/60" />
          </button> */}
        {
          title ? <h1 className='text-2xl font-semibold'>{title}</h1> : null
        }
        </div>
        {
          description ? <p className='text-sm text-text/50 mt-2'>{description}</p> : null
        }
        
      </div>
      {children}
    </div>
  )
}
