import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/_app/business-development/_business-development/client-details',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/app/_app/business-development/_business-development/client-details"!
    </div>
  )
}
