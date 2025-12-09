import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import DefaultFormModal from '@/components/ui/DefaultFormModal'
import { InputField, InputSelect } from '@/components/ui/FormComponent'
import { toast } from 'sonner'
import validator from 'validator'
import { atom, useAtom } from 'jotai'
import { MailPlus } from 'lucide-react'
import orbit from '@/api'

const inviteUserModalAtom = atom(false)

export const useInviteUserModal = () => {
  const [open, setOpen] = useAtom(inviteUserModalAtom)
  return { open, setOpen }
}

export default function InviteUserModal({ onRefetch }) {
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [model, setModel] = useAtom(inviteUserModalAtom)

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'hr', label: 'HR' },
    { value: 'manager', label: 'Manager' },
    { value: 'developer', label: 'Developer' },
    { value: 'employee', label: 'Employee' },
  ]

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
    onSubmit: async ({ value }) => {
      setIsFormLoading(true)
      try {
        const reqData = {
          name: value.name,
          email: value.email,
          role: value.role,
        }

        const res = await orbit.post({ url: `hr/invite/user`, data: reqData })
        if (!res?.status || res?.error) throw res

        console.log(res)

        toast.success('User invited successfully')
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
      title="Invite User"
      description="Invite a new user to the system."
      classNames={{
        content: "max-w-[20rem] w-[20rem] min-w-[20rem]"
      }}
      handleSubmit={form.handleSubmit}
      isLoading={isFormLoading}
      button={
        <Button variant='shade' onClick={() => setModel(true)}>
          <MailPlus />
          <span>Invite User</span>
        </Button>
      }
      submitButtonText="Invite"
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
            onChange: ({ value }) => value === "" ? 'Name is required' : undefined,
          }}
          children={(field) => (
            <InputField 
              label="Name" 
              name="name" 
              type="text" 
              placeholder="John Doe" 
              className="col-span-2"
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
              className="col-span-2"
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
              className="col-span-2"
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
      </form>
    </DefaultFormModal>
  )
}
