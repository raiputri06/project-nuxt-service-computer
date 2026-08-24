<script setup lang="ts">
defineProps<{
  label: string
  value: string
  highlight?: boolean
}>()
</script>

<template>
  <div class="stat-card rounded-lg">
    <p class="stat-label">{{ label }}</p>
    <p class="stat-value" :class="{ 'stat-value-highlight': highlight }">
      {{ value }}
    </p>
  </div>
</template>

