import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import { Activity } from 'react'
import { useTheme } from 'next-themes'
import Markdown from 'react-markdown'
import { Badge } from '@/components/ui/badge'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/about',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const {resolvedTheme} = useTheme()

  const {data, isLoading, isError, error, isFetched} = useQuery({
    queryKey: ['admin-settings-about'],
    enabled: true,
    staleTime: Infinity,
    queryFn: async () => {
      const res = await orbit.get({url: 'admin/settings/about'})
      console.log(res.data)
      return res.data
    }
  })

  const getImage = (image) => {
    return 'http://localhost:8880' + image
  }

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
      <div className='relative w-full block'>
        <div className='relative w-full flex flex-col border-b border-border p-6'>
          <h1 className='text-3xl font-semibold'>{data?.title}</h1>
          <p className='text-base leading-8 text-text/65 mt-4'>{data?.shortDescription}</p>
        </div>

        <div className='relative w-full grid grid-cols-3'>
          {
            data?.applications.map((application, index) => (
              <div key={'application-index-' + index} className='relative border-e border-e-border aspect-[1/0.5] border-b border-b-border flex flex-col items-center justify-center gap-4'>
                <img src={getImage(resolvedTheme === 'dark' ? application?.logo?.dark : application?.logo?.light)} alt={application.name} className='max-w-[60%] h-[2.5rem] object-contain' />
                <Badge>V {application?.version}</Badge>
              </div>
              
            ))
          }
          <div className='relative border-e border-e-border aspect-[1/0.5] border-b border-b-border flex flex-col items-center justify-center gap-2' />

        </div>

        {
          data?.description ? 
          <div className='relative w-full flex flex-col border-b border-border p-6 text-box-wrapper'>
            <Markdown>{data?.description}</Markdown>
          </div>
          : null
        }

        {
          data?.developmentPartners ? 
          <div className='relative w-full flex flex-col border-b border-border'>
            <div className="relative w-full grid grid-cols-[1.35fr_2fr]">
              <div className="relative w-full flex flex-col border-e border-e-border p-6">
                <h2 className='text-xl font-semibold'>Development Partners</h2>
                <p className='text-sm text-text/60'>Development partners details & information</p>
              </div>

              <div className="relative grid grid-cols-3">
                {
                  data?.developmentPartners?.partners?.map((partner, index) => (
                    <div key={'development-partner-index-' + index} className='relative w-full flex flex-col items-center justify-center aspect-[1/0.5] border-e border-e-border border-b border-b-border'>
                      <img src={getImage(partner)} alt={'Development Partner ' + index} className='w-full h-full object-contain grayscale' />
                    </div>
                  ))
                }
                </div>
            </div>
          </div>
          : null
        }

        {
          data?.deploymentPartners ? 
          <div className='relative w-full flex flex-col border-b border-border'>
            <div className="relative w-full grid grid-cols-[1.35fr_2fr]">
              <div className="relative w-full flex flex-col border-e border-e-border p-6">
                <h2 className='text-xl font-semibold'>Deployment Partners</h2>
                <p className='text-sm text-text/60'>Deployment partners details & information</p>
              </div>
              <div className="relative grid grid-cols-3">
                {
                  data?.deploymentPartners?.partners?.map((partner, index) => (
                    <div key={'deployment-partner-index-' + index} className='relative w-full flex flex-col items-center justify-center aspect-[1/0.5] border-e border-e-border border-b border-b-border'>
                      <img src={getImage(partner)} alt={'Deployment Partner ' + index} className='w-full h-full object-contain grayscale' />
                    </div>
                  ))
                }
                </div>
            </div>
          </div>
          : null
        }

{
          data?.developer ? 
          <div className='relative w-full flex flex-col border-b border-border'>
            <div className="relative w-full grid grid-cols-[1.35fr_2fr]">
              <div className="relative w-full flex flex-col border-e border-e-border p-6">
                <h2 className='text-xl font-semibold'>About Developer</h2>
                <p className='text-sm text-text/60'>Developer details & information</p>
              </div>

              <div className="relative w-full flex flex-col p-6">
                <div className="relative w-full flex items-center justify-between gap-5"> 
                  
                  <div className="relative w-full flex flex-col">
                    <h2 className='text-xl font-semibold'>{data?.developer?.name}</h2>
                    <p className='text-sm text-text/60'>{data?.developer?.address}</p>
                    <p className='text-sm text-text/60'>{data?.developer?.website} | {data?.developer?.contactEmail}</p>
                  </div>
                  <div className="relative block p-3 border border-border rounded-lg">
                  <img src={getImage(resolvedTheme === 'dark' ? data?.developer?.logo?.dark : data?.developer?.logo?.light)} alt={data?.developer?.name} className='w-auto h-[3.25rem] object-contain' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null
        }

      </div>
    </Activity>
  )
}
