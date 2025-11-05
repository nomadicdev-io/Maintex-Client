import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { TicketPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DefaultFormModal from '../../../../../../../components/ui/DefaultFormModal'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import FetchError from '../../../../../../../components/fetch/FetchError'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import FetchEmpty from '../../../../../../../components/fetch/FetchEmpty'
import { Activity, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { InputField, TextareaField, InputSelect, AttachmentUploader } from '@/components/ui/FormComponent'
import { ScrollArea } from "@/components/ui/scroll-area"

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/help-support',
)({
  component: RouteComponent,
})

const categoryOptions = [
  {
    label: "General",
    value: "general",
  },
  {
    label: "Technical",
    value: "technical",
  },
  {
    label: "Sales",
    value: "sales",
  },
  {
    label: "Marketing",
    value: "marketing",
  },
  {
    label: "Accounting",
    value: "accounting",
  },
  {
    label: "Development",
    value: "development",
  },
  {
    label: "Enquiry",
    value: "enquiry",
  },
  {
    label: "Other",
    value: "other",
  },
]

const priorityOptions = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Critical",
    value: "critical",
  },
]

function RouteComponent() {

  const {session} = Route.useRouteContext()
  const [isFormLoading, setIsFormLoading] = useState(false)

  const {data, isLoading, isError, error, isFetched} = useQuery({
    queryKey: ['admin-settings-help-support'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/settings/help'})
        console.log(res.data)
        return res.data
      }catch(error){
        console.log(error)
        return null
      }
    }
  })

  const form = useForm({
    defaultValues: {
      subject: "",
      description: "",
      category: "",
      priority: "",
      user: session?.userId,
      status: "new",
      attachments: [],
    },
    onSubmit: async ({value}) => {
      console.log(value)
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
      <div className='relative w-full flex flex-col'>
        <DashboardBanner title={'Help & Support'} description={'Help & support settings for the application. You can help the users here.'}>
          <DefaultFormModal 
            modalForm={form}
            title='Create New Ticket'
            description='Complete the form to create a new ticket.'
            classNames={{
              content: "max-w-[30rem] min-w-[30rem]"
            }}
            handleSubmit={form.handleSubmit}
            isLoading={isFormLoading}
            children={
              <ScrollArea className="max-h-[67.5dvh] w-full">
                <form onSubmit={e=> {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }} className="relative w-full grid grid-cols-2 gap-y-7 gap-x-6 p-5">
                  <form.Field 
                    name="subject" 
                    validators={{
                      onChange: ({ value }) => value === "" ? 'Subject is required' : undefined,
                    }}
                    children={(field) => (
                      <InputField 
                        label="Subject" 
                        name="subject" 
                        type="text" 
                        placeholder="Enter the subject of the ticket" 
                        className="col-span-2"
                        autoFocus={true}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field?.state?.meta?.errors?.join(', ')}
                        isError={field?.state?.meta?.errors?.length > 0}
                      />
                    )} 
                  />
                  <form.Field 
                    name="description" 
                    validators={{
                      onChange: ({ value }) => value === "" ? 'Description is required' : undefined,
                    }}
                    children={(field) => (
                      <TextareaField 
                        label="Description" 
                        name="description" 
                        className="col-span-2"
                        placeholder="Enter the description of the ticket"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field?.state?.meta?.errors?.join(', ')}
                        isError={field?.state?.meta?.errors?.length > 0}
                      />
                      
                    )} 
                  />
                  <div className="relative w-full block">
                  <form.Field 
                    name="category" 
                    validators={{
                      onChange: ({ value }) => value === "" ? 'Category is required' : undefined,
                    }}
                    children={(field) => (
                        <InputSelect 
                          label="Category" 
                          name="category" 
                          placeholder="Select category" 
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e)}
                          options={categoryOptions}
                          error={field?.state?.meta?.errors?.join(', ')}
                          isError={field?.state?.meta?.errors?.length > 0}
                        />
                    )} 
                  />
                  </div>

                  <div className="relative w-full block">
                  <form.Field 
                    name="priority" 
                    validators={{
                      onChange: ({ value }) => value === "" ? 'Priority is required' : undefined,
                    }}
                    children={(field) => (
                      <InputSelect 
                        label="Priority" 
                        name="priority" 
                        placeholder="Select priority" 
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e)}
                        options={priorityOptions}
                        error={field?.state?.meta?.errors?.join(', ')}
                        isError={field?.state?.meta?.errors?.length > 0}
                      />

                    )} 
                  />
                  </div>

                  <form.Field 
                    name="attachments" 
                    children={(field) => (
                      <AttachmentUploader 
                      className="col-span-2" 
                      name="attachments" 
                      value={field.state.value} 
                      onChange={field.handleChange} 
                      error={field?.state?.meta?.errors?.join(', ')} 
                      isError={field?.state?.meta?.errors?.length > 0} 
                      maxFileSize={1024 * 1024 * 5}
                      accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      />
                    )} 
                  />

                </form>
              </ScrollArea>
              
            }
            button={
              <Button variant='shade'>
                <TicketPlus />
                <span>Create Ticket</span>
              </Button>
            }
            submitButtonText='Create'
          />
        </DashboardBanner>

        <div className='relative w-full flex flex-col p-6'>
          {
            data?.length > 0 ? 
            <div className='relative w-full flex flex-col'>
              
            </div>
            : 
            <FetchEmpty key="fetch-empty" />
          }
        </div>
      </div>
    </Activity>
  )
}
