<script setup lang="ts">
import Sidebar from '@/Layout/Sidebar.vue'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-vue-next'

const { orders, stats, recentActivity } = useServiceOrders()

const activeOrders = computed(() =>
  orders.value.filter((o) => !['done', 'rejected'].includes(o.status)).slice(0, 3)
)

// dummy sementara buat WeeklyChart, belum ada tanggal per order di data
const chartData = [
  { day: 'Mon', value: 8 },
  { day: 'Tue', value: 12 },
  { day: 'Wed', value: 6 },
  { day: 'Thu', value: 15 },
  { day: 'Fri', value: 10 },
  { day: 'Sat', value: 4 },
  { day: 'Sun', value: 2 },
]
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar>
      <main class="p-6 space-y-6">
        <div class="flex justify-between items-center">
          <div class="min-w-0 flex-1">
            <p class="title">Dashboard</p>
            <p class="paragraf">Monitor service operations.</p>
          </div>

          <Button class="btn-primary">
            <PlusIcon class="mr-2 h-4 w-4" />
            New Service Order
          </Button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <DashboardStatCard label="Total Service" :value="String(stats.total)" />
          <DashboardStatCard label="Waiting Inspection" :value="String(stats.waitingInspection)" />
          <DashboardStatCard label="In Progress" :value="String(stats.inProgress)" />
          <DashboardStatCard label="Ready for Pickup" :value="String(stats.readyForPickup)" />
          <DashboardStatCard label="Revenue" :value="`$${stats.revenue.toLocaleString()}`" :highlight="true" />
        </div>

        <!-- Chart + Timeline -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="lg:col-span-2 rounded-lg border bg-white p-4">
            <p class="section-title">Service Orders (Last 7 Days)</p>
            <DashboardWeeklyChart :data="chartData" class="mt-4" />
          </div>

          <div class="rounded-lg border bg-white p-4">
            <div class="flex items-center justify-between mb-2">
              <p class="section-title">Activity Timeline</p>
              <Button variant="link" size="sm" class="h-auto p-0">View All</Button>
            </div>
            <DashboardActivityTimeline :items="recentActivity" class="mt-2" />
          </div>
        </div>

        <!-- Active Service Orders -->
        <div>
          <p class="section-title mb-3">Active Service Orders</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardServiceOrderCard
              v-for="order in activeOrders"
              :key="order.code"
              :code="order.code"
              :customer="order.customer.name"
              :device="order.device.name"
              :device-type="order.device.type"
              :status="order.status"
              :assigned-to="order.assignedTo"
              action-label="Update"
            />
          </div>
        </div>
      </main>
    </Sidebar>
  </div>
</template>

