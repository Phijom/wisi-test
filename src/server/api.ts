import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'
import {
  customerIdParam,
  customerSchema,
  quotationSearchSchema,
  quotationsResponseSchema,
  type Quotation,
} from '../lib/schemas'
import { customers, quotations } from './data'

const PAGE_SIZE = 8

export const getCustomer = createServerFn({ method: 'GET' })
  .validator(customerIdParam)
  .handler(async ({ data }) => {
    const customer = customers.find((c) => c.id === data.customerId)
    if (!customer) throw notFound()
    return customerSchema.parse(customer)
  })

const compare = (key: keyof Quotation) => (a: Quotation, b: Quotation) => {
  const x = a[key]
  const y = b[key]
  return typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))
}

export const getQuotations = createServerFn({ method: 'GET' })
  .validator(quotationSearchSchema.merge(customerIdParam))
  .handler(async ({ data }) => {
    const needle = data.q.trim().toLowerCase()
    const matches = quotations
      .filter((r) => data.status === 'all' || r.paid === (data.status === 'paid'))
      .filter((r) => !needle || `${r.id} ${r.plan}`.toLowerCase().includes(needle))
      .sort(compare(data.sort))
    if (data.dir === 'desc') matches.reverse()

    const unpaid = quotations.filter((r) => !r.paid)
    return quotationsResponseSchema.parse({
      rows: matches.slice((data.page - 1) * PAGE_SIZE, data.page * PAGE_SIZE),
      filtered: matches.length,
      pageSize: PAGE_SIZE,
      stats: {
        total: quotations.length,
        unpaid: unpaid.length,
        expectedPremium: unpaid.reduce((sum, r) => sum + r.premium, 0),
      },
    })
  })
