import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { ArrowUpNarrowWide, FolderOpen, TicketPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import AdminTicketsTable from '../../../../../../../components/tables/AdminTicketsTable'
import RouteLoader from '../../../../../../../components/loaders/RouteLoader'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/help-support',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const [isFormLoading, setIsFormLoading] = useState(false)
  const {t} = useTranslation()
  const [model, setModel] = useState(false)

  const categoryOptions = [
    {
      label: t('general'),
      value: "general",
    },
    {
      label: t('technical'),
      value: "technical",
    },
    {
      label: t('sales'),
      value: "sales",
    },
    {
      label: t('marketing'),
      value: "marketing",
    },
    {
      label: t('accounting'),
      value: "accounting",
    },
    {
      label: t('development'),
      value: "development",
    },
    {
      label: t('enquiry'),
      value: "enquiry",
    },
    {
      label: t('other'),
      value: "other",
    },
  ]
  
  const priorityOptions = [
    {
      label: t('low'),
      value: "low",
    },
    {
      label: t('medium'),
      value: "medium",
    },
    {
      label: t('high'),
      value: "high",
    },
    {
      label: t('critical'),
      value: "critical",
    },
  ]

  const {data, isLoading, isError, error, isFetched, refetch, isRefetching} = useQuery({
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
      status: "new",
      attachments: [],
    },
    onSubmit: async ({value}) => {
      console.log(value)
      setIsFormLoading(true)
      try{
        const res = await orbit.post({url: 'admin/settings/help', data: value})
        console.log(res)
        if(res?.error) throw res
        toast.success(t('ticket-created-successfully'))
        form.reset()
        setModel(false)
        refetch()
      }catch(error){
        console.log(error)
        toast.error(error.message || error.statusText || t('something-went-wrong'))
      }finally{
        setIsFormLoading(false)
      }
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
      <div className='relative w-full flex flex-col mb-8'>
        <DashboardBanner title={t('help-support')} description={t('help-support-description')}>
          <DefaultFormModal 
            open={model}
            onOpenChange={setModel}
            onClose={() => setModel(false)}
            title={t('create-new-ticket')}
            description={t('complete-the-form-to-create-a-new-ticket')}
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
                }} className="relative w-full grid grid-cols-2 gap-y-6 gap-x-5 p-5">
                  <form.Field 
                    name="subject" 
                    validators={{
                      onChange: ({ value }) => value === "" ? t('subject-is-required') : undefined,
                    }}
                    children={(field) => (
                      <InputField 
                        label={t('subject')} 
                        name="subject" 
                        type="text" 
                        placeholder={t('enter-the-subject-of-the-ticket')} 
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
                      onChange: ({ value }) => value === "" ? t('description-is-required') : undefined,
                    }}
                    children={(field) => (
                      <TextareaField 
                        label={t('description')} 
                        name="description" 
                        className="col-span-2"
                        placeholder={t('enter-the-description-of-the-ticket')}
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
                      onChange: ({ value }) => value === "" ? t('category-is-required') : undefined,
                    }}
                    children={(field) => (
                        <InputSelect 
                          label={t('category')} 
                          name="category" 
                          placeholder={t('select-category')} 
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e)}
                          options={categoryOptions}
                          error={field?.state?.meta?.errors?.join(', ')}
                          isError={field?.state?.meta?.errors?.length > 0}
                          startContent={<FolderOpen size={16} opacity={0.5} />}
                        />
                    )} 
                  />
                  </div>

                  <div className="relative w-full block">
                  <form.Field 
                    name="priority" 
                    validators={{
                      onChange: ({ value }) => value === "" ? t('priority-is-required') : undefined,
                    }}
                    children={(field) => (
                      <InputSelect 
                        label={t('priority')} 
                        name="priority" 
                        placeholder={t('select-priority')} 
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e)}
                        options={priorityOptions}
                        error={field?.state?.meta?.errors?.join(', ')}
                        isError={field?.state?.meta?.errors?.length > 0}
                        startContent={<ArrowUpNarrowWide size={16} opacity={0.5} />}
                      />

                    )} 
                  />
                  </div>

                  <form.Field 
                    name="attachments" 
                    children={(field) => (
                      <AttachmentUploader 
                      className="col-span-2" 
                      name={t('attachments')} 
                      label={t('attachments')}
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
              <Button variant='shade' onClick={() => setModel(true)}>
                <TicketPlus />
                <span>{t('create-ticket')}</span>
              </Button>
            }
            submitButtonText={t('create')}
          />
        </DashboardBanner>

        <div className='relative w-full flex flex-col p-6'>
          {
            data?.length > 0 ? 
            <AdminTicketsTable data={data} />
            : 
            <FetchEmpty key="fetch-empty" />
          }
        </div>

        <Activity mode={isRefetching ? 'visible' : 'hidden'}>
          <RouteLoader key="refetch-loader" />
        </Activity>
      </div>
    </Activity>
  )
}

