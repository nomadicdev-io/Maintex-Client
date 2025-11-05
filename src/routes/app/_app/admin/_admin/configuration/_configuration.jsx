import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import { ScrollArea } from "@/components/ui/scroll-area"

export const Route = createFileRoute(
  '/app/_app/admin/_admin/configuration/_configuration',
)({
  component: RouteComponent,
})

const sidebarNav = [
  {
    id: 'c-nav-01',
    label: 'Service & Maintenance',
    href: '/app/admin/configuration',
  },
]

function RouteComponent() {
  return (
    <AnimatePresence>
      <div className="relative w-full grid grid-cols-[17.5rem_1fr]">
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
      <div className="w-full px-3 py-3 text-lg font-semibold border-b border-b-border text-text">Configuration</div>
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