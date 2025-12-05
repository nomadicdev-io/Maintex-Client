import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import PageNotFound from '@components/layouts/PageNotFound'
import RootLayout from '@components/layouts/RootLayout'
import PageLoader from '@/components/loaders/PageLoader'
import { SocketProvider } from '@context/SocketContext'
import { Toaster } from "@/components/ui/sonner"
import orbit from '../api'
import { ErrorBoundary } from "react-error-boundary";
import FetchError from '../components/fetch/FetchError'
import { setMetaData } from '../lib/setMetaData'
import i18n from '@/lang'
import DevTools from '../components/ui/DevTools'
import { HotkeysProvider } from 'react-hotkeys-hook'
import { useEffect } from 'react'
import { useGeoLocation } from '../hooks/useGeoLocation'

export const Route = createRootRouteWithContext()({
  component: RootLayoutComponent,
  notFoundComponent: PageNotFound,
  pendingComponent: PageLoader,
  loader: async ({context})=> {
    if(i18n.language === 'ar') {
      document.dir = 'rtl'
    } else {
      document.dir = 'ltr'
    }
    try{

      return context.queryClient.ensureQueryData({
        queryKey: ['global-context'],
        queryFn: async () => {
          const res = await orbit.get({url: 'context'})
          return res?.data
        }
      })

    }catch(error){
      console.log(error)
      return {
        context: null,
      }
    }
  },
  beforeLoad: async ({context})=> {
    try{
      const {data} = await context.authClient.getSession()
      return {
        session: data?.session,
        token: data?.session?.token,
        user: data?.session?.user,
        isAuthenticated: data?.session?.token ? true : false,
      }
    }catch(error){
      console.log(error)
      return {
        session: null,
        token: null,
        user: null,
      }
    }
  },
  head: ({loaderData}) => (setMetaData(loaderData))
})

function RootLayoutComponent() {

  const loaderData = Route.useLoaderData()  
  const {getLocation} = useGeoLocation()

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <HotkeysProvider initiallyActiveScopes={['settings']}>
      <HeadContent />
      <SocketProvider url={import.meta.env.VITE_NODE_ENV === 'development' ? 'ws://localhost:8880/app/socket' : 'wss://api.maintex.pro/app/socket'}>
        <RootLayout>
          <ErrorBoundary FallbackComponent={(props) => <FetchError {...props} context={loaderData}/>} onError={(error) => {console.log(error)}}>
            <Outlet />
          </ErrorBoundary>
        </RootLayout>
      <Toaster offset={'5rem'} />
      {import.meta.env.VITE_DEBUG === 'true' && <DevTools /> }
      </SocketProvider>
      </HotkeysProvider>
  )
}
