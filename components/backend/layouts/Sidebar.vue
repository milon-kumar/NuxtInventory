<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const menus = [
  {
    type: "menu",
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: "solar:widget-4-linear",
    color: "primary-400 dark:primary-400",
  },
  {
    type: "separator",
  },
  {
    type: "menu",
    name: "Category",
    path: "/admin/category",
    icon: "solar:layers-bold-duotone",
    color: "primary-400",
  },
  {
    type: "menu",
    name: "Unit",
    path: "/admin/unit",
    icon: "solar:tuning-2-bold-duotone",
    color: "primary-400",
  },
  {
    type: "menu",
    name: "Products",
    path: "/admin/products",
    icon: "tabler:brand-producthunt",
    color: "blue-500",
  },
];

const actions = [
  [{
    key: 'completed',
    label: 'Completed',
    icon: 'i-heroicons-check'
  }], [{
    key: 'uncompleted',
    label: 'In Progress',
    icon: 'i-heroicons-arrow-path'
  }]
]

const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <div
    class="w-64 fixed bottom-0 border-r text-white border-theme-dark-2 bg-theme-dark z-50 h-screen"
  >
    <div class="px-3">
      <ul>
        <NuxtLink to="/admin/dashboard">
          <div class="my-4 text-center uppercase text-xl font-bold">
            <h3>Milon Inventory</h3>
          </div>
        </NuxtLink>
        <template v-for="menu in menus">
          <li
            :key="menu.name"
            v-if="menu?.type === 'menu'"
            :class="{ 'bg-theme-dark-2': isActive(menu?.path) }"
            class="text-theme-white-2 rounded-sm group hover:bg-theme-dark-2"
          >
            <NuxtLink
              :to="menu?.path"
              class="flex items-center gap-2 px-4 py-2 rounded-md text-sm"
            >
            <UIcon :name="menu?.icon" class="w-5 h-5" />

              <span :class="isActive(menu?.path) && `text-${menu?.color}`">{{
                menu?.name
              }}</span>
            </NuxtLink>
          </li>
          <hr
            v-if="menu?.type === 'separator'"
            class="my-2 border-theme-dark-2"
          />
        </template>
      </ul>
    </div>
  </div>
</template>