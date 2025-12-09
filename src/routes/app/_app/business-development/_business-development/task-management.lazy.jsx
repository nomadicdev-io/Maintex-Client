import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/app/_app/business-development/_business-development/task-management',
)({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Manage Tasks | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/app/_app/business-development/_business-development/task-management"!
    </div>
  )
}
