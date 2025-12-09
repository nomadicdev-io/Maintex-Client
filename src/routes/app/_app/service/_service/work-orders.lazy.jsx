import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/app/_app/service/_service/work-orders')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Service Work Orders | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return <div>Hello "/app/_app/service/_service/work-orders"!</div>
}
