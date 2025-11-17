import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import PageLoader from './components/loaders/PageLoader'
import { ThemeProvider } from 'next-themes'
import './lang'
import i18n from './lang'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// Router
const router = createRouter({
    routeTree,
    // basepath: i18n.language,
    context: {
        authTypes: null,
        token: null,
        user: null,
        socketToken: null,
        isAuthenticated: null,
        session: null,
        queryClient: queryClient,
        application: null
    },
    scrollRestoration: true,
    defaultPendingComponent: PageLoader,
})

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute={['class', 'data-theme']} defaultTheme={'system'} >
                <RouterProvider router={router} key="app-router" />
            </ThemeProvider>
        </QueryClientProvider>
    )
}
