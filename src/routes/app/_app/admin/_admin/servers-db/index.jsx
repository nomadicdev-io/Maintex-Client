import { createFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@components/sections/DashboardBanner'
import { Button } from '@components/ui/button'
import { GitPullRequestCreate } from 'lucide-react'

export const Route = createFileRoute('/app/_app/admin/_admin/servers-db/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Servers & Databases'} description={'Server settings for the application. You can change the server here.'}>
        <div className="relative flex flex-row items-center gap-2">
          <Button variant='shade'>
            <GitPullRequestCreate />
            <span>Connect New Server</span>
          </Button>
        </div>
      </DashboardBanner>
    </div>
  )
}
