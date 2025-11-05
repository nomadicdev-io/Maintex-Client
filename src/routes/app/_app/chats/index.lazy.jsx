import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/app/_app/chats/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/_app/chats/"!</div>
}
