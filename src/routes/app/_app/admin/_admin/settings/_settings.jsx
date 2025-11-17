import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import { ScrollArea } from "@/components/ui/scroll-area"

export const Route = createFileRoute(
  '/app/_app/admin/_admin/settings/_settings',
)({
  component: RouteComponent,
})

const sidebarNav = [
  {
    id: 's-nav-01',
    label: 'General',
    href: '/app/admin/settings',
  },
  {
    id: 's-nav-03',
    label: 'Meta Data',
    href: '/app/admin/settings/meta-data',
  },
  {
    id: 's-nav-01.1',
    label: 'Companies',
    href: '/app/admin/settings/companies',
  },
  {
    id: 's-nav-02',
    label: 'Languages & Region',
    href: '/app/admin/settings/languages-region',
  }, 
  {
    id: 's-nav-07.1',
    label: 'Translations & Localization',
    href: '/app/admin/settings/translations-localization',
  },
  {
    id: 's-nav-04',
    label: 'Appearance & Theme',
    href: '/app/admin/settings/appearance-theme',
  },
  {
    id: 's-nav-11',
    label: 'Role Management',
    href: '/app/admin/settings/role-management',
  },
  {
    id: 's-nav-05',
    label: 'Security Settings',
    href: '/app/admin/settings/security',
  },
  {
    id: 's-nav-05.1',
    label: 'SMTP',
    href: '/app/admin/settings/smtp',
  },
  {
    id: 's-nav-14.1',
    label: 'API Keys',
    href: '/app/admin/settings/api-keys',
  },
  {
    id: 's-nav-13',
    label: 'Drive Settings',
    href: '/app/admin/settings/drive',
  },
  {
    id: 's-nav-13-30',
    label: 'Upload Settings',
    href: '/app/admin/settings/upload',
  },
  {
    id: 's-nav-06',
    label: 'Notifications',
    href: '/app/admin/settings/notifications',
  },
  {
    id: 's-nav-07',
    label: 'Backup Settings',
    href: '/app/admin/settings/backup',
  },
  {
    id: 's-nav-08',
    label: 'Log Settings',
    href: '/app/admin/settings/log-settings',
  },
  {
    id: 's-nav-09',
    label: 'Mobile Apps',
    href: '/app/admin/settings/mobile-apps',
  },
  {
    id: 's-nav-12.1',
    label: 'AMC',
    href: '/app/admin/settings/amc',
  },
  {
    id: 's-nav-12',
    label: 'Payments & Billing',
    href: '/app/admin/settings/payments-billing',
  },
  {
    id: 's-nav-13-2',
    label: 'Help & Support',
    href: '/app/admin/settings/help-support',
  },
  {
    id: 's-nav-13-10',
    label: 'License',
    href: '/app/admin/settings/license',
  },
  {
    id: 's-nav-13-6',
    label: 'About Maintex Pro',
    href: '/app/admin/settings/about',
  }
]

function RouteComponent() {
  return (
    <AnimatePresence>
      <div className="relative w-full grid grid-cols-[17rem_1fr]">
        <ScrollArea className="relative w-full block h-[calc(100vh-4rem)]" scrollHideDelay={300}>
          <SettingsSidebar />
        </ScrollArea>
        <ScrollArea className="relative w-full block h-[calc(100vh-4rem)]" scrollHideDelay={300}>
          <Outlet />
        </ScrollArea>
      </div>
    </AnimatePresence>
  )
}


function SettingsSidebar() {
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
    <Link to={item.href} activeOptions={{exact: true}} className="relative w-full h-auto py-2 px-4 text-text/40 hover:text-text/90 font-medium text-base [&.active]:text-text/90">
      {item.label}
    </Link>
  )
}