import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@/components/sections/DashboardBanner'

export const Route = createLazyFileRoute('/app/_app/account/_account/projects')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "My Projects & Workspaces | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'My Projects & Workspaces'} description={'Manage your projects here.'} />
    </div>
  )
}
