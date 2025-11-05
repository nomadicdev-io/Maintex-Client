import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { useForm } from '@tanstack/react-form'
import DataField from '@/components/ui/DataField'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import { Activity } from 'react'

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
        console.log(res)
        return res
      }catch(error){
        console.log(error)
        return null
      }
    }
  })


  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
      <div className='relative w-full flex flex-col'>
        <DashboardBanner title={'General Settings'} description={'General settings for the application. You can change the settings here.'} />
        <div className='relative w-full flex flex-col'>
          <GeneralSettingsForm />
        </div>
      </div>
    </Activity>
  )
}


const GeneralSettingsForm = () => {

  const form = useForm({
    defaultValues: {

    }
  })

  return (
    <div className='relative w-full flex flex-col'>

      <DataField
        label="Name"
        description="Enter or change the name of the application"
      />

      <DataField
        label="Description"
        description="Enter or change the description of the application"
      />  

      <DataField
        label="Host"
        description="Enter or change the URL of the application"
      />

      <DataField
        label="Owner"
        description="Enter or change the owner of the application"
      />

      <DataField
        label="Email"
        description="Enter or change the email of the application"
      />

      <DataField
        label="Phone"
        description="Enter or change the phone of the application"
      />

      <DataField
        label="Address"
        description="Enter or change the address of the application"
      />

      <DataField
        label="Country"
        description="Enter or change the country of the application"
      />

    </div>
  )
}