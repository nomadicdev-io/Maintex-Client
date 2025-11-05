import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import LoginForm from '@/components/forms/LoginForm'
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import VerifyEmail from '@/components/forms/VerifyEmail'
import Routes404 from '@/components/layouts/Routes404'

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
  notFoundComponent: Routes404,
  head: ()=> ({
    meta: [
      {
        title: "Login | Maintex Pro "
      }
    ]
  })
})

function RouteComponent() {

  const search = Route.useSearch()

  return (
    <AnimatePresence mode={'wait'}>
      {
        // search?.form === 'signup' ? 
        // <SignUpForm key={'signup-form'}/>
        // :
        search?.form === 'forgot-password' ?
        <ForgotPasswordForm key={'forgot-password-form'}/>
        :
        search?.form === 'verify-email' ?
        <VerifyEmail />
        :
        <LoginForm key={'login-form'}/>
      }
    </AnimatePresence>
  )
}
