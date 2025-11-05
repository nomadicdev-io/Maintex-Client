import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'
import { Switch } from "@/components/ui/switch"

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/notifications',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Notifications'} description={'Notifications settings for the application. You can change the notifications here.'} />
      <NotificationsSettingsForm />
    </div>
  )
}

const NotificationsSettingsForm = () => {
  return (
    <div className='relative w-full flex flex-col'>
      <DataField
        label="Email Notifications Enabled"
        description="Enter or change the notifications enabled of the application"
      >
        <Switch />
      </DataField>

      <DataField
        label="Push Notifications Enabled" 
        description="Enter or change the notifications push enabled of the application"
      >
        <Switch />
      </DataField>

      <DataField
        label="SMS Notifications Enabled"
        description="Enter or change the notifications SMS enabled of the application"
      >
        <Switch />
      </DataField>
    </div>
  )
}
