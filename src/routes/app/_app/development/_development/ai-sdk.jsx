import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/_app/development/_development/ai-sdk',
)({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <h1>AI SDK</h1>
        </div>
    )
}
