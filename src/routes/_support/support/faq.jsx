import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_support/support/faq')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_support/faq"!</div>
}
