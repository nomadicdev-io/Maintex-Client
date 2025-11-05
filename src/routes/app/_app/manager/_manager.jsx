import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_app/manager/_manager')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Outlet />
  )
}
