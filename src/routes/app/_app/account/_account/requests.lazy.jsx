import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@/components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { FilePlus2 } from 'lucide-react'

export const Route = createLazyFileRoute('/app/_app/account/_account/requests')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'My Requests'} description={'Manage your requests here.'} >
        <Button variant='shade'>
          <FilePlus2 />
          <span>New Request</span>
        </Button>
      </DashboardBanner>
    </div>
  )
}
