import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import PageNotFound from '@components/layouts/PageNotFound'
import RootLayout from '@components/layouts/RootLayout'
import PageLoader from '@/components/loaders/PageLoader'
import { SocketProvider } from '@context/SocketContext'
import { initAuthStore } from '@/auth'
import { Toaster } from "@/components/ui/sonner"
import {useAppControls} from '@/hooks/useAppControls'
import { useEffect } from 'react'
import orbit from '../api'
import { ErrorBoundary } from "react-error-boundary";
import FetchError from '../components/fetch/FetchError'
import { setMetaData } from '../lib/setMetaData'

export const Route = createRootRouteWithContext()({
  component: RootLayoutComponent,
  notFoundComponent: PageNotFound,
  pendingComponent: PageLoader,
  beforeLoad:initAuthStore,
  loader: async ()=> {
    const res = await orbit.get({url: 'context'})
    if(res.status){
      return res.data
    }else{
      return undefined
    }
  },
  head: ({loaderData}) => (setMetaData(loaderData))
})

function RootLayoutComponent() {

  const requestLocationPermission = useAppControls((state)=> state.requestLocationPermission)

  useEffect(() => {
    requestLocationPermission()
  }, [])

  return (
    <>
      <HeadContent />
      <SocketProvider url={import.meta.env.VITE_NODE_ENV === 'development' ? 'ws://localhost:8880/app/socket' : 'wss://api.maintex.pro/app/socket'}>
        <RootLayout>
          <ErrorBoundary FallbackComponent={FetchError} onError={(error) => {
            console.log(error)
          }}>
            <Outlet />
            {
              import.meta.env.VITE_DEBUG === 'true' && (
                <>
                  <TanStackRouterDevtools />
                  <ReactQueryDevtools /> 
                </>
              )
            }
          </ErrorBoundary>
        </RootLayout>
      <Toaster offset={'5rem'} />
      </SocketProvider>
    </>
  )
}
