import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/drive',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Drive Settings'} description={'Drive settings for the application. You can change the drive settings here.'} />
    </div>
  )
}
