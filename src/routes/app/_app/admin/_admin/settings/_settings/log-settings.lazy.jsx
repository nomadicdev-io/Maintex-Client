import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/log-settings',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Log Settings'} description={'Log settings for the application. You can change the log settings here.'} />
      <LogSettingsForm />
    </div>
  )
}

const LogSettingsForm = () => {
  return (
    <div className='relative w-full flex flex-col'>

      <DataField
        label="Log Level"
        description="Enter or change the log level of the application"
      />
      
      <DataField
        label="Maximum Log Size"
        description="Enter or change the maximum log size of the application"
      />

      <DataField
        label="Maximum Log Files"
        description="Enter or change the maximum log files of the application"
      />

    </div>
  )
}
