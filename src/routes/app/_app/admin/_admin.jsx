import { createFileRoute, Outlet } from '@tanstack/react-router'
import Routes404 from '@/components/layouts/Routes404'

export const Route = createFileRoute('/app/_app/admin/_admin')({
  component: RouteComponent,
  notFoundComponent: Routes404,
})

function RouteComponent() {
  return <Outlet />
}
