<script setup lang="ts">
import Sidebar from '@/Layout/Sidebar.vue'
import ServiceOrderStepper from '@/components/service-order/ServiceOrderStepper.vue'
import CustomerInformation from '@/components/service-order/CustomerInformation.vue'
import DeviceInformation from '@/components/service-order/DeviceInformation.vue'
import ServiceInformation from '@/components/service-order/ServiceInformation.vue'
import ServiceOrderConfirmation from '@/components/service-order/ServiceOrderConfirmation.vue'

const currentStep = ref(1)

const form = reactive({
  customer: {
    name: '',
    phone: '',
    email: '',
    address: '',
  },

  device: {
    type: '',
    brand: '',
    model: '',
    serialNumber: '',
    condition: '',
  },

  service: {
    complaint: '',
    diagnosis: '',
    estimatedTurnaround: '',
    technician: '',
    priority: 'Medium',
  },
})
const handleSubmit = () => {
  console.log('Service Order:', form)

  alert('Service Order berhasil dibuat!')
}
</script>

<template>
  <Sidebar>
    <main class="min-h-screen bg-[#f8f7ff] p-6 md:p-8">
      <div class="mx-auto max-w-5xl">
        <ServiceOrderStepper
          :current-step="currentStep"
        >
        <CustomerInformation
          v-if="currentStep === 1"
          v-model="form.customer"
          @next="currentStep++"
          @back="currentStep--"
        />
        <DeviceInformation
          v-else-if="currentStep === 2"
          v-model="form.device"
          @next="currentStep++"
          @back="currentStep--"
        />
          <ServiceInformation
            v-else-if="currentStep === 3"
            v-model="form.service"
            @next="currentStep++"
            @back="currentStep--"
          />
          <ServiceOrderConfirmation
              v-else-if="currentStep === 4"
              :form="form"
              @back="currentStep--"
              @submit="handleSubmit"
            />
        </ServiceOrderStepper>
      </div>
     
    </main>
  </Sidebar>
</template>
