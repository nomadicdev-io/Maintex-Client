import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/app/_app/development/_development/tickets',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/_app/development/_development/tickets"!</div>
}
