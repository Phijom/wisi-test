import type { Customer, Quotation } from '../lib/schemas'

export const customers: Customer[] = [
  {
    id: 'BA-00000001',
    firstName: 'John Baraka',
    lastName: 'Lucent',
    initials: 'JL',
    tags: ['NMB Customer'],
    status: 'Active',
    lastEngagementDaysAgo: 68,
    customerBy: { name: 'Bancassurance Admin', initials: 'BA' },
    lastUpdate: {
      email: 'admin@bancassurance.com',
      initials: 'AD',
      at: '2026-05-23T04:51:49.000Z',
    },
  },
]

const q = (n: number, plan: string, premium: number, date: string, paid = true): Quotation => ({
  id: `QT26${String(n).padStart(8, '0')}`,
  plan,
  premium,
  date,
  paid,
})

const head: Quotation[] = [
  q(101, 'Cash Insurance', 377600, '2026-07-29', false),
  q(100, 'Cash Insurance', 377600, '2026-07-29', false),
  q(99, 'Jahazi Insurance', 250000, '2026-07-28'),
  q(95, 'Jahazi Insurance', 500000, '2026-07-28', false),
  q(93, 'Jahazi Insurance', 500000, '2026-07-27'),
  q(92, 'Jahazi Insurance', 500000, '2026-07-27'),
  q(91, 'Machinery Breakdown Insurance', 141600, '2026-07-27'),
  q(89, 'GIT - Own Transport - Standard GIT Non-Marine', 180000, '2026-07-23'),
]

const plans: [string, number][] = [
  ['Cash Insurance', 377600],
  ['Jahazi Insurance', 250000],
  ['Machinery Breakdown Insurance', 141600],
  ['Fire & Allied Perils', 320000],
]

// 37 generated rows bring the list to 45; one is unpaid so unpaid premiums sum to 1,836,000.
const tail: Quotation[] = Array.from({ length: 37 }, (_, i) => {
  const [plan, premium] = plans[i % plans.length]
  const day = String(22 - Math.floor(i / 3)).padStart(2, '0')
  const date = Number(day) >= 1 ? `2026-07-${day}` : `2026-06-${String(30 + Number(day)).padStart(2, '0')}`
  return i === 4 ? q(84 - i, plan, 580800, date, false) : q(88 - i, plan, premium, date)
})

export const quotations: Quotation[] = [...head, ...tail]
