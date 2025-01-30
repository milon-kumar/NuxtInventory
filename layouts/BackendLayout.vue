<script setup lang="ts">
</script>

<template>
  <div class="">
    <BackendLayoutsSidebar />
    <BackendLayoutsHeader />
    <div class="ml-64 p-3 rounded-sm">
      <main class="bg-gray-100 dark:bg-theme-dark mt-[58px] h-screen">
        <slot />
      </main>
    </div>
  </div>
</template>
