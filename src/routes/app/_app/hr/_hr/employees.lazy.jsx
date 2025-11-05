import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { MailPlus, Plus, Printer, UserPlus } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'


export const Route = createLazyFileRoute('/app/_app/hr/_hr/employees')({
  component: RouteComponent,
})

const categories = [
  {
    id: 'all',
    label: 'All',
  },
]


function RouteComponent() {
  return (
    <div className="relative w-full flex flex-col h-full">
      <DashboardBanner title={'Employees & User Management'} description={'Manage your employees here.'}>
        <div className="relative flex flex-row items-center gap-2">
          
          <Button variant="shade">
            <UserPlus />
            <span>Add Employee</span>
          </Button>
          <Button variant="shade">
            <MailPlus />
            <span>Invite User</span>
          </Button>
          <Button variant="default">
            <Printer/>
            <span>Generate Report</span>
          </Button>
        </div>
      </DashboardBanner>

      <div className="relative w-full grid grid-cols-[17.5rem_1fr] h-full flex-1">
        <div className="relative w-full h-full border-e border-border">

        </div>
        <ScrollArea className="relative w-full block h-full" scrollHideDelay={300}>

        </ScrollArea>

      </div>
    </div>
  )
}
