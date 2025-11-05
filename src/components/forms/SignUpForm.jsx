import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import validator from 'validator';
import { InputField } from "../ui/FormComponent";
import { motion } from "motion/react";
import { EmailVerification } from "./LoginForm";
import AuthFormLayout from "../layouts/AuthFormLayout";
import { Checkbox } from "@/components/ui/checkbox"
import { LucideArrowLeft } from "lucide-react";
import { authClient } from "../../auth";

export default function SignUpForm() {
    const navigate = useNavigate()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isVerify, setIsVerify] = useState(false)

    const form = useForm({
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          phoneCode: "",
          address: "",
          city: "",
          country: "",
          website: "",
          about: "",
          banner: "",
          image: "1b597ee2-5e21-4959-8f76-10829be55c0e",
        },
        onSubmit: async ({value}) => {
          setIsLoading(true)
          try{
            const body = value
            delete body.confirmPassword

            const res = await authClient.signUp.email({
              email: body.email,
              password: body.password,
              name: body.name,
            }, {
              onError: (error)=> {
                console.log('Error', error.error)
                toast.error(error.error.message)
              },
              onSuccess: ({data})=> {
                console.log('Success', data)
                if(data?.token) {
                  router.update({
                    context: {
                      token: data.token,
                      user: data.user,
                      isAuthenticated: true,
                    }
                  })
                  form.reset()
                  router.navigate({to: '/app', replace: true})
                  toast.success('Account created successfully!')
                }
                navigate({to: '/?form=verify-email'})
                toast.success('Verification email sent successfully!')
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
                email: !validator.isEmail(value.email) ? 'Invalid email address' : value?.email?.length < 3 ? 'Email must be at least 3 characters' : value?.email?.length > 255 ? 'Email must be less than 255 characters' : undefined,
                password: value?.password?.length < 8 ? 'Password must be at least 8 characters' : value?.password?.length > 32 ? 'Password must be less than 32 characters' : !/[^a-zA-Z0-9]/.test(value?.password) ? 'Password must contain at least one special character' : !/[A-Z]/.test(value?.password) ? 'Password must contain at least one uppercase letter' : !/[a-z]/.test(value?.password) ? 'Password must contain at least one lowercase letter' : !/[0-9]/.test(value?.password) ? 'Password must contain at least one number' : undefined,
                name: value?.name?.length < 3 ? 'Name must be at least 3 characters' : value?.name?.length > 255 ? 'Name must be less than 255 characters' : undefined,
              },
            }
            return validation
         }
        }
      })

    if(isVerify) return <EmailVerification />

    return (

      <AuthFormLayout>



        <form
          className="flex flex-col gap-6 p-6 w-[40rem] rounded-3xl shadow-2xl glass-bg"
          onSubmit={(e)=> {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
        <div className="flex flex-col gap-1 flex-1 border-b border-border/75 pb-6">
          <h2 className="text-3xl font-bold">Let's <span className="text-primary ">Create</span> your <span className="text-secondary">Account</span></h2>
          <p className="text-base font-light mt-1 text-text/60">Your awesome account is just a few steps away. Fill the form to get started.</p>
        </div>



          <div className="relative grid grid-cols-2 gap-6">
          <form.Field 
            name="name"
            children={(field) => (
              <InputField 
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
              
            )}
          />
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
           <form.Field 
            name="confirmPassword"
            validators={{
              onChange: ({value})=> value !== form.state.values.password ? 'Passwords do not match' : undefined
            }}
            children={(field) => (
              <InputField 
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />
          </div>
          

          <div className="flex w-full flex-col gap-5 border-t border-border/75 pt-6">
            <div className="flex w-full items-center justify-between gap-5">
              <div className="w-full flex gap-3 relative">
                <Checkbox id="terms"/>
                <label htmlFor="terms" className="text-base flex-1 text-text/50 font-light cursor-pointer">I agree to the <Link to={'/'} title={'Terms of Service'} className="hover:text-primary text-text font-regular">Terms of Service</Link></label>
              </div>

             
             </div>
            
            <div className="flex w-full items-center justify-between gap-5 mt-3">
            <Button isLoading={isLoading} type="button" variant="outline" onClick={()=> navigate({to: '/', params: {form: 'login'}})} ><LucideArrowLeft /> Back to Login</Button> 

            <Button isLoading={isLoading} type="submit" >Create Account</Button> 

            </div>
          </div>

        </form>
      </AuthFormLayout>

    )
}