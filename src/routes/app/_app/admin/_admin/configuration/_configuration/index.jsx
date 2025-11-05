import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/_app/admin/_admin/configuration/_configuration/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/app/_app/admin/_admin/configuration/_configuration/"!</div>
  )
}
