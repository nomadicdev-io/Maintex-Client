import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@/components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'

export const Route = createLazyFileRoute(
  '/app/_app/development/_development/toolkit',
)({
  component: RouteComponent,
})  

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col h-full'>
      <DashboardBanner title={'Development Toolkit'} description={'Development toolkit for the application. You can change the development toolkit here.'} />

      <div className="relative w-full grid grid-cols-2 h-full">
        <div className="relative flex flex-col w-full h-full border-e border-border">
          <DataField
            label="2FA"
          />
          <DataField
            label="Passkey"
          />
        </div>
      </div>
    </div>
  )
}