import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/app/_app/development/_development/repositories',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/_app/development/_development/repositories"!</div>
}
