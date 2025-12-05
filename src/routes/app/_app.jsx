import { createFileRoute, Outlet, redirect, useRouter, useRouterState } from '@tanstack/react-router'
import AdminSidebar from '@/components/layouts/AdminSidebar'
import AdminHeader from '@/components/layouts/AdminHeader'
import RouteLoader from '@/components/loaders/RouteLoader'
import { AnimatePresence } from 'motion/react'
import useAI from '@/hooks/useAI'
import DashboardAIChat2 from '@/components/sections/DashboardAIChat2'
import Routes404 from '@/components/layouts/Routes404'
import { atom, useAtomValue } from 'jotai'
import VoiceAgent from '../../components/sections/VoiceAgent'
import useNetInfo from '@/hooks/useNetInfo'
import NoInternet from '../../components/layouts/NoInternet'
import { useSocket } from '../../context/SocketContext'
import { authClient } from '../../auth'
import { useGeoLocation } from '../../hooks/useGeoLocation'

export const Route = createFileRoute('/app/_app')({
  component: AppLayout,
  notFoundComponent: Routes404,
  beforeLoad: async ({context}) => {
    if(!context?.session) throw redirect({ to: '/' }) 
  },
})

export const voiceAgentAtom = atom(false)

function AppLayout() {

  const {isLoading} = useRouterState()
  const {isVisible, toggle} = useAI()
  const isVoiceAgent = useAtomValue(voiceAgentAtom)
  const {isOnline} = useNetInfo()
  const {context} = Route.useRouteContext()
  const {sendMessage} = useSocket()
  const {data} = authClient.useSession()
  const {coords} = useGeoLocation()

  console.log('COORDS', coords)


  // useEffect(() => {
  //   if(data?.user) {
  //     sendMessage({
  //       type: 'register-user',
  //       data: {
  //         user: {
  //           id: data.user.id,
  //           name: data.user.name,
  //           email: data.user.email,
  //           digitalID: data.user.digitalID,
  //           uuid: data.user.uuid,
  //           role: data.user.role,
  //         },
  //         latitude: coords?.latitude,
  //         longitude: coords?.longitude,
  //       },
  //     })
  //   }
  // }, [data?.user])

  // if(!isGeolocationAvailable) return <FetchLocationError />

  return (
    <>
    <div className="relative flex w-full" id="app-layout">
        <AdminSidebar />
        <div className="w-full h-screen overflow-hidden relative flex flex-col">
          <AdminHeader context={context}/>
          <main className="flex flex-col w-full h-full relative">
            <Outlet />
          </main>
        </div>
    </div>
    <AnimatePresence>
    {
      isLoading ? <RouteLoader key={'route-loader'} /> : null
    }
    {
      isVisible ? <DashboardAIChat2 open={isVisible} onOpenChange={toggle} key={'dashboard-ai-bot'} /> : null
    }
    {
      isVoiceAgent ? <VoiceAgent key={'voice-agent'} /> : null
    }
    {
      !isOnline ? <NoInternet key={'no-internet'} /> : null
    }
    </AnimatePresence>
    </>
  )
}
