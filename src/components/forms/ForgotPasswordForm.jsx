import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import validator from 'validator';
import { InputField } from "../ui/FormComponent";
import { Link, useRouter } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { authClient } from "../../auth";

export default function ForgotPasswordForm() {
  
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        defaultValues: {
          email: "",
        },
        onSubmit: async ({value}) => {
          setIsLoading(true)
          try{
            await authClient.requestPasswordReset({
              email: value.email,
              redirectTo: '/auth/reset-password'
            }, {
              onSuccess: () => {
                toast.success('Password reset email sent!')
                router.navigate({ to: '/auth/login' })
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
          <div className="flex flex-col gap-1 ">
            <h2 className="text-3xl font-bold">Forgot <span className="text-primary">Password?</span></h2>
            <p className="text-base font-regular mt-1 text-text/50">Enter your email to reset your password</p>
          </div>

          <form.Field 
            name="email"
            validators={{
              onChange: ({ value }) => !validator.isEmail(value) ? 'Invalid email address' : value.length < 3 ? 'Email must be at least 3 characters' : value.length > 255 ? 'Email must be less than 255 characters' : undefined,
            }}
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