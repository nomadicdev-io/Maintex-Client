import { createFileRoute } from '@tanstack/react-router'
import JoinForm from '../../../components/forms/JoinForm'

export const Route = createFileRoute('/_auth/auth/join')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <JoinForm>
      
    </JoinForm>
  )
}
