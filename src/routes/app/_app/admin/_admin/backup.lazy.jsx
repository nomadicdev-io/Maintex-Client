import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@components/sections/DashboardBanner'
import { Link } from '@tanstack/react-router'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import FetchLoader from '@/components/fetch/FetchLoader'
import FetchError from '@/components/fetch/FetchError'
import RefetchLoader from '../../../../../components/fetch/RefetchLoader'
import { Activity } from 'react'
import FetchEmpty from '../../../../../components/fetch/FetchEmpty'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/app/_app/admin/_admin/backup')({
  component: RouteComponent,
})

const sidebarNav = [
  {
    id: 'b-nav-01',
    label: 'Server',
    href: '/app/admin/backup',
  },
  {
    id: 'b-nav-02',
    label: 'Mongo DB',
    href: '/app/admin/backup',
    search: 'mongo-db',
  },
  {
    id: 'b-nav-03',
    label: 'Redis',
    href: '/app/admin/backup',
    search: 'redis',
  },
  {
    id: 'b-nav-04',
    label: 'S3 Storage',
    href: '/app/admin/backup',
    search: 's3-storage',
  },
  {
    id: 'b-nav-05',
    label: 'File Storage',
    href: '/app/admin/backup',
    search: 'file-storage',
  },
  {
    id: 'b-nav-06',
    label: 'Configurations',
    href: '/app/admin/backup',
    search: 'configurations',
  },
  {
    id: 'b-nav-07',
    label: 'Logs',
    href: '/app/admin/backup',
    search: 'logs',
  },
]

function RouteComponent() {

  const { tab } = Route.useSearch()

  const {data, isLoading, isError, error, refetch, isRefetching} = useQuery({
    queryKey: ['admin-backup'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/backup'})
        console.log(res.data)
        return res.data
      }catch(error){
        console.log(error)
        return null
      }
    }
  })

  const create = useMutation({
    mutationFn: async (type) => {
      try{
        const res = await orbit.post({url: 'admin/backup', data: {type}})
        if(res.error) throw res
        console.log(res.data)
        return res.data
      }catch(error){
        console.log(error)
      }
    },
    onSuccess: () => {
      toast.success('Backup created successfully')
      refetch()
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message || error.statusText || 'Something went wrong')
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <div className="relative w-full flex flex-col h-full">
        <DashboardBanner title={'Server, Database & Files Backup'} description={'Backup settings for the application. You can backup the data here.'} />

        <div className="relative w-full grid grid-cols-[17.5rem_1fr] h-full flex-1">
          <div className="w-full h-full flex flex-col relative border-e border-e-border">
            {
              sidebarNav.map((item) => (
                <SidebarNavItem key={item.id} item={item} activeTab={tab} />
              ))
            }
          </div>
          <ScrollArea className="relative w-full block h-full" scrollHideDelay={300}>
            <Activity mode={isRefetching ? 'visible' : 'hidden'}>
              <RefetchLoader key="refetch-loader" />
            </Activity>
            {tab === 'mongo-db' ? <MongoDBBackup data={data?.mongo} onCreate={e=> create.mutate(e)} onRefetch={refetch} /> : tab === 'redis' ? <RedisBackup data={data?.redis} onCreate={create.mutate} onRefetch={refetch} /> : tab === 's3-storage' ? <ObjectStorageBackup data={data?.s3} onCreate={create.mutate} onRefetch={refetch} /> : tab === 'file-storage' ? <FileStorageBackup data={data?.file} onCreate={create.mutate} onRefetch={refetch} /> : tab === 'configurations' ? <ConfigurationsBackup data={data?.configurations} onCreate={create.mutate} onRefetch={refetch} /> : tab === 'logs' ? <LogsBackup data={data?.logs} onCreate={create.mutate} onRefetch={refetch} /> : <ServerBackup data={data?.server} onCreate={create.mutate} onRefetch={refetch} />}
          </ScrollArea>

        </div>
    </div>
  )
}
 
function SidebarNavItem({ item }){
  return (
    <Link to={item.href} search={{tab: item.search}} activeOptions={{exact: true}} className="relative w-full h-auto py-2 px-4 text-text/40 hover:text-text/90 font-medium text-base [&.active]:text-text/90">
      {item.label}
    </Link>
  )
}

function ServerBackup({data, onCreate}) {
  return (
    <div className='relative w-full flex flex-col h-full gap-6' id='server-backup'>
      <div className='relative w-full flex gap-5 items-center justify-between border-b border-border p-5'>
        <div className='relative w-full flex flex-col flex-1'>
          <h2 className='text-xl font-semibold text-text/90'>Server Backup</h2>
          <p className='text-sm text-text/50'>Backup settings for the server. You can backup the data here.</p>
        </div>
        <div className='relative block'>
          <Button variant='shade' onClick={()=> onCreate('server')}>
            <Plus />
            <span>Create Server Backup</span>
          </Button>
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-4 p-5">
        {
          data?.length > 0 ?
          <p>Test</p>
          :
          <FetchEmpty title="No Server Backup" description="No server backup found. You can create a new server backup here." />
        }
      </div>

    </div>
  )
}

