import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'
import FetchEmpty from '../../../../../components/fetch/FetchEmpty'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/leave-management')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative w-full h-[calc(100vh-10rem)] lflex flex-col">
      <DashboardBanner title={'Leave Management'} description={'Manage your leave requests here.'} />
      <div className="relative w-full h-full flex-1 flex items-center justify-center">
        <FetchEmpty />
      </div>
    </div>
  )
}
