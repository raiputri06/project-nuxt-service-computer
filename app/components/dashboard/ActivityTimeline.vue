<script setup lang="ts">
interface ActivityItem {
  title: string
  reference: string
  time: string
}

defineProps<{
  items: ActivityItem[]
}>()
</script>

<template>
  <div class="activity-list">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="activity-item"
    >
      <div class="activity-marker-wrapper">
        <span class="activity-marker" />
        <span
          v-if="index !== items.length - 1"
          class="activity-line"
        />
      </div>

      <div class="activity-content">
        <p class="activity-title">{{ item.title }}</p>
        <p class="activity-meta">{{ item.reference }} • {{ item.time }}</p>
      </div>
    </div>
  </div>
</template>
