import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/notes')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative w-full flex flex-col">
      <DashboardBanner title={'Notes & Checklists'} description={'Manage your notes here. Create, edit, and delete notes/checklists here.'} />
    </div>
  )
}
