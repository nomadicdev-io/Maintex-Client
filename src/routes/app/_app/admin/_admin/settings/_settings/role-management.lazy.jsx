import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'


export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/role-management',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Role Management'} description={'Role management settings for the application. You can change the role management here.'} />
    </div>
  )
}
