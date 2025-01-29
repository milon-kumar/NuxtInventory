<script setup>
definePageMeta({
  layout: "backend-layout",
});

import { ref } from "vue";

const chartOptions = ref({
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
});

const chartSeries = ref([
  {
    name: "Sales",
    data: [30, 40, 45, 50, 49, 60, 70],
  },
]);
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
    <p class="text-gray-700">
      This is the main dashboard area. Add your widgets and data here.
    </p>
    </div>
</template>
