import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import loaderAnimation from '@animations/email.json'
import { useTheme } from "next-themes";



export default function VerifyEmail() {
  
  const {resolvedTheme} = useTheme()

    return (
      <div  className="flex flex-col gap-6 p-6 w-[22.5rem] rounded-3xl shadow-2xl glass-bg">

        <div className="flex items-center justify-center gap-2">
          <Lottie animationData={loaderAnimation} className='w-[12.5rem] h-[12.5rem] scale-135' loop={true}/>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 mb-3  text-center">
            <h2 className="text-3xl mb-3 leading-[1.6]">Please <span className="text-secondary">Verify</span> Your <span className="text-primary">Email </span>Address</h2>
            <p className="text-base text-gray-500">You're almost there! We've sent a verification code to your email. Please check your inbox.</p>
            
            {/* <div className="w-full mt-5">
            <Button className="w-full"  onClick={() => router.navigate({to: '/', replace: true})}>Login Now <ArrowRight /></Button>
            </div> */}
        </div>

      </div>

    )
}
