<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  modelValue: {
    complaint: string
    diagnosis: string
    estimatedTurnaround: string
    technician: string
    priority: string
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [
    value: {
      complaint: string
      diagnosis: string
      estimatedTurnaround: string
      technician: string
      priority: string
    },
  ]
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

const technicians = [
  'John Smith',
  'Michael Brown',
  'David Wilson',
]
</script>

<template>
  <div class="space-y-6 mt-12">

    <!-- Complaint & Diagnosis -->
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

      <!-- Customer Complaint -->
      <div class="space-y-2">
        <Label
          for="complaint"
          class="text-xs font-medium text-[#202127]"
        >
          Customer Complaint <span class="text-red-500">*</span>
        </Label>

        <Textarea
          id="complaint"
          :model-value="modelValue.complaint"
          placeholder="Describe the issue reported by the customer..."
          class="min-h-[98px] rounded-sm border border-[#d1d2dc] p-3"
          @update:model-value="
            updateField('complaint', $event)
          "
        />
      </div>

      <!-- Initial Diagnosis -->
      <div class="space-y-2">
        <Label
          for="diagnosis"
          class="text-xs font-medium text-[#202127]"
        >
          Initial Diagnosis
        </Label>

        <Textarea
          id="diagnosis"
          :model-value="modelValue.diagnosis"
          placeholder="Technician's initial assessment..."
          class="min-h-[98px] rounded-sm border border-[#d1d2dc] p-3"
          @update:model-value="
            updateField('diagnosis', $event)
          "
        />
      </div>

    </div>

    <!-- Turnaround & Technician -->
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

      <!-- Estimated Turnaround -->
      <div class="space-y-2">
        <Label
          for="estimatedTurnaround"
          class="text-xs font-medium text-[#202127]"
        >
          Estimated Turnaround
        </Label>

        <div class="relative">
          <Input
            id="estimatedTurnaround"
            type="date"
            :model-value="modelValue.estimatedTurnaround"
            class="h-9 rounded-sm border border-[#d1d2dc] p-3"
            @update:model-value="
              updateField('estimatedTurnaround', $event)
            "
          />

          <!-- <Calendar
            class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#444752]"
          /> -->
        </div>
      </div>

      <!-- Assign Technician -->
      <div class="space-y-2">
        <Label
          for="technician"
          class="text-xs font-medium text-[#202127]"
        >
          Assign Technician
        </Label>
        <div class="relative">
          <select
            id="technician"
            :value="modelValue.technician"
            class="h-9 w-full appearance-none  bg-white px-3 pr-9 text-sm text-[#555862] outline-none focus:border-[#23449b] rounded-sm border border-[#d1d2dc]"
            @change="
              updateField(
                'technician',
                ($event.target as HTMLSelectElement).value,
              )
            "
          >
            <option value="">
              Select technician...
            </option>

            <option
              v-for="technician in technicians"
              :key="technician"
              :value="technician"
            >
              {{ technician }}
            </option>
          </select>

          <ChevronDown
            class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6d7180]"
          />
        </div>
      </div>

    </div>

    <!-- Priority -->
    <div class="space-y-2">
      <Label class="text-xs font-medium text-[#202127]">
        Priority Level
      </Label>

      <div
        class="grid grid-cols-3 overflow-hidden border border-[#c5c6d0]"
      >
        <button
          v-for="priority in ['Low', 'Medium', 'High']"
          :key="priority"
          type="button"
          class="h-8 border-r border-[#c5c6d0] text-xs transition-colors last:border-r-0"
          :class="
            modelValue.priority === priority
              ? 'bg-[#e1e7f8] font-medium text-[#252a35] ring-1 ring-inset ring-[#23449b]'
              : 'bg-white text-[#555862] hover:bg-[#f7f7fa]'
          "
          @click="updateField('priority', priority)"
        >
          {{ priority }}
        </button>
      </div>
    </div>

    <!-- Divider -->
    <div class="h-px bg-[#d1d2dc]" />

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
        class="h-9 bg-[#23449b] px-5 text-xs font-medium text-white shadow-none hover:bg-[#1d3984]"
        @click="emit('next')"
      >
        Next Step
        <ArrowRight class="ml-2 h-4 w-4" />
      </Button>
    </div>

  </div>
</template>