import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/reports')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "General Reports | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  return <div>Hello "/app/_app/hr/_hr/reports"!</div>
}
