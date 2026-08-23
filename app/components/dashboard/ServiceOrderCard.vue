<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Smartphone, Laptop, Printer } from 'lucide-vue-next'

interface Props {
  code: string
  customer: string
  device: string
  deviceType: 'laptop' | 'phone' | 'printer'
  status: 'in-progress' | 'waiting-inspection' | 'awaiting-parts'
  assignedTo: string
  actionLabel: string
}

const props = defineProps<Props>()

const deviceIcon = {
  laptop: Laptop,
  phone: Smartphone,
  printer: Printer,
}

const statusMap = {
  'in-progress': { label: 'In Progress', class: 'badge-in-progress' },
  'waiting-inspection': { label: 'Waiting Insp', class: 'badge-waiting' },
  'awaiting-parts': { label: 'Awaiting Parts', class: 'badge-awaiting' },
}
</script>

<template>
  <div class="order-card">
    <div class="order-card-header">
      <p class="order-code">{{ code }}</p>
      <Badge class="border-border bg-white" :class="statusMap[status].class">
        {{ statusMap[status].label }}
      </Badge>
    </div>

    <p class="order-customer">{{ customer }}</p>

    <div class="order-device">
      <component :is="deviceIcon[deviceType]" class="h-4 w-4 shrink-0" />
      <span>{{ device }}</span>
    </div>

    <div class="order-card-footer">
      <span class="order-assigned">Assigned to: {{ assignedTo }}</span>
      <Button variant="link" size="sm" class="h-auto p-0">
        {{ actionLabel }}
      </Button>
    </div>
  </div>
</template>

