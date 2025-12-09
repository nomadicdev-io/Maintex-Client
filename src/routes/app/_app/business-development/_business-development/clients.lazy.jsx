import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/app/_app/business-development/_business-development/clients',
)({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Manage Clients | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return (
    <div>
      Hello "/app/_app/business-development/_business-development/clients"!
    </div>
  )
}
