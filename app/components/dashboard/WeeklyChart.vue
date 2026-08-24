<script setup lang="ts">
interface ChartPoint {
  day: string
  value: number
}

const props = defineProps<{
  data: ChartPoint[]
}>()

const width = 700
const height = 180
const padding = 10

const max = Math.max(...props.data.map((d) => d.value), 1)

const points = props.data
  .map((d, i) => {
    const x = (i / (props.data.length - 1)) * width
    const y = height - padding - (d.value / max) * (height - padding * 2)
    return `${x},${y}`
  })
  .join(' ')
</script>

<template>
  <div class="chart-wrapper">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      class="w-full"
      preserveAspectRatio="none"
    >
      <!-- grid lines -->
      <line
        v-for="n in 4"
        :key="n"
        :x1="0"
        :x2="width"
        :y1="(height / 4) * n"
        :y2="(height / 4) * n"
        class="chart-grid-line"
      />

      <polyline
        :points="points"
        fill="none"
        class="chart-line"
        stroke-width="2"
      />

      <circle
        v-for="(d, i) in data"
        :key="d.day"
        :cx="(i / (data.length - 1)) * width"
        :cy="height - padding - (d.value / max) * (height - padding * 2)"
        r="3"
        class="chart-dot"
      />
    </svg>

    <div class="chart-labels">
      <span v-for="d in data" :key="d.day">{{ d.day }}</span>
    </div>
  </div>
</template>

