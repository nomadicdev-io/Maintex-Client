import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_app/development/_development')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
