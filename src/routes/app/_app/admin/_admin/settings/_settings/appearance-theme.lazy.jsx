import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/appearance-theme',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Appearance & Theme'} description={'Appearance & theme settings for the application. You can change the appearance and theme here.'} />
      <AppearanceThemeForm />
    </div>
  )
}

const AppearanceThemeForm = () => {
  return (
    <div className='relative w-full flex flex-col'>
      <DataField
        label="Theme"
        description="Select preferred theme for the application"
      />

      <DataField
        label="Brand Logo"
        description="Upload or Change the brand logo of the application"
      />

      <DataField
        label="Brand Icon"
        description="Upload or Change the brand icon of the application"
      />
      
    </div>
  )
}
