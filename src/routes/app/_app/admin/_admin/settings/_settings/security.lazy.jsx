import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/security',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Security Settings'} description={'Security & keys settings for the application. You can change the security and keys here.'} />
      <SecuritySettingsForm />
    </div>
  )
}

const SecuritySettingsForm = () => {
  return (
    <div className='relative w-full flex flex-col'>
      <DataField
        label="CORS Allowed Origins"
        description="Enter or change the CORS allowed origins of the application"
      />

      <DataField
        label="2FA Enabled"
        description="Enter or change the 2FA enabled of the application"
      />

      <DataField
        label="Passkey Enabled"
        description="Enter or change the passkey enabled of the application"
      />

      <DataField
        label="Password Reset Enabled"
        description="Enter or change the CORS max age of the application"
      />

      <DataField
        label="Password Reset Token Expiry"
        description="Enter or change the password reset token expiry of the application"
      />

      <DataField
        label="Email Signup Enabled"
        description="Enter or change the email signup enabled of the application"
      />

      <DataField
        label="Email Signup Token Expiry"
        description="Enter or change the email signup token expiry of the application"
      />

    </div>
  )
}
