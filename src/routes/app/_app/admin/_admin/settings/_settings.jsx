import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute(
  '/app/_app/admin/_admin/settings/_settings',
)({
  component: RouteComponent,
})


function RouteComponent() {

  return (
    <AnimatePresence>
      <div className="relative w-full flex">
        <ScrollArea className="relative block h-[calc(100vh-4rem)] w-[17rem]" scrollHideDelay={300}>
          <SettingsSidebar />
        </ScrollArea>
        <ScrollArea className="relative w-full block h-[calc(100vh-4rem)] flex-1" scrollHideDelay={300}>
          <Outlet />
        </ScrollArea>
      </div>
    </AnimatePresence>
  )
}


function SettingsSidebar() {

  const {t} = useTranslation()
  
  const sidebarNav = [
    {
      id: 's-nav-01',
      label: t('general'),
      href: '/app/admin/settings',
    },
    {
      id: 's-nav-11',
      label: t('role-management'),
      href: '/app/admin/settings/role-management',
    },
    {
      id: 's-nav-03',
      label: t('meta-data'),
      href: '/app/admin/settings/meta-data',
    },
    {
      id: 's-nav-01.1',
      label: t('companies'),
      href: '/app/admin/settings/companies',
    },
    {
      id: 's-nav-02',
      label: t('languages-region'),
      href: '/app/admin/settings/languages-region',
    }, 
    // {
    //   id: 's-nav-07.1',
    //   label: t('translations-localization'),
    //   href: '/app/admin/settings/translations-localization',
    // },
    {
      id: 's-nav-04',
      label: t('appearance-theme'),
      href: '/app/admin/settings/appearance-theme',
    },
    {
      id: 's-nav-05',
      label: t('security-settings'),
      href: '/app/admin/settings/security',
    },
    {
      id: 's-nav-05.1',
      label: t('smtp'),
      href: '/app/admin/settings/smtp',
    },
    {
      id: 's-nav-14.1',
      label: t('api-keys'),
      href: '/app/admin/settings/api-keys',
    },
    {
      id: 's-nav-13',
      label: t('drive-settings'),
      href: '/app/admin/settings/drive',
    },
    {
      id: 's-nav-13-30',
      label: t('upload-settings'),
      href: '/app/admin/settings/upload',
    },
    {
      id: 's-nav-06',
      label: t('notifications'),
      href: '/app/admin/settings/notifications',
    },
    {
      id: 's-nav-07',
      label: t('backup-settings'),
      href: '/app/admin/settings/backup',
    },
    {
      id: 's-nav-08',
      label: t('log-settings'),
      href: '/app/admin/settings/log-settings',
    },
    // {
    //   id: 's-nav-09',
    //   label: t('mobile-apps'),
    //   href: '/app/admin/settings/mobile-apps',
    // },
    {
      id: 's-nav-12.1',
      label: t('amc'),
      href: '/app/admin/settings/amc',
    },
    {
      id: 's-nav-12',
      label: t('payments-billing'),
      href: '/app/admin/settings/payments-billing',
    },
    {
      id: 's-nav-13-2',
      label: t('help-support'),
      href: '/app/admin/settings/help-support',
    },
    {
      id: 's-nav-13-10',
      label: t('license'),
      href: '/app/admin/settings/license',
    },
    {
      id: 's-nav-13-6',
      label: t('about-maintex-pro'),
      href: '/app/admin/settings/about',
    }
  ]

  return (
    <div className="relative w-full flex flex-col h-full border-e border-e-border overflow-y-scroll scrollbar-hide">
      <div className="w-full px-3 py-3 text-lg font-semibold border-b border-b-border text-text">Settings</div>
      <div className="w-full h-full flex flex-col pt-2">
        {
          sidebarNav.map((item) => (
            <SidebarNavItem key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  )
}

function SidebarNavItem({ item }){
  return (
    <Link to={item.href} activeOptions={{exact: true}} viewTransition={{ types: ['slide-right'] }} className="relative w-full h-auto py-2 px-4 text-text/40 hover:text-text/90 font-medium text-base [&.active]:text-text/90">
      {item.label}
    </Link>
  )
}