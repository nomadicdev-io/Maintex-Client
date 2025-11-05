import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'  

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/payments-billing',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Payments & Billing'} description={'Payments & billing settings for the application. You can change the payments and billing here.'} />
    </div>
  )
}
