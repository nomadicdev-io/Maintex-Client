import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import DefaultFormModal from '@/components/ui/DefaultFormModal'
import { InputField, InputSelect } from '@/components/ui/FormComponent'
import { toast } from 'sonner'
import validator from 'validator'
import { atom, useAtom } from 'jotai'
import { UserPlus } from 'lucide-react'
import orbit from '@/api'
import jobTitles from '@/store/jobTitles.json'

const createUserModalAtom = atom(false)

export const useCreateUserModal = () => {
  const [open, setOpen] = useAtom(createUserModalAtom)
  return { open, setOpen }
}

export default function CreateUserModal({ onRefetch }) {
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [model, setModel] = useAtom(createUserModalAtom)

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'hr', label: 'HR' },
    { value: 'manager', label: 'Manager' },
    { value: 'developer', label: 'Developer' },
    { value: 'employee', label: 'Employee' },
  ]

  const designationOptions = jobTitles.map(title => ({
    value: title,
    label: title,
  }))

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      designation: "",
    },
    onSubmit: async ({ value }) => {
      setIsFormLoading(true)
      try {
        const reqData = {
          name: value.name,
          email: value.email,
          role: value.role,
          password: value.password,
          designation: value.designation,
        }

        const res = await orbit.post({ url: `admin/users/create`, data: reqData })
        if (!res?.status || res?.error) throw res
        toast.success('Employee created successfully')
        form.reset()
        setModel(false)
        if (onRefetch) onRefetch()
      } catch (error) {
        console.log(error)
        toast.error(error.message || error.statusText || 'Something went wrong')
      } finally {
        setIsFormLoading(false)
      }
    }
  })

  return (
    <DefaultFormModal 
      modalForm={form}
      onOpenChange={setModel}
      open={model}
      onClose={() => setModel(false)}
      title="Add Employee"
      description="Create a new employee account in the system."
      classNames={{
        content: "max-w-[35rem] w-[35rem] min-w-[35rem]"
      }}
      handleSubmit={form.handleSubmit}
      isLoading={isFormLoading}
      button={
        <Button variant='shade' onClick={() => setModel(true)}>
          <UserPlus />
          <span>Add Employee</span>
        </Button>
      }
      submitButtonText="Create"
    >
      <form 
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }} 
        className="relative w-full grid grid-cols-2 gap-y-6 gap-x-5 p-5"
        autoComplete="off"
        noValidate
      >
        <form.Field 
          name="name" 
          validators={{
            onChange: ({ value }) => value === "" ? 'Name is required' : value?.length < 3 ? 'Name must be at least 3 characters' : undefined,
          }}
          children={(field) => (
            <InputField 
              label="Name" 
              name="name" 
              type="text" 
              placeholder="John Doe" 
              autoComplete="name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          )} 
        />
        <form.Field 
          name="email" 
          validators={{
            onChange: ({ value }) => value === "" ? 'Email is required' : !validator.isEmail(value) ? 'Invalid email address' : undefined,
          }}
          children={(field) => (
            <InputField 
              label="Email" 
              name="email" 
              type="email" 
              placeholder="example@company.com" 
              autoComplete="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          )} 
        />
        <form.Field 
          name="role" 
          validators={{
            onChange: ({ value }) => value === "" ? 'Role is required' : undefined,
          }}
          children={(field) => (
            <InputSelect 
              label="Role" 
              name="role" 
              placeholder="Select a role" 
              value={field.state.value}
              onChange={field.handleChange}
              options={roleOptions}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              customValue="value"
              customLabel="label"
            />
          )} 
        />
        <form.Field 
          name="password" 
          validators={{
            onChange: ({ value }) => {
              if (value === "") return 'Password is required'
              if (value?.length < 8) return 'Password must be at least 8 characters'
              if (value?.length > 32) return 'Password must be less than 32 characters'
              if (!/[^a-zA-Z0-9]/.test(value)) return 'Password must contain at least one special character'
              if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter'
              if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter'
              if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
              return undefined
            },
          }}
          children={(field) => (
            <InputField 
              label="Password" 
              name="password" 
              type="password" 
              placeholder="Enter password" 
              autoComplete="new-password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
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
              label="Confirm Password" 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirm password" 
              autoComplete="new-password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          )} 
        />
        <form.Field 
          name="designation" 
          validators={{
            onChange: ({ value }) => value === "" ? 'Designation is required' : undefined,
          }}
          children={(field) => (
            <InputSelect 
              label="Designation" 
              name="designation" 
              placeholder="Select designation" 
              value={field.state.value}
              onChange={field.handleChange}
              options={designationOptions}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              customValue="value"
              customLabel="label"
            />
          )} 
        />
      </form>
    </DefaultFormModal>
  )
}
