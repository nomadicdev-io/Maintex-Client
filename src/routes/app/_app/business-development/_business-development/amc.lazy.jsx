import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/app/_app/business-development/_business-development/amc',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/app/_app/business-development/_business-development/amc"!</div>
  )
}
