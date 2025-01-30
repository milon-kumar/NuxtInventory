<script lang="ts" setup>
import { ref, watch } from "vue";

definePageMeta({
  layout: "backend-layout",
});

const search = ref("");
const page = ref(1);
const parPage = ref(10);
const isOpen = ref(false);
const cookie = useCookie("XSRF-TOKEN");
const pending = ref(false);
const error = ref(false);
const isLoading = ref(false);
const isError = ref(false);
const config = useRuntimeConfig();

const columns = [
  {
    key: "id",
    label: "#SL",
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "slug",
    label: "Slug",
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
];


const { data: categories, status , execute: getCategories } = await useLazyAsyncData(
  "categories",
  () =>
    ($fetch as any)(`${config.public.apiUrl}/category`, {
      params: {
        page: page.value,
        search: search.value,
        per_page: parPage.value,
      },
    }),
  {
    watch: [search, page, parPage],
  }
);


watch(pending, (loading) => {
  isLoading.value = loading;
});

watch(error, (err) => {
  isError.value = err;
});

const formData = reactive({
  name: "",
  description: "",
});

const {
  status: categoryCreateStatus,
  error: categoryError,
  execute: createCategory,
} = await useLazyAsyncData("category-create", () =>
  ($fetch as any)(`http://localhost:8000/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accpet: "application/json",
      "X-XSRF-TOKEN": cookie?.value,
    },
    credentials: "include",
    body: state,
  }),{immediate: false}
);


const form = ref();

const onSubmit = () => { 
  form.value?.clear();
  isOpen.value = false;
}


</script>

<template>
  <UCard
    class="w-full rounded-sm border border-gray-200 dark:border-gray-700"
    :ui="{
      base: '',
      ring: '',
      background: 'bg-white dark:bg-theme-dark',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: {
        padding: '',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
      footer: { padding: 'p-4' },
    }"
  >
    <template #header>
      <h2
        class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
      >
        Categories
      </h2>
    </template>

    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <div class="flex items-center gap-2">
        <UInput v-model="search" placeholder="Search..." />
        <USelect
          v-model="parPage"
          :options="[5, 10, 20, 30, 40]"
          class="me-2 w-20"
        />
      </div>
      <UButton @click="isOpen = true">Create</UButton>
    </div>

    <UTable :rows="categories?.data" :columns="columns">
      <template #status-data="{ row }">
        <UBadge
          size="xs"
          :label="row.status === 'active' ? 'Active' : 'Inactive'"
          :color="row.status === 'active' ? 'green' : 'orange'"
        />
      </template>
      <template #actions-data="{ row }">
        <div class="flex gap-2">
          <!-- Edit Button -->
          <UButton
            icon="i-heroicons-pencil-square"
            size="xs"
            color="primary"
            variant="solid"
            label="Edit"
          />
          
          <!-- Delete Button -->
          <UButton
            icon="i-heroicons-trash"
            size="xs"
            color="red"
            variant="solid"
            label="Delete"
          />
        </div>
      </template>
    </UTable>

    <template #footer>
      <div class="flex justify-end items-center gap-4">
        <UButton @click="page > 1 ? page-- : (page = 1)">Preview</UButton>
        <UButton @click="page++">Next</UButton>
      </div>
    </template>
  </UCard>

  <template>
  <UDrawer direction="top">

    <template #content>
      <Placeholder class="h-96 m-4" />
    </template>
  </UDrawer>
</template>


  <USlideover
    v-model="isOpen"
    prevent-close
    :ui="{
      background: 'bg-white dark:bg-theme-dark',
    }"
  >
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        background: 'bg-white dark:bg-theme-dark',
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-theme-white-2"
          >
            Create Category
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />

          <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

        </div>
      </template>

      <UForm ref="form" :state="formData" @submit="onSubmit" class="space-y-3">
        <UFormGroup label="Name" required name="name">
          <UInput v-model="formData.name" placeholder="Category name..." />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
          <UTextarea
            autoresize
            placeholder="Description..."
            v-model="formData.description"
          />
        </UFormGroup>

        <UButton type="submit" :loading="categoryCreateStatus === 'loading'"> Submit </UButton>
      </UForm>
      <template #footer></template>
    </UCard>
  </USlideover>
</template>
