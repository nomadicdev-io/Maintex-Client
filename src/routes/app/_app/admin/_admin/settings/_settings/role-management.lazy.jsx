import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import FetchError from '../../../../../../../components/fetch/FetchError'
import RouteLoader from '../../../../../../../components/loaders/RouteLoader'
import { Activity } from 'react'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import DefaultFormModal from '../../../../../../../components/ui/DefaultFormModal'
import { InputField, TextareaField, AttachmentUploader } from '@/components/ui/FormComponent'
import { toast } from 'sonner'
import validator from 'validator'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { PlusCircleIcon } from 'lucide-react'
import { Button } from '../../../../../../../components/ui/Button'
import { useTranslation } from 'react-i18next'
import FetchEmpty from '../../../../../../../components/fetch/FetchEmpty'
import AdminRolesTables from '../../../../../../../components/tables/AdminRolesTables'

const modelAtom = atom(false)
const selectedAtom = atom(null)

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/role-management',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const {data, isLoading, isError, error, isFetched, refetch, isRefetching} = useQuery({
    queryKey: ['admin-settings-role-management'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/settings/roles'})
        console.log('ROLE MANAGEMENT', res.data)
        return res?.data
      }catch(error){
        console.log(error)
        return null
      }
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
      <div className='relative w-full flex flex-col [view-transition-name:main-content]'>
        <DashboardBanner title={'Role Management'} description={'Role management settings for the application. You can change the role management here.'} >
          <RoleManagementModalForm onRefetch={refetch} />
        </DashboardBanner>

        {
            data?.length > 0 ?
            <div className="w-full p-5 flex flex-col">
              <AdminRolesTables data={data} onRefetch={refetch} />
            </div>
            :
            <FetchEmpty key="fetch-empty" />
          }
      </div>
      <Activity mode={isRefetching ? 'visible' : 'hidden'}>
        <RouteLoader key="refetch-loader" />
      </Activity>
    </Activity>
  )
}


function RoleManagementModalForm({onRefetch}) {

  const [isFormLoading, setIsFormLoading] = useState(false)
  const [model, setModel] = useAtom(modelAtom)
  const selected = useAtomValue(selectedAtom)
  const {t} = useTranslation()

  const form = useForm({
    defaultValues: {
      name: selected?.name || "",
      value: selected?.value || "",
      description: selected?.description || "",
    },
    onSubmit: async ({value}) => {
      setIsFormLoading(true)
      try{
        const reqData = {
          name: value.name,
          value: value.value,
          description: value.description, 
        }

        let res = null
        if(selected){
          res = await orbit.post({url: `admin/settings/roles/update/${selected._id}`, data: {...reqData, _id: selected._id}})
        }else{
          res = await orbit.post({url: 'admin/settings/roles', data: reqData})
        }
        if(!res?.status || res?.error) throw res
        toast.success('Role added successfully')
        form.reset()
        setModel(false)
        onRefetch()
      }catch(error){
        console.log(error)
        toast.error(error.message || error.statusText || 'Something went wrong')
      }
      finally{
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
      title={selected ? t('update-role-details') : t('add-new-role')}
      description={selected ? t('update-role-details-description') : t('add-new-role-description')}
      classNames={{
        content: "max-w-[32.5rem] min-w-[32.5rem]"
      }}
      handleSubmit={form.handleSubmit}
      isLoading={isFormLoading}
      button={
        <Button variant='shade' onClick={() => setModel(true)}>
          <PlusCircleIcon />
          <span>{t('add-new-role')}</span>
        </Button>
      }
      submitButtonText={selected ? t('update') : t('create')}
    >
          <form 
            onSubmit={e=> {
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
                onChange: ({ value }) => value === "" ? t('role-name-is-required') : undefined,
              }}
              children={(field) => (
                <InputField 
                  label={t('role-name')} 
                  name="name" 
                  type="text" 
                  placeholder={t('role-name')} 
                  className="col-span-1"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field?.state?.meta?.errors?.join(', ')}
                  isError={field?.state?.meta?.errors?.length > 0}
                />
              )} 
            />
            <form.Field 
              name="value" 
              validators={{
                onChange: ({ value }) => value === "" ? t('role-value-is-required') : undefined,
              }}
              children={(field) => (
                <InputField 
                  label={t('role-value')} 
                  name="value" 
                  placeholder={t('role-value')} 
                  className="col-span-1"
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
                onChange: ({ value }) => {
                  if (value === "") return t('role-description-is-required');
                  return undefined;
                },
              }}
              children={(field) => (
                <InputField 
                  label={t('role-description')} 
                  name="description" 
                  type="text" 
                  placeholder={t('role-description')} 
                  className="col-span-2"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field?.state?.meta?.errors?.join(', ')}
                  isError={field?.state?.meta?.errors?.length > 0}
                />
              )} 
            />

          </form>
        
    </DefaultFormModal>
  )
}
