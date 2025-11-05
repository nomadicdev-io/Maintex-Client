import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/languages-region',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Languages & Region'} description={'Languages & region settings for the application. You can change the languages and region here.'} />

      <LanguageRegionForm />
    </div>
  )
}

const LanguageRegionForm = () => {
  return (
    <div className='relative w-full flex flex-col'>
      <DataField
        label="Languages"
        description="Select preferred languages for the application"
      />

      <DataField
        label="Region"
        description="Select preferred region for the application"
      />

      <DataField
        label="Timezone"
        description="Select preferred timezone for the application"
      />

      <DataField
        label="Currency"
        description="Select preferred currency for the application"
      />
    </div>
  )
}
