import { ChevronRight, CircleArrowLeft, MoreVertical, SquarePen } from 'lucide-react'
import type { Customer } from '../lib/schemas'

const fmtStamp = (iso: string) => {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  const time = d.toLocaleTimeString('en-GB', { timeZone: 'UTC' })
  return `${date},${time}`
}

export function ProfilePanel({ customer }: { customer: Customer }) {
  return (
    <section className="profile">
      <div className="profile-actions">
        <button className="ghost-link" type="button">
          <CircleArrowLeft size={16} /> Back to customers
        </button>
        <button className="outline-btn" type="button">
          <MoreVertical size={12} /> Actions
        </button>
      </div>

      <div className="profile-card">
        <div className="avatar xl">
          {customer.initials}
          <span className="avatar-edit">
            <SquarePen size={12} />
          </span>
        </div>
        <h2>
          {customer.firstName} {customer.lastName}
        </h2>
        <div className="muted">ID: {customer.id}</div>
        <div className="chips">
          {customer.tags.map((t) => (
            <span key={t} className="chip blue">
              {t}
            </span>
          ))}
          <span className="chip green">● {customer.status}</span>
        </div>
        <div className="muted engagement">
          <span className="dot" /> Last Engagement – {customer.lastEngagementDaysAgo} days ago
        </div>
      </div>

      <div className="profile-block">
        <div className="muted">Customer By</div>
        <div className="person">
          <span className="avatar sm">{customer.customerBy.initials}</span>
          <span className="strong">{customer.customerBy.name}</span>
        </div>
      </div>

      {['Customer Details', 'Contacts Details', 'Identities'].map((label) => (
        <button key={label} className="accordion" type="button">
          {label} <ChevronRight size={18} />
        </button>
      ))}

      <div className="profile-block">
        <div className="strong lg">Last Update</div>
        <div className="person">
          <span className="avatar sm">{customer.lastUpdate.initials}</span>
          <div>
            <div className="strong">{customer.lastUpdate.email}</div>
            <div className="muted small">{fmtStamp(customer.lastUpdate.at)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
