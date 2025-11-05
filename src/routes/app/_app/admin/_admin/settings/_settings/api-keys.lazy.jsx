import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import DefaultFormModal from '../../../../../../../components/ui/DefaultFormModal'
import { PackagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/api-keys',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='relative w-full flex flex-col'>
    <DashboardBanner title={'API Keys'} description={'API keys settings for the application. You can manage the API keys here.'}>
        <DefaultFormModal 
            title='Create API Key'
            description='API Key is used to authenticate requests to the application.'
            classNames={{
                content: 'max-w-[30rem] min-w-[30rem]'
            }}
            children={
                <div className='relative w-full flex flex-col'>
                    
                </div>
            }
            button={
                <Button variant='shade'>
                    <PackagePlus />
                    <span>New API Key</span>
                </Button>
            }
            submitButtonText='Create'
        />
    </DashboardBanner>
  </div>
}
