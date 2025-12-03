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
import { authClient } from '../auth'
import i18n from '../lang'

export const Route = createRootRouteWithContext()({
  component: RootLayoutComponent,
  notFoundComponent: PageNotFound,
  pendingComponent: PageLoader,
  beforeLoad: async ()=> {

    console.log(
      '%cDeveloped By, Quadbits Lab https://lab.quadbits.io' ,
      'background: #333; text-align: center; color: #FAFAFA; font-weight: bold; font-size: 14px; padding:8px; border-radius: 4px 0 0 4px; border: 1px solid #cacaca',
    )

    const {data} = await authClient.getSession()

    const res = await orbit.get({url: 'context'})

    if(i18n.language === 'ar') {
      document.dir = 'rtl'
    } else {
      document.dir = 'ltr'
    }

    const resData = {
      session: data?.session || null,
      token: data?.session?.token || null,
      user: data?.user || null,
      isAuthenticated: data?.session?.token ? true : false,
      context: res?.data || null
    }

    console.log('CONTEXT', resData)

    return resData
  },
  // loader: async ({context})=> {
  //   const {data} = await authClient.getSession()
  //   context.queryClient.ensureQueryData({
  //     queryKey: ['context'],
  //     queryFn: async () => {
  //       const res = await orbit.get({url: 'context'})
  //       console.log('CONTEXT', res)
  //       if(res.status){
  //         return res.data
  //       }else{
  //         return undefined
  //       }
  //     },
  //   })

      

  // },
  head: ({loaderData}) => (setMetaData(loaderData))
})

function RootLayoutComponent() {

  const requestLocationPermission = useAppControls((state)=> state.requestLocationPermission)
  const {context} = Route.useRouteContext()

  useEffect(() => {
    requestLocationPermission()
  }, [])

  return (
    <>
      <HeadContent />
      <SocketProvider url={import.meta.env.VITE_NODE_ENV === 'development' ? 'ws://localhost:8880/app/socket' : 'wss://api.maintex.pro/app/socket'}>
        <RootLayout>
          <ErrorBoundary FallbackComponent={(props) => <FetchError {...props} context={context}/>} onError={(error) => {console.log(error)}}>
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
