import { z } from 'zod'
import { fallback } from '@tanstack/zod-adapter'

export const customerSchema = z.object({
  id: z.string().regex(/^BA-\d{8}$/),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  initials: z.string().length(2),
  tags: z.array(z.string()),
  status: z.enum(['Active', 'Inactive']),
  lastEngagementDaysAgo: z.number().int().nonnegative(),
  customerBy: z.object({ name: z.string(), initials: z.string() }),
  lastUpdate: z.object({
    email: z.string().email(),
    initials: z.string(),
    at: z.string().datetime(),
  }),
})
export type Customer = z.infer<typeof customerSchema>

export const quotationSchema = z.object({
  id: z.string().regex(/^QT\d{10}$/),
  plan: z.string(),
  premium: z.number().nonnegative(),
  date: z.string().date(),
  paid: z.boolean(),
})
export type Quotation = z.infer<typeof quotationSchema>

export const sortKeys = ['id', 'plan', 'premium', 'date'] as const

/** URL search params for the quotations tab. `fallback` keeps bad URLs from throwing. */
export const quotationSearchSchema = z.object({
  q: fallback(z.string(), '').default(''),
  status: fallback(z.enum(['all', 'paid', 'unpaid']), 'all').default('all'),
  sort: fallback(z.enum(sortKeys), 'date').default('date'),
  dir: fallback(z.enum(['asc', 'desc']), 'desc').default('desc'),
  page: fallback(z.number().int().min(1), 1).default(1),
})
export type QuotationSearch = z.infer<typeof quotationSearchSchema>

export const quotationsResponseSchema = z.object({
  rows: z.array(quotationSchema),
  filtered: z.number().int(),
  pageSize: z.number().int(),
  stats: z.object({
    total: z.number().int(),
    unpaid: z.number().int(),
    expectedPremium: z.number(),
  }),
})
export type QuotationsResponse = z.infer<typeof quotationsResponseSchema>

export const customerIdParam = z.object({ customerId: z.string() })
