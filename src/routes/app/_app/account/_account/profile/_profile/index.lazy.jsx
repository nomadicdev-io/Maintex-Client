import { createLazyFileRoute, useRouteContext, useRouter } from '@tanstack/react-router'
import { authClient } from '@auth'
import ProfileInfo from '@/components/sections/profile/ProfileInfo'
import DashboardBanner from '@/components/sections/DashboardBanner'
import { Separator } from '@/components/ui/separator'
import {LogOutIcon, UserPen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/hooks/useAuthStore'
import { Activity, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/app/_app/account/_account/profile/_profile/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Profile | Maintex Pro ',
      },
    ],
  }),
})

function RouteComponent() {

  const { data, refetch } = authClient.useSession()
  const router = useRouter()
  const { t } = useTranslation()
  const {logout} = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  console.log('DATA', data?.user)

  const handleSignOut = async() => {
    setIsLoading(true)
    try{

        await logout()
        router.invalidate()
        router.navigate({to: '/', replace: true})
        queryClient.clear()

    }catch(error){
        console.log(error)
        toast.error(error.message)
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <div className='relative flex w-full flex-col'>
      <DashboardBanner
        title='Account & Profile Settings'
        description='Manage your account and profile settings here.'
        className='supports-[backdrop-filter]:bg-bg/40'
      >
        <div className='flex gap-2'>
          <Button variant='shade' onClick={() => router.navigate({ to: '/app/account/profile/edit-profile' })}>
            <UserPen />
            <span>{t('edit-profile')}</span>
          </Button>
          <Button variant='dangerShade' onClick={handleSignOut} disabled={isLoading}>
            <LogOutIcon />
            <span>{t('log-out')}</span>
          </Button>
        </div>
      </DashboardBanner>

      <Activity mode={data?.user ? 'visible' : 'hidden'}>
        <div className="relative grid grid-cols-[1fr_1.75fr] w-full">
          <ProfileInfo user={data?.user} refetch={refetch} />
          <ProfileStats data={data?.user}  activeTab="general" />
        </div>
      </Activity>

    </div>
  )
}

function ProfileStats({data}) {
  return (
    <div className="relative w-full flex flex-col border-b border-border">
      <h2 className="text-2xl font-semibold"> Profile Stats</h2>
    </div>
  )
}
