import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import FetchError from '../../../../../../../components/fetch/FetchError'
import FetchEmpty from '../../../../../../../components/fetch/FetchEmpty'
import { Activity } from 'react'
import RefetchLoader from '../../../../../../../components/fetch/RefetchLoader'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/companies',
)({
  component: RouteComponent,
})

function RouteComponent() {


  const {data, isLoading, isError, error, isFetched, refetch, isRefetching} = useQuery({
    queryKey: ['admin-settings-companies'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/settings/companies'})
        console.log('COMPANIES', res.data)
        return res?.data
      }catch(error){
        console.log(error)
        return null
      }
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
      <div className='relative w-full flex flex-col'>
        <DashboardBanner title={'Companies Management'} description={'Manage companies and details here.'}>
          <Button variant='shade'>
            <PlusCircleIcon />
            <span>Add New Company</span>
          </Button>
        </DashboardBanner>
        <div className='relative w-full flex flex-col'>
          <Activity mode={isRefetching ? 'visible' : 'hidden'}>
            <RefetchLoader key="refetch-loader" />
          </Activity>
          {
            data?.length > 0 ?
            <div className='relative w-full flex flex-col'>
            </div>
            :
            <FetchEmpty key="fetch-empty" />
          }
          {/* <CompaniesTable data={data} /> */}
        </div>
      </div>
    </Activity>
  )
}
