import { Outlet, createFileRoute } from '@tanstack/react-router'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Route = createFileRoute('/app/_app/account/_account/profile/_profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ScrollArea className="relative w-full block h-[calc(100vh-4rem)]" scrollHideDelay={300}>
      <Outlet />  
    </ScrollArea>
  )
}
