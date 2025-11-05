import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/join')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/join"!</div>
}
