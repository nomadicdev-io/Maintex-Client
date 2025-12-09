import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/app/_app/service/_service/schedules')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Service Schedules | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return <div>Hello "/app/_app/service/_service/schedules"!</div>
}
