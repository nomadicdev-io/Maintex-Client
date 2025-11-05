import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import { Activity } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Markdown from 'react-markdown'
import FetchError from '../../../../../../../components/fetch/FetchError'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/license',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const {data, isLoading, isError, error, isFetched} = useQuery({
    queryKey: ['admin-settings-license'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/settings/license'})
        console.log(res.data)
        return res.data
      }catch(error){
        console.log(error)
        return null
      }
    }
  })

  const downloadLicenseAgreement = () => {
    data?.download && window.open(import.meta.env.VITE_API_BASE_URL + data?.download, '_blank')
  }

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
        <div className='relative w-full flex flex-col'>
            <DashboardBanner title={'Software License Agreement'}>
                {/* {
                    data?.license ? (
                    <div className="relative flex gap-2">
                        <div className="text-sm font-semibold border border-border rounded-lg px-3 py-2 bg-text text-bg">{data?.license}</div>
                    </div>
                    ) : null
                } */}

                <Button onClick={downloadLicenseAgreement} variant="shade">
                  <Download size={14}/>
                  <span>Download License Agreement</span>
                </Button>
            </DashboardBanner>
            {
              data?.description ? (
                <div className="relative w-full flex flex-col p-6 text-box-wrapper border-b border-border">
                    <Markdown>{data?.description}</Markdown>
                </div>
              ) : null
            }

            {
              data?.signature ? (
                <div className="relative w-full flex flex-col p-6 border-b border-border text-box-wrapper">
                  <h2>{data?.signature?.title}</h2>
                  <p>{data?.signature?.description}</p>
                </div>
              ) : null
            }

            <div className="relative w-full grid grid-cols-2 border-b border-border">
                <div className="relative w-full block p-6 border-e border-e-border">
                    <div className="relative w-full flex flex-col mb-3">
                        <h2 className="text-xl font-medium text-text/75">Licensor: <strong className="text-text block">{data?.licensor?.name}</strong></h2>
                    </div>
                    <div className="relative w-full grid grid-cols-[1fr_3fr] border-b border-border py-3">
                        <label className="text-text/50">Name: </label>
                        <h3>{data?.licensor?.fullName}</h3>
                    </div>
                    <div className="relative w-full grid grid-cols-[1fr_3fr] border-b border-border py-3">
                        <label className="text-sm text-text/50">Title: </label>
                        <h3>{data?.licensor?.title}</h3>
                    </div>
                    <div className="relative w-full grid grid-cols-[1fr_3fr] border-b border-border py-3">
                        <label className="text-sm text-text/50">Date: </label>
                        <h3>{data?.licensor?.date}</h3>
                    </div>
                </div>
                <div className="relative w-full block p-6 border-e border-e-border">
                    <div className="relative w-full flex flex-col mb-3">
                        <h2 className="text-xl font-regular text-text/75">Licensee: <strong className="text-text block">{data?.licensee?.name}</strong></h2>
                    </div>
                    <div className="relative w-full grid grid-cols-[1fr_3fr] border-b border-border py-3">
                        <label className="text-sm text-text/50">Name: </label>
                        <h3>{data?.licensee?.fullName}</h3>
                    </div>
                    <div className="relative w-full grid grid-cols-[1fr_3fr] border-b border-border py-3">
                        <label className="text-sm text-text/50">Title: </label>
                        <h3>{data?.licensee?.title}</h3>
                    </div>
                    <div className="relative w-full grid grid-cols-[1fr_3fr] border-b border-border py-3">
                        <label className="text-sm text-text/50">Date: </label>
                        <h3>{data?.licensee?.date}</h3>
                    </div>
                </div>
            </div>
        </div>
    </Activity>
  )
}