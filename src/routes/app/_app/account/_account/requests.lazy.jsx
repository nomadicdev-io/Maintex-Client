import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@/components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { FilePlus2 } from 'lucide-react'
import FetchEmpty from '../../../../../components/fetch/FetchEmpty'

export const Route = createLazyFileRoute('/app/_app/account/_account/requests')(
  {
    component: RouteComponent,  
    head: ()=> ({
      meta: [
        {
          title: "My Requests | Maintex Pro "
        } 
      ]
    })
  },
)

function RouteComponent() {
  return (
    <div className='relative w-full h-[calc(100vh-10rem)] flex flex-col'>
      <DashboardBanner title={'Manage Your Requests'} description={'Manage your requests here.'} >
        <Button variant='shade'>
          <FilePlus2 />
          <span>New Request</span>
        </Button>
      </DashboardBanner>

      <div className="relative w-full h-full flex-1 flex items-center justify-center">
       <FetchEmpty />
      </div>

    </div>
  )
}
