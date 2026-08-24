<script setup lang="ts">
const props = defineProps<{
  currentStep: number
}>()

const steps = [
  {
    number: 1,
    label: 'Customer',
  },
  {
    number: 2,
    label: 'Device',
  },
  {
    number: 3,
    label: 'Service',
  },
  {
    number: 4,
    label: 'Confirm',
  },
]
</script>

<template>
    <Card class="border-[#d9d8e2] bg-white shadow-sm">
          <CardContent class="p-6 md:p-8">

            <!-- Header -->
            <div class="text-center">
              <h1
                class="text-2xl font-semibold tracking-tight text-[#202127] md:text-3xl"
              >
                Create Service Order
              </h1>

              <p class="mt-2 text-sm text-[#5f606b]">
                Step 1 of 4: Detail the service requirements.
              </p>
            </div>

            <div class="mx-auto mt-8 max-w-3xl">
                <div class="relative">

                <!-- Progress Line -->
                <div
                    class="absolute left-0 right-0 top-3 h-0.5 bg-[#23449b]"
                />

                <div class="relative z-10 flex justify-between">
                    <div
                    v-for="step in steps"
                    :key="step.number"
                    class="flex flex-col items-center"
                    >
                    <!-- Circle -->
                    <div
                        class="flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white text-xs font-medium transition-all"
                        :class="
                        step.number <= props.currentStep
                            ? 'border-[#23449b] text-[#23449b]'
                            : 'border-[#c8c9d2] text-[#747681]'
                        "
                    >
                        {{ step.number }}
                    </div>

                    <!-- Label -->
                    <span
                        class="mt-2 text-xs"
                        :class="
                        step.number === props.currentStep
                            ? 'font-semibold text-[#173b91]'
                            : 'text-[#555762]'
                        "
                    >
                        {{ step.label }}
                    </span>
                    </div>
                </div>

                </div>
            </div>
            <slot />
          </CardContent>
        </Card>
  
</template>