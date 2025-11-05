import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_app/account/_account/profile/_profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
