import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Bell, Building2, ChevronsUpDown, Settings } from 'lucide-react'
import { ProfilePanel } from '../components/ProfilePanel'
import { Sidebar } from '../components/Sidebar'
import { getCustomer } from '../server/api'

export const Route = createFileRoute('/customers/$customerId')({
  loader: ({ params }) => getCustomer({ data: { customerId: params.customerId } }),
  component: CustomerLayout,
})

const tabs = [
  ['overview', 'Overview'],
  ['quotations', 'Quotations'],
  ['policies', 'Policies'],
  ['claims', 'Claims'],
  ['bank-accounts', 'Bank Accounts'],
] as const

function CustomerLayout() {
  const customer = Route.useLoaderData()
  const { customerId } = Route.useParams()

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <h1>Customer Profile</h1>
          <div className="topbar-right">
            <button className="icon-btn" type="button" aria-label="Notifications">
              <Bell size={16} />
            </button>
            <button className="icon-btn" type="button" aria-label="Settings">
              <Settings size={16} />
            </button>
            <div className="user">
              <span className="avatar sm">
                <Building2 size={16} />
              </span>
              <div>
                <div className="strong">Kigonsera</div>
                <div className="muted small">Code: 641</div>
              </div>
              <ChevronsUpDown size={14} />
            </div>
          </div>
        </header>

        <div className="content">
          <ProfilePanel customer={customer} />
          <section className="workspace">
            <nav className="tabs">
              {tabs.map(([tab, label]) => (
                <Link
                  key={tab}
                  to="/customers/$customerId/$tab"
                  params={{ customerId, tab }}
                  className="tab"
                  activeProps={{ className: 'tab active' }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  )
}
