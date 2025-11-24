import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_support/support/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_support/privacy-policy"!</div>
}
