<script setup lang="ts">
import {
  User,
  Laptop,
  Wrench,
  ArrowLeft,
  CircleCheck,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Swal from 'sweetalert2'

const props = defineProps<{
  form: {
    customer: {
      name: string
      phone: string
      email: string
      address: string
    }

    device: {
      type: string
      brand: string
      model: string
      serialNumber: string
      condition: string
    }

    service: {
      complaint: string
      diagnosis: string
      estimatedTurnaround: string
      technician: string
      priority: string
    }
  }
}>()

const emit = defineEmits<{
  back: []
  submit: []
}>()

const agreedToTerms = ref(false)


const handleConfirm = async () => {


  await Swal.fire({
    icon: 'success',
    title: 'Berhasil!',
    text: 'Service order berhasil dibuat.',
    confirmButtonText: 'OK',
  })

  navigateTo('/service-order')
}
</script>

<template>
  <div class="space-y-5 mt-12">

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">

      <!-- Customer Summary -->
      <div
        class="rounded-lg border border-[#d0d1dc] bg-white p-4"
      >
        <div class="flex items-center gap-2">
          <User
            class="h-4 w-4 text-[#555b68]"
            :stroke-width="1.8"
          />

          <h2 class="text-xs font-medium text-[#30323a]">
            Customer Summary
          </h2>
        </div>

        <div class="mt-4 space-y-3">

          <div>
            <p class="text-[11px] text-[#666a76]">
              Name
            </p>

            <p class="mt-0.5 text-xs text-[#292b33]">
              {{ form.customer.name || '-' }}
            </p>
          </div>

          <div>
            <p class="text-[11px] text-[#666a76]">
              Phone
            </p>

            <p class="mt-0.5 text-xs text-[#292b33]">
              {{ form.customer.phone || '-' }}
            </p>
          </div>

          <div>
            <p class="text-[11px] text-[#666a76]">
              Email
            </p>

            <p class="mt-0.5 text-xs text-[#292b33]">
              {{ form.customer.email || '-' }}
            </p>
          </div>

        </div>
      </div>

      <!-- Device Summary -->
      <div
        class="rounded-lg border border-[#d0d1dc] bg-white p-4"
      >
        <div class="flex items-center gap-2">
          <Laptop
            class="h-4 w-4 text-[#555b68]"
            :stroke-width="1.8"
          />

          <h2 class="text-xs font-medium text-[#30323a]">
            Device Summary
          </h2>
        </div>

        <div class="mt-4 space-y-3">

          <div>
            <p class="text-[11px] text-[#666a76]">
              Brand
            </p>

            <p class="mt-0.5 text-xs text-[#292b33]">
              {{ form.device.brand || '-' }}
            </p>
          </div>

          <div>
            <p class="text-[11px] text-[#666a76]">
              Model
            </p>

            <p class="mt-0.5 text-xs text-[#292b33]">
              {{ form.device.model || '-' }}
            </p>
          </div>

          <div>
            <p class="text-[11px] text-[#666a76]">
              Serial Number
            </p>

            <span
              class="mt-1 inline-flex rounded bg-[#f0f0f5] px-2 py-1 text-[10px] text-[#4f5360]"
            >
              {{ form.device.serialNumber || '-' }}
            </span>
          </div>

        </div>
      </div>

    </div>

    <!-- Service Summary -->
    <div
      class="rounded-lg border border-[#d0d1dc] bg-white p-4"
    >
      <div class="flex items-center gap-2">
        <Wrench
          class="h-4 w-4 text-[#555b68]"
          :stroke-width="1.8"
        />

        <h2 class="text-xs font-medium text-[#30323a]">
          Service Summary
        </h2>
      </div>

      <div class="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">

        <!-- Complaint -->
        <div>
          <p class="text-[11px] text-[#666a76]">
            Complaint / Issue
          </p>

          <p
            class="mt-1 whitespace-pre-line text-xs leading-5 text-[#292b33]"
          >
            {{ form.service.complaint || '-' }}
          </p>
        </div>

        <!-- Technician -->
        <div>
          <p class="text-[11px] text-[#666a76]">
            Technician Assigned
          </p>

          <div class="mt-2 flex items-center gap-2">

            <div
              class="flex h-6 w-6 items-center justify-center rounded-full bg-[#23449b] text-[9px] font-medium text-white"
            >
              {{ getInitials(form.service.technician) }}
            </div>

            <span class="text-xs text-[#292b33]">
              {{ form.service.technician || 'Not assigned' }}
            </span>

          </div>
        </div>

      </div>
    </div>

    <!-- Agreement -->
    <div class="flex items-start gap-3 pt-2">

      <Checkbox
        id="agreement"
        v-model="agreedToTerms"
        class="mt-0.5 text-white"
      />

      <label
        for="agreement"
        class="cursor-pointer text-xs leading-5 text-[#383b45]"
      >
        Customer agrees to terms and diagnostic fee.

        <span class="text-[#777b86]">
          (Requires signature on next screen)
        </span>
      </label>

    </div>

    <!-- Divider
    <div class="h-px bg-[#d1d2dc]" /> -->

    <!-- Footer -->
    <div class="flex items-center justify-between pt-1">

      <Button
        type="button"
        variant="outline"
        class="h-9 border-[#d0d1da] px-4 text-xs font-medium text-[#30313a] shadow-none hover:bg-[#f7f7fa]"
        @click="emit('back')"
      >
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back
      </Button>

     <Button
        type="button"
        :disabled="!agreedToTerms"
        class="h-9 bg-[#07358f] px-5 text-xs font-medium text-white shadow-none hover:bg-[#062d79] disabled:cursor-not-allowed disabled:opacity-50"
        @click="handleConfirm"
        >
        <CircleCheck class="mr-2 h-4 w-4" />
        Create Service Order
    </Button>

    </div>

  </div>
</template>

<script lang="ts">
function getInitials(name: string) {
  if (!name) return '??'

  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>