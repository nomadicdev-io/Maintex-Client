import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import validator from 'validator';
import { InputField } from "../ui/FormComponent";
import { Link, useRouter } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { authClient } from "../../auth";

export default function RestPasswordForm({token}) {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {resolvedTheme} = useTheme()

    const form = useForm({
        defaultValues: {
          password: "",
          confirmPassword: "",
        },
        onSubmit: async ({value}) => {
          setIsLoading(true)
          try{
            await authClient.resetPassword({
                newPassword: value.password,
                token: token,
            }, {
                onSuccess: () => {
                    toast.success('Password reset successfully!')
                    router.navigate({ to: '/' })
                },
                onError: ({error}) => {
                    console.log(error)
                    toast.error(error.message || error.statusText || 'Something went wrong')
                }
            })
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
                    password: value?.password?.length < 8 ? 'Password must be at least 8 characters' : value?.password?.length > 32 ? 'Password must be less than 32 characters' : !/[^a-zA-Z0-9]/.test(value?.password) ? 'Password must contain at least one special character' : !/[A-Z]/.test(value?.password) ? 'Password must contain at least one uppercase letter' : !/[a-z]/.test(value?.password) ? 'Password must contain at least one lowercase letter' : !/[0-9]/.test(value?.password) ? 'Password must contain at least one number' : undefined,

                },
              }
              return validation
           }
          }
      })

    return (
      <motion.form
      initial={{ opacity: 0, x: '50%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-50%' }}
      transition={{ duration: 0.3, type: 'tween' }}
        onSubmit={(e)=> {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex flex-col gap-6 w-[22.5rem] glass-bg p-6 rounded-3xl shadow-2xl shadow-bg-300 border border-border/70">

            <div className="flex items-center  w-full justify-between mt-2">
              <div className="h-[2.25rem] w-auto relative overflow-hidden items-center justify-center flex">
                <img src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} alt="PGS iO Logo" className="h-full w-auto" />
              </div>

              
            </div>

          <div className="flex flex-col gap-1  mt-4">
            <h2 className="text-2xl font-bold">Reset <span className="text-primary">Password</span></h2>
            <p className="text-base font-regular mt-1 text-text/50">Fill up the form to reset your password</p>
          </div>

          <form.Field 
            name="password"
            validators={{
              onChange: ({ value }) => !validator.isStrongPassword(value) ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character' : undefined,
            }}
            children={(field) => (
              <InputField 
                name="password"
                type="password"
                placeholder="New Password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />

<form.Field 
            name="confirmPassword"
            validators={{
              onChange: ({ value }) => value !== form.state.values.password ? 'Passwords do not match' : undefined,
            }}
            children={(field) => (
              <InputField 
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />
  

  <div className="flex items-center w-full flex-col justify-center relative gap-4">
          <Button isLoading={isLoading} type="submit" className="w-full" variant="dark" >Reset Password</Button> 
          <p className="text-sm text-text/50 font-medium text-center"> <Link to={'/'} title={'Login'} className="hover:text-primary text-text font-medium flex items-center gap-1 justify-center">Back to Login</Link></p>

          </div>

          <hr className="w-full border-border" />


          <div className="block w-full relative">
          <p className="text-xs text-text/50 font-light text-center">PGS iO – The Developer Sandbox &copy; {new Date().getFullYear()}</p>
          </div>
      </motion.form>
    )
}
