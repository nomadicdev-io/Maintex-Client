import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_support/support/contact-us')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_support/contact-us"!</div>
}
