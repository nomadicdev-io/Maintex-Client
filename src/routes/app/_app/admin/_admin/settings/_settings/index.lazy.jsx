import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { useForm } from '@tanstack/react-form'
import DataField from '@/components/ui/DataField'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import { Activity, useState } from 'react'
import { InputField, TextareaField, InputCountry } from '@/components/ui/FormComponent'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Lock } from 'lucide-react'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import FetchError from '../../../../../../../components/fetch/FetchError'
import { toast } from 'sonner'
import RefetchLoader from '../../../../../../../components/fetch/RefetchLoader'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const {data, isLoading, isError, error, isFetched, refetch, isRefetching} = useQuery({
    queryKey: ['admin-settings-general'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/settings/general'})
        console.log('SETTINGS GENERAL', res)
        return res?.data
      }catch(error){
        console.log('SETTINGS GENERAL ERROR', error)
        return {
          name: '',
          description: '',
          tagline: '',
          host: window.location.origin,
          owner: '',
          email: '',
          phone: '',
          address: '',
          country: '',
          website: '',
          licenseNumber: 'QB-2025-2TW6JS5B6WL4UYEUHB',
        }
      }
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
      <div className='relative w-full flex flex-col'>
        <DashboardBanner title={'General Settings'} description={'General settings for the application. You can change the settings here.'} />
        <div className='relative w-full flex flex-col'>
          <Activity mode={isRefetching ? 'visible' : 'hidden'}>
            <RefetchLoader key="refetch-loader" />
          </Activity>
          <GeneralSettingsForm data={data} onRefetch={refetch} />
        </div>
      </div>
    </Activity>
  )
}


const GeneralSettingsForm = ({data, onRefetch}) => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: data?.name || '',
      description: data?.description || '',
      tagline: data?.tagline || '',
      host: data?.host || window.location.origin,
      owner: data?.owner || '',
      email: data?.email || '',
      phone: data?.phone || '',
      address: data?.address || '',
      country: data?.country || '',
      website: data?.website || '',
      licenseNumber: data?.licenseNumber || '',
    },
    onSubmit: async ({value}) => {
      setIsLoading(true)
      try{
        const res = await orbit.post({url: 'admin/settings/general', data: value})
        if(!res.status) throw res
        console.log(res)
        toast.success('Settings updated successfully')
        onRefetch()
      }catch(error){
        console.log(error)
        toast.error(error.message || error.statusText || 'Something went wrong')
      }finally{
        setIsLoading(false)
      }
    }
  })

  return (
    <form 
    onSubmit={e=> {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }}
    className='relative w-full flex flex-col'>

      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) => value === "" ? 'Name is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Name"
            description="Enter or change the name of the application"
          >
            <InputField 
              name="name"
              placeholder="Enter the name of the application"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />
      
      <form.Field
        name="description"
        validators={{
          onChange: ({ value }) => value === "" ? 'Description is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Description"
            description="Enter or change the description of the application"
          >
            <TextareaField 
              name="description"
              placeholder="Enter the description of the application"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              classNames={{
                input: 'min-h-30',
              }}
            />
          </DataField>
        )}
      />

      <form.Field
        name="tagline"
        validators={{
          onChange: ({ value }) => value === "" ? 'Tagline is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Tagline"
            description="Enter or change the tagline of the application"
          >
            <InputField 
              name="tagline"
              placeholder="Enter the tagline of the application"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="host"
        validators={{
          onChange: ({ value }) => value === "" ? 'Host is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Host"
            description="Enter or change the URL of the application"
          >
            <InputField 
              name="host"
              placeholder="Enter the URL of the application"
              className="max-w-100"
              disabled={true}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              endContent={<Lock size={16} opacity={0.25}/>}
            />
          </DataField>
        )}
      />

      <form.Field
        name="owner"
        validators={{
          onChange: ({ value }) => value === "" ? 'Owner is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Owner"
            description="Application owner details"
          >
            <InputField 
              name="owner"
              placeholder="Enter the owner of the application"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => value === "" ? 'Email is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Email"
            description="Enter or change the email of the application"
          >
            <InputField 
              name="email"
              placeholder="Enter the email of the application"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="phone"
        validators={{
          onChange: ({ value }) => value === "" ? 'Phone is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Phone"
            description="Enter or change the phone of the application"
          >
            <InputField 
              name="phone"
              placeholder="Enter the phone of the application"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="address"
        validators={{
          onChange: ({ value }) => value === "" ? 'Address is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Address"
            description="Enter or change the address of the application"
          >
            <InputField 
              name="address"
              placeholder="Enter the address of the application"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />
      <form.Field
        name="country"
        validators={{
          onChange: ({ value }) => value === "" ? 'Country is required' : undefined,
        }}
        children={(field) => (
          <DataField
          label="Country"
          description="Enter or change the country of the application"
          >
            <InputCountry 
              placeholder="Choose country"
              name="country"
              value={field.state.value}
              options={data?.countries || []}
              onChange={(e) => field.handleChange(e)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              disabled={true}
              className="max-w-100"
            />
          </DataField>
        )}
      />

      <form.Field
        name="website"
        children={(field) => (
          <DataField
            label="Website"
            description="Enter or change the website of the application"
          >
            <InputField 
              name="website"
              placeholder="Enter the website of the application"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="licenseNumber"
        validators={{
          onChange: ({ value }) => value === "" ? 'License Number is required' : undefined,
        }}
        children={(field) => (
          <DataField
        label="License Number"
        description="Software license number"
        >
            <InputField 
              name="licenseNumber"
              placeholder="Enter the license number of the application"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              disabled={true}
              endContent={<Lock size={16} opacity={0.25}/>}
            />
          </DataField>
        )}
      />


      <div className='relative w-full flex gap-3 px-5 py-5 pb-8'>
        <Button type="button" variant="shade" onClick={()=> router.history?.back()}>
          <span>Cancel</span>
        </Button>
        <Button type="submit" isLoading={isLoading}>
          <CheckCircle2 />
          <span>Save Settings</span>
        </Button>
      </div>

    </form>
  )
}