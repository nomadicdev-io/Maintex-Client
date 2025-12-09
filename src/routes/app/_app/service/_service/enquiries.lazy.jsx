import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/app/_app/service/_service/enquiries',
)({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Service Enquiries | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return <div>Hello "/app/_app/service/_service/enquiries"!</div>
}
