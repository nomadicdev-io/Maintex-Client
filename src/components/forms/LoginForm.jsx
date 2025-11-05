import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import validator from 'validator';
import { InputField, InputOTPPattern } from "../ui/FormComponent";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import AuthFormLayout from "../layouts/AuthFormLayout";
import { authClient } from "@auth";

export function EmailVerification() {
  return (
    <motion.form
      initial={{ opacity: 0, x: '50%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-50%' }}
      transition={{ duration: 0.3, type: 'tween' }}
      className="flex flex-col gap-5 w-[22.5rem] bg-bg-300 p-5 rounded-2xl shadow-2xl shadow-bg-300/50"
    >


<div className="flex flex-col gap-2">
        <img src="/verify-email.png" alt="Email Verification" className="w-full h-auto aspect-[16/7] object-contain my-8" />
      </div>

<div className="flex flex-col items-center justify-center gap-1 mb-3  text-center">
            <h2 className="text-3xl mb-3 font-semibold">Almost there! <br /> <span className="text-primary">Verify</span> Your Email</h2>
            <p className="text-base text-gray-500">We've sent a verification code to your email. Please check your inbox.</p>
          </div>


    </motion.form>
  )
}

export default function LoginForm() {
  
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {resolvedTheme} = useTheme()
    const navigate = useNavigate()
    const [isTwoFactor, setIsTwoFactor] = useState(false)

    const form = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
        onSubmit: async ({value}) => {
          setIsLoading(true)
          try{
            await authClient.signIn.email({
              email: value.email,
              password: value.password,
              callbackURL: "/app",
              rememberMe: true,
            }, {
              onSuccess: ({data}) => {
                console.log(data)

                if(data.twoFactorRedirect) {
                  setIsTwoFactor(true)
                  return true
                }

                router.update({
                  context: {
                    token: data.token,
                    user: data.user,
                    isAuthenticated: true,
                  }
                })
                form.reset()
                router.navigate({to: '/app', replace: true})
                return true
              },
              onError: ({error}) => {
                console.log(error)
                toast.error(error.message)

                if (error.status === 403) {
                  navigate({to: '/?form=verify-email'})
                }
              }
            })
            return true
          }catch(error){
            console.log(error)
            toast.error(error.message)
          }finally{
            setIsLoading(false)
          }
        },
        validators: {
          onSubmit: ({ value })=> {
            const validation = {
              fields: {
                email: !validator.isEmail(value.email) ? 'Invalid email address' : value.email.length < 3 ? 'Email must be at least 3 characters' : value.email.length > 255 ? 'Email must be less than 255 characters' : undefined,
                password: !value.password ? 'Password is required' : value.password.length < 3 ? 'Password must be at least 3 characters' : value.password.length > 255 ? 'Password must be less than 255 characters' :  undefined,
              },
            }
            return validation
         }
        }
      })


    return (
      <AuthFormLayout>

  
        {
          isTwoFactor ? <TwoFactorForm /> :
          <form
          className="flex flex-col gap-6 p-6 w-[22.5rem] rounded-3xl glass-bg"
          onSubmit={(e)=> {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >

        <div className="relative flex w-full mb-2 flex-col gap-8">
       
            <div className="flex items-center  w-full justify-between">
              <div className="h-[2rem] w-auto relative overflow-hidden items-center justify-center flex">
                <img src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} alt="PGS iO Logo" className="h-full w-auto" />
              </div>

              <div className="h-[4rem] w-[4rem] rounded-full border border-border-600 relative overflow-hidden items-center justify-center flex dark:bg-text/5 bg-text/2">
                <img src={'/company-logo.png'} alt="PGS iO Logo" className="h-full w-[50%] object-contain invert-100 dark:invert-0" />
              </div>
            </div>

            <div className="flex-1 relative">
              <h2 className="text-2xl font-bold text-text/70"><span className="text-primary">Hello,</span> Welcome back!</h2> 
              <p className="text-sm mt-2 font-regular text-text/50">Please enter your details to login</p>
            </div>
        </div>

          <form.Field 
            name="email"
            children={(field) => (
              <InputField 
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />
          <form.Field 
            name="password"
            children={(field) => (
              <InputField 
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />

          <Link to={'/?form=forgot-password'} title={'Forgot Password'} className="hover:text-primary text-sm text-text/50 font-medium">Forgot Password?</Link>
  
          <Button isLoading={isLoading} type="submit" className="w-full" >Login to Maintex Pro</Button> 

          {/* <div className="block w-full relative">
            <p className="text-sm text-text/50 font-regular text-center">Forgot Password? </p>
          </div>
*/}
          {/* <hr className="w-full border-border" />  */}

          {/* <div className="w-full relative flex flex-col">
            <p className="text-sm text-text/50 font-medium text-center">Don't have an account? <Link to={'/?form=signup'} title={'Sign Up'} className="hover:text-primary text-text font-medium !underline">Sign Up!</Link></p>
          </div> */}




          {/* <div className="block w-full relative">
          <p className="text-xs text-text/50 font-light text-center">PGS iO Sandbox &copy; {new Date().getFullYear()}</p>
          </div>  */}
          </form>
        }
      </AuthFormLayout>

    )
}

function TwoFactorForm() {

  const router = useRouter()
  
  const form = useForm({
    defaultValues: {
      code: "",
    },
    validators: {
      onSubmit: ({ value }) => (value?.code?.length !== 6) ? 'Please enter your valid code' : undefined,
    },
    onSubmit: async ({value}) => {
      try {
        const res = await authClient.twoFactor.verifyTotp({
          code: value.code,
          trustDevice: true,
        }, {
          onSuccess: ({data}) => {
            router.update({
              context: {
                token: data.token,
                user: data.user,
                isAuthenticated: true,
              }
            })
            form.reset()
            router.navigate({to: '/app', replace: true})
            return true
          },
          onError: ({error}) => {
            console.log(error)
            toast.error(error.message)
            return false
          }
        })

        return true
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
      return true
    },
    onSubmitInvalid: ({error}) => {
      console.log(error)
      toast.error(error.message)
    }
  })

  return (
    <form
      className="flex flex-col gap-6 p-6 w-[22.5rem] rounded-3xl glass-bg"
      onSubmit={(e)=> {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="relative flex w-full mb-2 flex-col gap-8">
       
        <div className="flex-1 relative">
          <h2 className="text-2xl font-bold text-center"><span className="text-primary">Enter your,</span> 2FA Code</h2> 
          <p className="text-sm mt-2 font-medium text-text/60 text-center">Enter the 6 figure confirmation code shown on the Authentication Application:</p>
        </div>
        <div className="w-full relative flex items-center justify-center">
        <form.Field
          name="code"
          children={(field) => (
            <InputOTPPattern onChange={field.handleChange} value={field.state.value} isError={field.state.meta.errors.length > 0} onComplete={form.handleSubmit} />
          )}
        />
        </div>
      </div>
        
    </form>

  )
}