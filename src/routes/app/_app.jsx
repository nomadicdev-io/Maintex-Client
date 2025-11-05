import { createFileRoute, Outlet, redirect, useRouterState } from '@tanstack/react-router'
import AdminSidebar from '@/components/layouts/AdminSidebar'
import AdminHeader from '@/components/layouts/AdminHeader'
import Footer from '@/components/layouts/Footer'
import RouteLoader from '@/components/loaders/RouteLoader'
import { AnimatePresence } from 'motion/react'
import useAI from '@/hooks/useAI'
import DashboardAIChat from '@/components/sections/DashboardAIChat'
import Routes404 from '@/components/layouts/Routes404'
import { atom, useAtomValue } from 'jotai'
import VoiceAgent from '../../components/sections/VoiceAgent'
import useNetInfo from '@/hooks/useNetInfo'
import NoInternet from '../../components/layouts/NoInternet'

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
  const {isVisible} = useAI()
  const isVoiceAgent = useAtomValue(voiceAgentAtom)
  const {isOnline} = useNetInfo()

  return (
    <>
    <div className="relative flex w-full" id="app-layout">
        <AdminSidebar />
        <div className="w-full h-screen overflow-hidden relative flex flex-col">
          <AdminHeader />
          <main className="flex flex-col w-full h-full relative">
            <Outlet />
          </main>
          {/* <Footer /> */}
        </div>
    </div>
    <AnimatePresence>
    {
      isLoading ? <RouteLoader key={'route-loader'} /> : null
    }
    {
      isVisible ? <DashboardAIChat key={'dashboard-ai-bot'} /> : null
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
