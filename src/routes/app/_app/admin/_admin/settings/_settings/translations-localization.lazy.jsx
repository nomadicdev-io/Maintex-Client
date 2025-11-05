import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/translations-localization',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Translations & Localization'} description={'Translations & localization settings for the application. You can change the translations and localization here.'} />
    </div>
  )
}
