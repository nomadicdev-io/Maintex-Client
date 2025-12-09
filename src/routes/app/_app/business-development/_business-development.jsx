import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/_app/business-development/_business-development',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
