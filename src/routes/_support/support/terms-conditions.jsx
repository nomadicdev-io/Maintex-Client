import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_support/support/terms-conditions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_support/terms-conditions"!</div>
}
