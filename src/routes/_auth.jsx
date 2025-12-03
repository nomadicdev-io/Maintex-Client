import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import appConfig from '../../app.config'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { Moon, Sun } from 'lucide-react'
import ThemeSwitcher from '../components/ui/ThemeSwitcher'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: async ({context}) => {
    if(context?.session) throw redirect({ to: '/app' })
  },
})

function RouteComponent() {
  return (
    <main className="relative flex-1 flex flex-col gap-10 items-center justify-center">
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none invert-100 dark:invert-0">
        <img src="/bg-login.png" alt="Background Image" className="w-full h-full object-cover z-0 pointer-events-none grayscale-100" />
      </div>
      <Outlet />

      <footer className="absolute bottom-0 left-0 w-full flex items-center h-12 py-1 px-5">
        <p className="text-sm opacity-75 font-regular block text-center w-full">{appConfig.footer.copyright}</p>
      </footer>
      <ThemeSwitcher />
    </main>
  )
}


