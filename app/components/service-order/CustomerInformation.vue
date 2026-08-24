<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Mail,
  MapPin,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  modelValue: {
    name: string
    phone: string
    email: string
    address: string
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [
    value: {
      name: string
      phone: string
      email: string
      address: string
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
</script>

<template>
 <main class="min-h-screen p-6 md:p-8">
      <div class="mx-auto max-w-5xl">
         <!-- Form -->
            <div class="mt-12">

              <!-- Section Heading -->
              <div class="mb-6">
                <div class="flex items-center gap-2">
                  <Contact
                    class="h-5 w-5 text-[#173b91]"
                    :stroke-width="1.8"
                  />

                  <h2
                    class="text-lg font-semibold text-[#202127]"
                  >
                    Customer Information
                  </h2>
                </div>

                <p
                  class="mt-3 text-sm text-[#5f606b]"
                >
                  Please provide the customer's primary contact
                  details for this service order.
                </p>
              </div>

              <!-- Full Name -->
              <div class="space-y-2">
                <Label
                  for="fullName"
                  class="text-sm font-medium text-[#525461]"
                >
                  Full Name *
                </Label>

                <div class="relative">
                  <User
                    class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777b88]"
                  />

                  <Input
                    id="fullName"
                    :model-value="modelValue.name"
                    placeholder="Jane Doe"
                    class="h-10 border-[#cfd0da] pl-10 text-sm shadow-none focus-visible:border-[#23449b] focus-visible:ring-[#23449b]/20"
                    @update:model-value="updateField('name', $event)"
                  />
                </div>
              </div>

              <!-- Phone + Email -->
              <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

                <!-- Phone -->
                <div class="space-y-2">
                  <Label
                    for="phone"
                    class="text-sm font-medium text-[#525461]"
                  >
                    Phone Number *
                  </Label>

                  <div class="relative">
                    <Phone
                      class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777b88]"
                    />

                    <Input
                      id="phone"
                      type="tel"
                      :model-value="modelValue.phone"
                      placeholder="081-123-4567"
                      class="h-10 border-[#cfd0da] pl-10 text-sm shadow-none focus-visible:border-[#23449b] focus-visible:ring-[#23449b]/20"
                      @update:model-value="updateField('phone', $event)"
                    />
                  </div>
                </div>

                <!-- Email -->
                <div class="space-y-2">
                  <Label
                    for="email"
                    class="text-sm font-medium text-[#525461]"
                  >
                    Email Address
                  </Label>

                  <div class="relative">
                    <Mail
                      class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777b88]"
                    />

                    <Input
                      id="email"
                      type="email"
                      :model-value="modelValue.email"
                      placeholder="jane@example.com"
                      class="h-10 border-[#cfd0da] pl-10 text-sm shadow-none focus-visible:border-[#23449b] focus-visible:ring-[#23449b]/20"
                      @update:model-value="updateField('email', $event)"
                    />
                  </div>
                </div>

              </div>

              <!-- Address -->
              <div class="mt-4 space-y-2">
                <Label
                  for="address"
                  class="text-sm font-medium text-[#525461]"
                >
                  Address
                </Label>

                <div class="relative">
                  <MapPin
                    class="absolute left-3 top-4 h-4 w-4 text-[#777b88]"
                  />

                  <Textarea
                    id="address"
                    :model-value="modelValue.address"
                    placeholder="123 Tech Lane&#10;Suite 100&#10;City, State, ZIP"
                    class="min-h-[82px] resize-none border-[#cfd0da] pl-10 pt-3 text-sm shadow-none focus-visible:border-[#23449b] focus-visible:ring-[#23449b]/20"
                    @update:model-value="updateField('address', $event)"
                  />
                </div>
              </div>

            </div>

            <div class="mt-14 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                class="h-9 border-[#d0d1da] px-4 text-sm font-medium text-[#30313a] shadow-none hover:bg-[#f7f7fa]"
                @click="emit('back')"
              >
                <ArrowLeft class="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                type="button"
                class="h-9 bg-[#23449b] px-5 text-sm font-medium text-white shadow-none hover:bg-[#1d3984]"
                @click="emit('next')"
              >
                Next Step
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </div>
      </div>
    </main>
</template>