function MongoDBBackup({data, onCreate}) {

  return (
    <div className='relative w-full flex flex-col h-full' id='mongo-db-backup'>
      <div className='relative w-full flex gap-5 items-center justify-between border-b border-border p-5'>
        <div className='relative w-full flex flex-col flex-1'>
          <h2 className='text-xl font-semibold text-text/90'>MongoDB Backup</h2>
          <p className='text-sm text-text/50'>Backup settings for the MongoDB. You can backup the data here.</p>
        </div>
        <div className='relative block'>
          <Button variant='shade' onClick={()=> onCreate('mongo')}>
            <Plus />
            <span>Create MongoDB Backup</span>
          </Button>
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-4 p-5">
        {
          data?.length > 0 ?
          <p>Test</p>
          :
          <FetchEmpty title="No MongoDB Backup" description="No mongodb backup found. You can create a new mongodb backup here." />
        }
      </div>
    </div>
  )
}

function RedisBackup({data, onCreate}) {

  return (
    <div className='relative w-full flex flex-col h-full' id='redis-backup'>
      <div className='relative w-full flex gap-5 items-center justify-between border-b border-border p-5'>
        <div className='relative w-full flex flex-col flex-1'>
          <h2 className='text-xl font-semibold text-text/90'>Redis Backup</h2>
          <p className='text-sm text-text/50'>Backup settings for the Redis. You can backup the data here.</p>
        </div>
        <div className='relative block'>
          <Button variant='shade' onClick={()=> onCreate('redis')}>
            <Plus />
            <span>Create Redis Backup</span>
          </Button>
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-4 p-5">
        {
          data?.length > 0 ?
          <p>Test</p>
          :
          <FetchEmpty title="No Redis Backup" description="No redis backup found. You can create a new redis backup here." />
        }
      </div>
    </div>
  )
}

function ObjectStorageBackup({data, onCreate}) {

    return (
    <div className='relative w-full flex flex-col h-full' id='object-storage-backup'>
      <div className='relative w-full flex gap-5 items-center justify-between border-b border-border p-5'>
        <div className='relative w-full flex flex-col flex-1'>
          <h2 className='text-xl font-semibold text-text/90'>S3 Storage Backup</h2>
          <p className='text-sm text-text/50'>Backup settings for the Object Storage. You can backup the data here.</p>
        </div>
        <div className='relative block'>
          <Button variant='shade' onClick={()=> onCreate('s3')}>
            <Plus />
            <span>Create S3 Backup</span>
          </Button>
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-4 p-5">
        {
          data?.length > 0 ?
          <p>Test</p>
          :
          <FetchEmpty title="No Object Storage Backup" description="No object storage backup found. You can create a new object storage backup here." />
        }
      </div>
    </div>
  )
}

function FileStorageBackup({data, onCreate}) {

  return (
    <div className='relative w-full flex flex-col h-full' id='file-storage-backup'>
      <div className='relative w-full flex gap-5 items-center justify-between border-b border-border p-5'>
        <div className='relative w-full flex flex-col flex-1'>
          <h2 className='text-xl font-semibold text-text/90'>File Storage Backup</h2>
          <p className='text-sm text-text/50'>Backup settings for the File Storage. You can backup the data here.</p>
        </div>
        <div className='relative block'>
          <Button variant='shade' onClick={()=> onCreate('file')}>
            <Plus />
            <span>Create Storage Backup</span>
          </Button>
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-4 p-5">
        {
          data?.length > 0 ?
          <p>Test</p>
          :
          <FetchEmpty title="No File Storage Backup" description="No file storage backup found. You can create a new file storage backup here." />
        }
      </div>
    </div>
  )
}

function ConfigurationsBackup({data, onCreate}) {
  return (
    <div className='relative w-full flex flex-col h-full' id='configurations-backup'>
      <div className='relative w-full flex gap-5 items-center justify-between border-b border-border p-5'>
        <div className='relative w-full flex flex-col flex-1'>
          <h2 className='text-xl font-semibold text-text/90'>Configurations Backup</h2>
          <p className='text-sm text-text/50'>Backup settings for the Configurations. You can backup the data here.</p>
        </div>
        <div className='relative block'>
          <Button variant='shade' onClick={()=> onCreate('configurations')}>
            <Plus />
            <span>Create Configurations Backup</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function LogsBackup({data, onCreate}) {
  return (
    <div className='relative w-full flex flex-col h-full' id='logs-backup'>
      <div className='relative w-full flex gap-5 items-center justify-between border-b border-border p-5'>
        <div className='relative w-full flex flex-col flex-1'>
          <h2 className='text-xl font-semibold text-text/90'>Logs Backup</h2>
          <p className='text-sm text-text/50'>Backup settings for the Logs. You can backup the data here.</p>
        </div>
        <div className='relative block'>
          <Button variant='shade' onClick={()=> onCreate('logs')}>
            <Plus />
            <span>Create Logs Backup</span>
          </Button>
        </div>
      </div>
    </div>
  )
}