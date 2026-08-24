import ordersSeed from '@/data/service-orders.json'

export type ServiceOrderStatus =
  | 'waiting-inspection'
  | 'in-progress'
  | 'awaiting-parts'
  | 'ready-for-pickup'
  | 'done'
  | 'rejected'

export interface ServiceOrder {
  code: string
  customer: { name: string; phone: string }
  device: { name: string; type: 'laptop' | 'phone' | 'printer' }
  status: ServiceOrderStatus
  assignedTo: string
  diagnosis: string
  spareparts: { name: string; qty: number; price: number }[]
  timeline: { title: string; time: string }[]
  cost: { service: number; parts: number }
  createdAt: string
}

export const useServiceOrders = () => {
  // shared reactive state, seeded sekali dari JSON
  const orders = useState<ServiceOrder[]>('service-orders', () => ordersSeed as ServiceOrder[])

  const addOrder = (order: ServiceOrder) => {
    orders.value.unshift(order)
  }

  const updateStatus = (code: string, status: ServiceOrderStatus) => {
    const order = orders.value.find((o) => o.code === code)
    if (!order) return
    order.status = status
    order.timeline.unshift({
      title: `Status updated to ${status}`,
      time: new Date().toISOString(),
    })
  }

  const getByCode = (code: string) =>
    computed(() => orders.value.find((o) => o.code === code))

  const filterByStatus = (status: ServiceOrderStatus | 'all') =>
    computed(() =>
      status === 'all' ? orders.value : orders.value.filter((o) => o.status === status)
    )

  const searchOrders = (query: string) =>
    computed(() => {
      const q = query.toLowerCase().trim()
      if (!q) return orders.value
      return orders.value.filter(
        (o) =>
          o.code.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q)
      )
    })

  const stats = computed(() => ({
    total: orders.value.length,
    waitingInspection: orders.value.filter((o) => o.status === 'waiting-inspection').length,
    inProgress: orders.value.filter((o) => o.status === 'in-progress').length,
    readyForPickup: orders.value.filter((o) => o.status === 'ready-for-pickup').length,
    revenue: orders.value.reduce((sum, o) => sum + o.cost.service + o.cost.parts, 0),
  }))

  const recentActivity = computed(() =>
    orders.value
      .flatMap((o) => o.timeline.map((t) => ({ ...t, code: o.code })))
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 4)
  )

  return {
    orders,
    addOrder,
    updateStatus,
    getByCode,
    filterByStatus,
    searchOrders,
    stats,
    recentActivity,
  }
}