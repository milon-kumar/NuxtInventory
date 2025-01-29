import VueApexCharts from 'vue3-apexcharts';

export default defineNuxtPlugin(async (nuxtApp) => {
    const res = await $fetch(`${useRuntimeConfig().public.baseUrl}/sanctum/csrf-cookie`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Referer': useRuntimeConfig().public.frontendUrl,
        },
        credentials: 'include',
      });
});