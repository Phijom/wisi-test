import { ChevronLeft, ChevronRight, FileText, ShieldCheck, UserX, User, Users, Wallet, ClipboardList } from 'lucide-react'
import type { ReactNode } from 'react'

type Item = { label: string; icon: ReactNode; chevron?: boolean }

const customerItems: Item[] = [
  { label: 'Individual', icon: <User size={16} />, chevron: true },
  { label: 'Non-Individual', icon: <Users size={16} />, chevron: true },
  { label: 'Restrictions', icon: <UserX size={16} /> },
]

const manageItems: Item[] = [
  { label: 'Sales', icon: <FileText size={16} />, chevron: true },
  { label: 'Payments', icon: <Wallet size={16} />, chevron: true },
  { label: 'Policies', icon: <ShieldCheck size={16} />, chevron: true },
  { label: 'Claims', icon: <ClipboardList size={16} /> },
]

function Section({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="nav-section">
      <div className="nav-title">{title}</div>
      {items.map((item) => (
        <button key={item.label} className="nav-item" type="button">
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
          {item.chevron && <ChevronRight size={14} className="nav-chevron" />}
        </button>
      ))}
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-logo">NMB</span>
        <span className="brand-name">Bancassurance</span>
      </div>
      <button className="collapse" type="button" aria-label="Collapse sidebar">
        <ChevronLeft size={14} />
      </button>
      <Section title="CUSTOMERS" items={customerItems} />
      <Section title="MANAGE" items={manageItems} />
      <div className="sidebar-footer">
        <span className="avatar sm online">NA</span>
        <div>
          <div className="strong">Name</div>
          <div className="muted small">Branch Manager</div>
        </div>
        <span className="version">BANCA V1.0.132</span>
      </div>
    </aside>
  )
}
