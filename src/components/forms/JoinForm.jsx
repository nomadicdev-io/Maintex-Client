import { motion } from "motion/react"
import AuthFormLayout from "../layouts/AuthFormLayout"
import { useForm } from "@tanstack/react-form"
import { useTheme } from "next-themes"

export default function JoinForm() {

    const {resolvedTheme} = useTheme()

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    return (
        <AuthFormLayout>

            <form
            className="flex flex-col gap-6 p-6 w-[40rem] rounded-3xl glass-bg"
            onSubmit={(e)=> {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
            >

                <div className="relative flex w-full mb-2 flex-col gap-5">
                    
                    <div className="flex items-center  w-full justify-between">
                        <div className="h-[2rem] w-auto relative overflow-hidden items-center justify-center flex">
                        <img src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} alt="Maintex Pro Logo" className="h-full w-auto" />
                        </div>

                        <div className="h-[4rem] w-[4rem] rounded-full border border-border-600 relative overflow-hidden items-center justify-center flex dark:bg-text/5 bg-text/2">
                        <img src={'/company-logo.png'} alt="Maintex Pro Logo" className="h-full w-[50%] object-contain invert-100 dark:invert-0" />
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <h2 className="text-3xl font-bold text-text/70"><span className="text-primary">Welcome to </span> Maintex Pro!</h2> 
                        <p className="text-sm mt-2 font-regular text-text/50">Your awesome account is just a few steps away. Fill the form to get started.</p>
                    </div>
                </div>

            </form>

        </AuthFormLayout>
    )
}
