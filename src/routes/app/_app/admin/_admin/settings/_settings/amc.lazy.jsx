import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { useTranslation } from 'react-i18next'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/amc',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const {t} = useTranslation()
  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={t('amc-amc')} description={t('amc-details-description')} />
    </div>
  )
}
