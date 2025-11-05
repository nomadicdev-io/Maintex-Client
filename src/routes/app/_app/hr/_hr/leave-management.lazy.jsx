import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/leave-management')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative w-full flex flex-col">
      <DashboardBanner title={'Leave Management'} description={'Manage your leave requests here.'} />
    </div>
  )
}
