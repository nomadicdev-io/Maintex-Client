import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/mobile-apps',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Mobile Applications'} description={'Mobile apps settings for the application. You can change the mobile apps here.'} />
    </div>
  )
}
