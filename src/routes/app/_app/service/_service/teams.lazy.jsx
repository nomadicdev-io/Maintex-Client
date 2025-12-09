import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/app/_app/service/_service/teams')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Manage Teams | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return <div>Hello "/app/_app/service/_service/teams"!</div>
}
