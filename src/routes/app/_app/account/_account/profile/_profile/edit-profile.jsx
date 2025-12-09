import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Route = createFileRoute(
  '/app/_app/account/_account/profile/_profile/edit-profile',
)({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Edit Profile | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return (
    <div className="relative w-full flex">
        <ScrollArea className="relative block h-[calc(100vh-4rem)] w-[17rem]" scrollHideDelay={300}>

        </ScrollArea>
        <ScrollArea className="relative w-full block h-[calc(100vh-4rem)] flex-1" scrollHideDelay={300}>
          <Outlet />
        </ScrollArea>
    </div>
  )
}
