import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@/components/sections/DashboardBanner'

export const Route = createLazyFileRoute('/app/_app/account/_account/drive')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Personal Space & Cloud Storage'} description={'Storage settings for the application. You can change the storage settings here.'} />
    </div>
  )
}
