import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/attendance')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative w-full flex flex-col">
      <DashboardBanner title={'Attendance'} description={'Manage your attendance here.'} />
    </div>
  )
}
