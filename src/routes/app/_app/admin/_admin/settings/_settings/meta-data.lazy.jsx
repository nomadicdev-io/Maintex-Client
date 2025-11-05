import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/meta-data',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Meta Data'} description={'Meta data settings for the application. You can change the meta data here.'} />
      <MetaDataForm />
    </div>
  )
}

const MetaDataForm = () => {
  return (
    <div className='relative w-full flex flex-col'>
      <DataField
        label="Title"
        description="Enter or change the meta title of the application"
      />

      <DataField
        label="Description"
        description="Enter or change the meta description of the application"
      />

      <DataField
        label="Keywords"
        description="Enter or change the meta keywords of the application"
      />

      <DataField
        label="Author"
        description="Enter or change the meta author of the application"
      />

      <DataField
        label="Creator"
        description="Enter or change the meta creator of the application"
      />

      <DataField
        label="Publisher"
        description="Enter or change the meta publisher of the application"
      />

      <DataField
        label="Category"
        description="Enter or change the meta category of the application"
      />

      <DataField
        label="Canonical"
        description="Enter or change the meta canonical of the application"
      />

      <DataField
        label="OG Image"
        description="Enter or change the meta image of the application"
      />

      <DataField
        label="OG Image Width"
        description="Enter or change the meta image width of the application"
      />

      <DataField
        label="OG Image Height"
        description="Enter or change the meta image height of the application"
      />

      <DataField
        label="OG Image Alt"
        description="Enter or change the meta image alt of the application"
      />

      <DataField
        label="OG Site Name"
        description="Enter or change the meta site name of the application"
      />

      <DataField
        label="OG Locale"
        description="Enter or change the meta locale of the application"
      />  

      <DataField
        label="Twitter Card"
        description="Enter or change the meta twitter card of the application"
      />

      <DataField
        label="Twitter Site"
        description="Enter or change the meta twitter site of the application"
      />

      <DataField
        label="Twitter Title"
        description="Enter or change the meta twitter title of the application"
      />

      <DataField
        label="Twitter Description"
        description="Enter or change the meta twitter description of the application"
      />

      <DataField
        label="Twitter Image"
        description="Enter or change the meta twitter image of the application"
      />

      <DataField
        label="Twitter Image Alt"
        description="Enter or change the meta twitter image alt of the application"
      />

      <DataField
        label="Twitter Image Width"
        description="Enter or change the meta twitter image width of the application"
      />

      <DataField
        label="Twitter Image Height"
        description="Enter or change the meta twitter image height of the application"
      />

      <DataField
        label="Twitter Image Alt"
        description="Enter or change the meta twitter image alt of the application"
      />
    </div>
  )
}
