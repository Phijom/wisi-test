import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/customers/$customerId/quotations',
      params: { customerId: 'BA-00000001' },
    })
  },
})
