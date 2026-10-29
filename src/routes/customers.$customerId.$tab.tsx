import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customers/$customerId/$tab')({
  component: Placeholder,
})

function Placeholder() {
  const { tab } = Route.useParams()
  return <div className="panel empty">The “{tab.replace('-', ' ')}” tab isn’t built yet.</div>
}
