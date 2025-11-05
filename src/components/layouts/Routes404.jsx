import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCanGoBack, useRouter } from "@tanstack/react-router";

export default function Routes404() {

    const router = useRouter();
    const canGoBack = useCanGoBack();

    const handleGoBack = () => {
        if(canGoBack) {
            router.history.go(-1);
        } else {
            router.navigate({to: '/app'});
        }
    }
    
  return (
    <div className='relative flex-1 flex flex-col w-full h-full p-8 items-center justify-center'>
        <div className="absolute inset-0 w-full h-full z-0 opacity-5 flex items-center justify-center">
            <h1 className='text-[30vw] font-bold'>404</h1>
        </div>

        <div className="relative w-full flex flex-col items-center justify-center gap-2 text-center">
            <h2 className='text-2xl font-medium'><span className='text-4xl block mb-3'>So Sorry,</span> <span className='font-regular opacity-75'>we couldn't find the page you're looking for...</span></h2>
            <div className="flex items-center justify-center gap-2 mt-5">
            <Button variant='default' onClick={handleGoBack}>
                <ArrowLeft size={24} />
                <span>Go Back</span>
            </Button>
            </div>
        </div>
        
    </div>
  )
}
