import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@components/sections/DashboardBanner'

export const Route = createLazyFileRoute('/app/_app/admin/_admin/docs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full block '>
      <DashboardBanner title={'Open API Documentation'} description={'API documentation for the application. You can change the docs here.'}/>
    </div>

  )
}