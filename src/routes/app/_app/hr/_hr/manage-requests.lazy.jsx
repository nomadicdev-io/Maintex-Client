import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'
import FetchEmpty from '../../../../../components/fetch/FetchEmpty'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/manage-requests')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Manage Employee Requests | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return (
    <div className="relative w-full h-[calc(100vh-10rem)] flex flex-col">
        <DashboardBanner title={'Manage Employee Request'} description={'Manage your employee request here.'} />
          <div className="relative w-full h-full flex-1 flex items-center justify-center">
        <FetchEmpty />
        </div>
    </div>
  )
}
