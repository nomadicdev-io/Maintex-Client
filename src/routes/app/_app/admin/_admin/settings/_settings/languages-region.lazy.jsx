import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import FetchError from '../../../../../../../components/fetch/FetchError'
import { Activity, useState } from 'react'
import RouteLoader from '../../../../../../../components/loaders/RouteLoader'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { useForm } from '@tanstack/react-form'
import { InputField, InputSelect } from '@/components/ui/FormComponent'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/languages-region',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const {data, isLoading, isError, error, isFetched, refetch, isRefetching} = useQuery({
    queryKey: ['admin-settings-languages-region'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/settings/lang'})
        console.log('SETTINGS LANGUAGES & REGION', res)
        return res?.data
      }catch(error){
        console.log('SETTINGS GENERAL ERROR', error)
        return null
      }
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Languages & Region'} description={'Languages & region settings for the application. You can change the languages and region here.'} />
      <LanguageRegionForm data={data} onRefetch={refetch} />
      <Activity mode={isRefetching ? 'visible' : 'hidden'}>
        <RouteLoader key="refetch-loader" />
      </Activity>
    </div>
    </Activity>
  )
}

const LanguageRegionForm = ({data, onRefetch}) => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      languages: data?.languages || [],
      timezone: data?.timezone || '',
      region: data?.region || '',
      currency: data?.currency || '',
    },
    onSubmit: async ({value}) => {
      setIsLoading(true)
      try{
        const reqData = {
          languages: value.languages,
          timezone: value.timezone,
          region: value.region,
          currency: value.currency,
        }
        const res = await orbit.post({url: 'admin/settings/lang', data: reqData})
        if(!res.status) throw res
        console.log(res)
        toast.success('Languages & region updated successfully')
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
        name="languages"
        children={(field) => (
          <DataField
            label="Languages"
            description="Select preferred languages for the application"
          >
            <LanguagesList value={field.state.value} onChange={field.handleChange} />
          </DataField>
        )}
      />

      <form.Field
        name="timezone"
        validators={{
          onChange: ({ value }) => value === "" ? 'Timezone is required' : undefined,
        }}
        children={(field) => (
          <DataField
          label="Timezone"
          description="Select preferred timezone for the application"
          >
            <InputSelect 
              name="timezone" 
              placeholder="Select timezone" 
              value={field.state.value}
              onChange={(e) => field.handleChange(e)}
              options={data?.data?.timezone || []}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              customValue="label"
              customLabel="label"
              className="max-w-100"
            />
          </DataField>
        )}
      />

      <form.Field
        name="region"
        children={(field) => (
          <DataField
            label="Region"
            description="Select preferred region for the application"
          >
            <InputSelect 
              name="region" 
              placeholder="Select region" 
              options={data?.data?.countries || []}
              value={field.state.value}
              onChange={(e) => field.handleChange(e)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              customValue="iso"
              customLabel="name"
              className="max-w-100"
            />
          </DataField>
        )}
      />

      <form.Field
        name="currency"
        children={(field) => (
          <DataField
            label="Currency"
            description="Select preferred currency for the application"
          >
            <InputSelect 
              name="currency" 
              placeholder="Select currency" 
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e)}
              options={data?.data?.currencies || []}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              customValue="code"
              customLabel="name"
            />
          </DataField>
        )}
      />

      <div className='relative w-full flex gap-3 px-5 py-8'>
        <Button type="button" variant="shade" onClick={()=> router.history?.back()}>
          <span>Cancel</span>
        </Button>
        <Button type="submit" isLoading={isLoading}>
          <CheckCircle2 />
          <span>Update Languages & Region</span>
        </Button>
      </div>

    </form>
  )
}


function LanguagesList({value, onChange}) {

  const handleChange = (code) => {
    onChange(value.map((language) => language.value === code ? { ...language, enabled: !language.enabled } : language))
  }

  return (
    <div className='relative w-full grid grid-cols-3 gap-4'>
      {value.map((language) => (
        <div key={language.value} className='relative w-full flex items-center justify-start gap-2'>
          <Checkbox
            id={language.value}
            checked={language.enabled}
            onCheckedChange={() => handleChange(language.value)}
          />
          <Label htmlFor={language.value} className='text-base font-semibold cursor-pointer'>{language.label}</Label>
        </div>
      ))}
    </div>
  )
}