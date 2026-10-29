import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, Plus, Search } from 'lucide-react'
import { quotationSearch, sortKeys, type QuotationSearch } from '../lib/schemas'
import { getQuotations } from '../server/api'

export const Route = createFileRoute('/customers/$customerId/quotations')({
  validateSearch: zodValidator(quotationSearch),
  loaderDeps: ({ search }) => search,
  loader: ({ params, deps }) => getQuotations({ data: { ...deps, customerId: params.customerId } }),
  component: QuotationsTab,
})

const nf = new Intl.NumberFormat('en-US')
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

const columns: { key: (typeof sortKeys)[number]; label: string }[] = [
  { key: 'id', label: 'Quotation ID' },
  { key: 'plan', label: 'Insurance Plan' },
  { key: 'premium', label: 'Premium(TZS)' },
  { key: 'date', label: 'Date' },
]

function QuotationsTab() {
  const { rows, filtered, pageSize, stats } = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const update = (patch: Partial<QuotationSearch>, replace = false) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace })

  const toggleSort = (key: QuotationSearch['sort']) =>
    update({ sort: key, dir: search.sort === key && search.dir === 'asc' ? 'desc' : 'asc', page: 1 })

  const pages = Math.max(1, Math.ceil(filtered / pageSize))

  return (
    <>
      <div className="stats">
        <div>
          <div className="muted small">Total</div>
          <div className="stat">{stats.total}</div>
        </div>
        <div>
          <div className="muted small">Unpaid</div>
          <div className="stat">{stats.unpaid}</div>
        </div>
        <div>
          <div className="muted small">Expected Premium</div>
          <div className="stat">{nf.format(stats.expectedPremium)}</div>
        </div>
      </div>

      <div className="panel">
        <div className="toolbar">
          <label className="search">
            <Search size={16} />
            <input
              placeholder="Type to search"
              value={search.q}
              onChange={(e) => update({ q: e.target.value, page: 1 }, true)}
            />
          </label>
          <select
            className="outline-btn"
            value={search.status}
            onChange={(e) => update({ status: e.target.value as QuotationSearch['status'], page: 1 })}
            aria-label="Filter by payment status"
          >
            <option value="all">Filter: All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <button className="primary-btn" type="button">
            <Plus size={16} /> New Quotation
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="check">
                <input type="checkbox" aria-label="Select all" />
              </th>
              {columns.map((c) => (
                <th key={c.key}>
                  <button type="button" className="th-btn" onClick={() => toggleSort(c.key)}>
                    {c.label} <ArrowUpDown size={12} />
                  </button>
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="check">
                  <input type="checkbox" aria-label={`Select ${r.id}`} />
                </td>
                <td>
                  <a className="link" href="#">
                    {r.id}
                  </a>
                </td>
                <td>{r.plan}</td>
                <td>{nf.format(r.premium)}</td>
                <td className="date">{fmtDate(r.date)}</td>
                <td>
                  <button className="outline-btn" type="button">
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="empty">
                  No quotations match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pager">
          <span className="muted small">
            Page {Math.min(search.page, pages)} of {pages} · {filtered} quotations
          </span>
          <button
            className="icon-btn"
            type="button"
            disabled={search.page <= 1}
            onClick={() => update({ page: search.page - 1 })}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="icon-btn"
            type="button"
            disabled={search.page >= pages}
            onClick={() => update({ page: search.page + 1 })}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  )
}
