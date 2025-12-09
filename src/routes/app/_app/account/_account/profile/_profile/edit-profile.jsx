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
          <ProfileSidebar />
        </ScrollArea>
        <ScrollArea className="relative w-full block h-[calc(100vh-4rem)] flex-1" scrollHideDelay={300}>
          <Outlet />
        </ScrollArea>
    </div>
  )
}

function ProfileSidebar() {
  return (
    <div className="relative w-full flex flex-col h-full border-e border-e-border overflow-y-scroll scrollbar-hide">
      <div className="w-full px-3 py-3 text-lg font-semibold border-b border-b-border text-text">Edit Profile</div>
    </div>
  )
}

function ProfileSidebarItem({ item }) {
  return (
    <div className="relative w-full h-auto py-2 px-4 text-text/40 hover:text-text/90 font-medium text-base [&.active]:text-text/90">
      {item.label}
    </div>
  )
}