<script setup lang="ts">
import {
  Laptop,
  Smartphone,
  QrCode,
  ChevronDown,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import devices from '@/data/devices.json'

const props = defineProps<{
  modelValue: {
    type: string
    brand: string
    model: string
    serialNumber: string
    condition: string
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
  next: []
  back: []
}>()

const updateField = (
  field: keyof typeof props.modelValue,
  value: string,
) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  })
}

const selectDevice = (
  device: typeof props.modelValue,
) => {
  emit('update:modelValue', {
    ...props.modelValue,
    ...device,
  })
}


</script>

<template>
  <div class="space-y-8">

    <!-- Existing Devices -->
    <section class="mt-12">
      <h2
        class="mb-3 text-xs font-medium uppercase tracking-wide text-[#454752]"
      >
        Existing Devices for Sarah Jenkins
      </h2>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div
          v-for="device in existingDevices"
          :key="device.serialNumber"
          class="rounded-sm border border-[#d1d2dc] p-3"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
              <Laptop
                v-if="device.type === 'Laptop'"
                class="h-4 w-4 text-[#59606f]"
              />
              <Smartphone
                v-else
                class="h-4 w-4 text-[#59606f]"
              />
              <span class="text-xs font-medium text-[#292b33]">
                {{ device.brand }} {{ device.model }}
              </span>
            </div>
            <span
              class="rounded bg-[#f0f0f5] px-2 py-1 text-[10px] text-[#666a77]"
            >
              SN: {{ device.serialNumber }}
            </span>
          </div>
          <p class="mt-2 text-xs text-[#666a77]">
            Last Serviced: {{ device.lastServiced }}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="mt-3 h-7 border-[#d1d2dc] px-3 text-[11px] font-normal shadow-none"
            @click="
              selectDevice({
                type: device.type,
                brand: device.brand,
                model: device.model,
                serialNumber: device.serialNumber,
                condition: '',
              })
            "
          >
            Select Device
          </Button>
        </div>
      </div>
    </section>
    <div class="flex items-center gap-3">
      <div class="h-px flex-1 bg-[#d1d2dc]" />

      <span class="text-[11px] text-[#5e616c]">
        OR
      </span>

      <div class="h-px flex-1 bg-[#d1d2dc]" />
    </div>
    <section>
      <h2
        class="mb-4 text-xs font-medium uppercase tracking-wide text-[#454752]"
      >
        Add New Device
      </h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- Device Type -->
        <div class="space-y-2">
          <Label
            for="deviceType"
            class="text-xs font-medium text-[#454752]"
          >
            Device Type *
          </Label>
          <div class="relative">
            <select
              id="deviceType"
              :value="modelValue.type"
              class="h-10 w-full appearance-none rounded-md border border-[#cfd0da] bg-white px-3 text-xs text-[#6c7080] outline-none focus:border-[#23449b] focus:ring-2 focus:ring-[#23449b]/20"
              @change="
                updateField(
                  'type',
                  ($event.target as HTMLSelectElement).value,
                )
              "
            >
              <option value="">Select Type</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Tablet">Tablet</option>
            </select>
            <ChevronDown
              class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777b88]"
            />
          </div>
        </div>
        <div class="space-y-2">
          <Label
            for="brand"
            class="text-xs font-medium text-[#454752]"
          >
            Brand *
          </Label>
          <Input
            id="brand"
            :model-value="modelValue.brand"
            placeholder="e.g. Lenovo, Apple"
            class="h-10 border-[#cfd0da] text-xs shadow-none focus-visible:border-[#23449b] focus-visible:ring-[#23449b]/20"
            @update:model-value="updateField('brand', $event)"
          />
        </div>
        <div class="space-y-2">
          <Label
            for="model"
            class="text-xs font-medium text-[#454752]"
          >
            Model *
          </Label>
          <Input
            id="model"
            :model-value="modelValue.model"
            placeholder="e.g. ThinkPad T14"
            class="h-10 border-[#cfd0da] text-xs shadow-none focus-visible:border-[#23449b] focus-visible:ring-[#23449b]/20"
            @update:model-value="updateField('model', $event)"
          />
        </div>
        <div class="space-y-2">
          <Label
            for="serialNumber"
            class="text-xs font-medium text-[#454752]"
          >
            Serial Number *
          </Label>
          <div class="relative">
            <Input
              id="serialNumber"
              :model-value="modelValue.serialNumber"
              placeholder="Enter SN or IMEI"
              class="h-10 border-[#cfd0da] pr-10 text-xs shadow-none focus-visible:border-[#23449b] focus-visible:ring-[#23449b]/20"
              @update:model-value="
                updateField('serialNumber', $event)
              "
            />
            <QrCode
              class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777b88]"
            />
          </div>
        </div>
      </div>
      <div class="mt-4 space-y-2">
        <Label
          for="condition"
          class="text-xs font-medium text-[#454752]"
        >
          Condition on Arrival
        </Label>
        <Textarea
          id="condition"
          :model-value="modelValue.condition"
          placeholder="Describe any physical damage, missing parts, or current state..."
          class="min-h-[72px] resize-none border-[#cfd0da] text-xs shadow-none focus-visible:border-[#23449b] focus-visible:ring-[#23449b]/20"
          @update:model-value="updateField('condition', $event)"
        />
      </div>
    </section>
    <div class="flex items-center justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        class="h-9 border-[#d0d1da] px-5 text-xs font-medium shadow-none"
        @click="emit('back')"
      >
        Back
      </Button>
      <Button
        type="button"
        class="h-9 bg-[#23449b] px-5 text-xs font-medium text-white shadow-none hover:bg-[#1d3984]"
        @click="emit('next')"
      >
        Next Step →
      </Button>
    </div>
  </div>
</template>