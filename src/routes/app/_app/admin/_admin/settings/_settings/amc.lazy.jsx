import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import FetchError from '../../../../../../../components/fetch/FetchError'
import RouteLoader from '../../../../../../../components/loaders/RouteLoader'
import { Activity } from 'react'
import parse from 'html-react-parser';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle, CheckCircle2Icon } from 'lucide-react'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/amc',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const {t} = useTranslation()

  const {data, isLoading, isError, error, isFetched, refetch, isRefetching} = useQuery({
    queryKey: ['admin-settings-amc'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/settings/amc'})
        console.log(res.data)
        return res.data
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
      <div className='relative w-full flex flex-col mb-8'>
        <DashboardBanner title={t('amc-amc')} description={t('amc-details-description')} />

        <AMCContent data={data} />
        <Activity mode={isRefetching ? 'visible' : 'hidden'}>
          <RouteLoader key="refetch-loader" />
        </Activity>
      </div>
    </Activity>
  )
}


function AMCContent({data}) {
  return (
    <div className='relative w-full flex flex-col'>

      {
        data?.description ?
        <div className="w-full flex flex-col border-b border-border-600 p-5 [&>p]:font-light [&>p]:text-base [&>p]:text-text/75">
          {parse(data.description)}
        </div>
        : null
      }
      {
        data?.content?.map?.((item, index) => (
          <div key={item.id} className="w-full flex gap-2 flex-col border-b border-border-600 p-5 [&>p]:font-light [&>p]:text-base [&>p]:text-text/75">
            {
              item?.title ?
              <h2 className='text-xl font-semibold mb-3'>{item.title}</h2>
              : null
            }

            {
              item?.description ?
              parse(item.description)
              : null
            }

            {
              item?.table ?
              <div className="w-full relative flex flex-col border border-border-600 rounded-lg overflow-hidden">
                
                {
                  item?.table?.head ? 
                  <div className="w-full flex border-b border-border-600 bg-bg-300">
                    {
                      item?.table?.head?.map?.((head, indexHead) => (
                        <div key={index + item.id + 'head' + indexHead} className="w-full flex flex-1 border-b border-border-600 px-4 py-3 [&>p]:font-light [&>p]:text-base [&>p]:text-text/75 border-e border-e-border-600 [&:last-child]:border-e-0">
                          {head}
                        </div>
                      ))
                    }
                  </div>
                  : null
                }
                {
                  item?.table?.rows ?
                  <div className="w-full flex flex-col">

                    {
                      item?.table?.rows?.map?.((row, indexRow) => (
                        <div key={index + item.id + 'row' + indexRow} className="w-full flex flex-1 border-b border-border-600 [&>p]:font-light [&>p]:text-base [&>p]:text-text/75 border-e border-e-border-600 [&:last-child]:border-e-0">
                          {
                            row?.title ? 
                            <div className="w-full flex flex-1 font-semibold text-base text-text/80 border-e border-border-600 px-4 py-3">
                              {row?.title}
                            </div>
                            :
                            null
                          }
                          {
                            row?.description ?
                            <div className="w-full flex flex-1 text-text/75 border-e border-border-600 px-4 py-3">
                              {row?.description}
                            </div>
                            :
                            null
                          }
                          {
                            row?.content ?
                            <div className="w-full flex flex-1 text-text/75 px-4 py-3">
                              {row?.content}
                            </div>
                            :
                            null
                          }
                        </div>
                      ))
                    }
                  </div>
                  : null
                }
                
              </div>
              : null
            }

            {
              item?.notes ? 
              <div className="w-full flex flex-col">
                <Alert>
                  <AlertCircle />
                  <AlertTitle>Success! Your changes have been saved</AlertTitle>
                  <AlertDescription className="[&~p]:mb-5 ">
                    {
                      item?.notes?.map?.((note, indexNote) => (
                        <div key={index + item.id + 'note' + indexNote} className="mb-3 [&last-child]:mb-0">
                          {parse(note)}
                        </div>
                      ))
                    }
                  </AlertDescription>
                </Alert>
              </div>
              : null
            }

            {
              item?.list ?
              <div className="w-full flex flex-col">
                <ul className="list-disc list-inside [&>li]:mb-3 [&>li:last-child]:mb-0">
                  {
                    item?.list?.map?.((item, indexItem) => (
                      <li key={index + item.id + 'item' + indexItem} className="flex gap-3"><strong>-</strong> {parse(item)}</li>
                    ))
                  }
                </ul>
              </div>
              : null
            }
          </div>
        ))
      }
    </div>
  )
}