import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@components/sections/DashboardBanner'

export const Route = createLazyFileRoute('/app/_app/admin/_admin/api-keys')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'API Keys Management'} description={'API keys settings for the application. You can change the API keys here.'} />
    </div>
  )
}
