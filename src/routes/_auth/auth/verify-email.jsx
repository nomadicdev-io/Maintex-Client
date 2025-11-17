import { createFileRoute } from '@tanstack/react-router'
import Lottie from "lottie-react";
import loaderAnimation from '@animations/loader-anim.json'
import { authClient } from '@/auth'
import { toast } from "sonner"

export const Route = createFileRoute('/_auth/auth/verify-email')({
  component: RouteComponent,
  beforeLoad: async ({search, context, navigate})=> {

    console.log(search.token)
    await authClient.verifyEmail({query: {
      token: search.token,
    }}, {
        onSuccess: ({data})=> {
          console.log(data)
          toast.success('Email Verified Successfully!')
          context.token = data.token
          context.user = data.user
          context.isAuthenticated = true
          navigate({to: '/app', replace: true})
        },
        onError: ({error})=> {
          console.log(error)
          toast.error(error.message || error.statusText)
          navigate({to: '/', replace: true})
        }
    })
  },
  head: ()=> ({
    meta: [
      {
        title: "Verify Email | Maintex Pro – The Developer Sandbox"
      }
    ]
  })
})

function RouteComponent() {
  return (
    <div className="w-[17.5rem] h-[17.5rem] flex items-center justify-center rounded-3xl glass-bg">
      <Lottie animationData={loaderAnimation} className='w-[7.5rem] h-[7.5rem]' loop={true}/>
    </div>
  )
}
