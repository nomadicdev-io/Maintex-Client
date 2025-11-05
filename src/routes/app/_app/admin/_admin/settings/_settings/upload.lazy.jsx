import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/upload',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Upload Settings'} description={'Upload settings for the application. You can change the upload settings here.'} />
    </div>
  )
}
