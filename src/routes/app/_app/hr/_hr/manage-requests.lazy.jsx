import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/manage-requests')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative w-full flex flex-col">
        <DashboardBanner title={'Manage Employee Request'} description={'Manage your employee request here.'} />
    </div>
  )
}
