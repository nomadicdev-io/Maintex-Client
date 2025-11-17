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
import getUserAgent from '../lib/getUserAgent'

export const Route = createRootRouteWithContext()({
  component: RootLayoutComponent,
  notFoundComponent: PageNotFound,
  pendingComponent: PageLoader,
  beforeLoad:initAuthStore,
  loader: async ({context})=> {
    await context.queryClient.ensureQueryData({
      queryKey: ['app'],
      enabled: true,
      initialData: {
        status: false,
      },
      queryFn: async ()=> {
        try{
          const res = await orbit.get({url: 'context'})
          console.log(res.data)
          context.application = res.data
          return res.data
        }catch(error){
          console.log(error)
          return {
            status: false,
            message: error.message || error.response.data.message || 'Failed to fetch application context',
            data: null
          }
        }
      },
    })
  }
})

function RootLayoutComponent() {

  const requestLocationPermission = useAppControls((state)=> state.requestLocationPermission)

  useEffect(() => {
    requestLocationPermission()
  }, [])

  return (
    <>
      <HeadContent />
      <SocketProvider url={import.meta.env.VITE_SOCKET_URL}>
        <RootLayout>
          <Outlet />
          {
            import.meta.env.VITE_DEBUG === 'true' && (
              <>
                <TanStackRouterDevtools />
                <ReactQueryDevtools /> 
              </>
            )
          }
        </RootLayout>
      <Toaster offset={'5rem'} />
      </SocketProvider>
    </>
  )
}
