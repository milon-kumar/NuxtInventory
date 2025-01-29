<script setup>
import { ref, onMounted } from "vue";
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
    },
    {
      label: "Changelog",
      icon: "i-heroicons-megaphone",
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];

const shadowClass = ref(''); // This will hold the shadow class based on scroll
const onScroll = () => {
  if (window.scrollY > 10) {
    shadowClass.value = 'shadow-lg'; // Add shadow when scrolling
  } else {
    shadowClass.value = ''; // Remove shadow when at top
  }
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

</script>

<template>
  <div 
    class="bg-white dark:bg-theme-dark h-14 border-b border-theme-dark-2 ml-64 fixed w-[87%] z-10" 
    :class="shadowClass"
  >
    <div class="flex justify-between items-center px-4 py-2 h-full">
      <div class="">
        <input type="search" class="py-1 px-2 border border-gray-200 dark:border-slate-800 focus:border-gray-200 focus:dark:border-slate-800 outline-none focus:outline-none rounded-sm" placeholder="Search..." />
      </div>
      <div class="">
        <UDropdown
          :items="items"
          :ui="{
            item: { disabled: 'cursor-text select-text' },
            rounded: 'rounded-sm',
            ring: 'ring-1 ring-theme-dark-2 dark:ring-theme-dark-2',
            background: 'bg-theme-dark dark:bg-theme-dark',
            divide: 'dark:divide-theme-dark-2',
            item: { rounded: 'rounded-sm' },
          }"
          :popper="{ placement: 'bottom-start' }"
        >
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

          <template #account="{ item }">
            <div class="text-left">
              <p>Signed in as</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>

          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>
            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </template>
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add a smooth transition for the box-shadow effect */
.transition-shadow {
  transition: box-shadow 0.3s ease-in-out;
}
</style>
