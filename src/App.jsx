import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import PageLoader from './components/loaders/PageLoader'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { authClient } from './auth'
import { useEffect } from 'react'
import PageNotFound from './components/layouts/PageNotFound'

const queryClient = new QueryClient()

// Router
const router = createRouter({
    routeTree,
    // basepath: localStorage.getItem('lang') || i18n.language,
    context: {
        queryClient: queryClient,
        authClient: authClient,
    },
    scrollRestoration: true,
    defaultPendingComponent: PageLoader,
    defaultErrorComponent: PageNotFound
})

export default function App() {

    useEffect(() => {
        console.log(
            '%cDeveloped By, Quadbits Lab https://lab.quadbits.io' ,
            'background: #333; text-align: center; color: #FAFAFA; font-weight: bold; font-size: 14px; padding:8px; border-radius: 4px 0 0 4px; border: 1px solid #cacaca',
          )
      
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute={['class', 'data-theme']} defaultTheme={'system'} >
                <RouterProvider router={router} key="app-router"/>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
