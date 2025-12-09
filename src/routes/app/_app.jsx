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
import { authClient } from '../../auth'
import { useGeoLocation } from '../../hooks/useGeoLocation'
import { useEffect } from 'react'
import AIAssistantModal from '../../components/ai/AIAssistantModal'
import { socketManager } from '../__root'

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
  const {getLocation} = useGeoLocation()
  const {data: session} = authClient.useSession()
  const coords = useGeoLocation(state => state.coords)

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(()=> {

    if(session?.user) {
      socketManager.send('register-user', {
        id: session?.user?.id,
        user: {
          name: session?.user?.name,
          email: session?.user?.email,
          digitalID: session?.user?.digitalID,
          uuid: session?.user?.uuid,
          role: session?.user?.role,
        },
        coords: {
          latitude: coords?.latitude || null,
          longitude: coords?.longitude || null,
        },
        placetform: 'Maintex Web'
      })
    }

    return () => {
      socketManager.send('unregister-user', {
        user: session?.user?.id || null,
      })
    }

  }, [session])

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

    {/* <AIAssistantModal /> */}
    </AnimatePresence>
    </>
  )
}
