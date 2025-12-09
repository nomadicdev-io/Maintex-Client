import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/app/_app/business-development/_business-development/outlets',
)({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Manage Outlets | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return (
    <div>
      Hello "/app/_app/business-development/_business-development/outlets"!
    </div>
  )
}
