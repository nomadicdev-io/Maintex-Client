import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/password-reset')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/password-reset"!</div>
}
