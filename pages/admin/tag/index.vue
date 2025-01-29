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
const { data: categories, status } = await useLazyAsyncData(
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

const { error: categoryError, execute: createCategory } =
  await useLazyAsyncData("category-create", () =>
    ($fetch as any)(`http://localhost:8000/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
        "X-XSRF-TOKEN": cookie?.value,
      },
      credentials: "include",
      body: state,
    })
  );

//console.log(categoryError.value.data.errors.name[0]);

const submitForm = async () => {
  await createCategory();
};

const state = reactive({
  name: undefined,
  description: undefined,
});

const form = ref();

async function onSubmit() {
  form.value!.clear();
  try {
    createCategory();
  } catch (err) {
    console.log("🚀 ~ onSubmit ~ err:", err);

    if (err.statusCode === 422) {
      form.value!.setErrors(
        err.data.errors.map((err) => ({
          message: err.message,
          path: err.path,
        }))
      );
    }
  }
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

    <UTable :rows="categories?.data" />

    <template #footer>
      <div class="flex justify-end items-center gap-4">
        <UButton @click="page > 1 ? page-- : (page = 1)">Preview</UButton>
        <UButton @click="page++">Next</UButton>
      </div>
    </template>
  </UCard>

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
        </div>
      </template>
      <!-- <UForm :state="formData" @submit.prevent="submitForm">
        {{ categoryError?.value?.data }}
        <div class="space-y-3 text-theme-white-2">
          <div class="space-y-1">
            <label for="">Name <span class="text-red-500">*</span></label>
            <UInput
              color="white"
              v-model="formData.name"
              variant="outline"
              placeholder="Category name..."
            />
          </div>

          <div class="space-y-1">
            <label for="">Description</label>
            <UTextarea
              autoresize
              v-model="formData.description"
              placeholder="Description..."
            />
          </div>

          <UButton type="submit">
            Submit
            <template #leading></template>
          </UButton>
        </div>
      </UForm> -->

      <UForm ref="form" :state="state" @submit="onSubmit">
        <UFormGroup label="Email" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Password" name="description">
          <UInput v-model="state.description" />
        </UFormGroup>

        <UButton type="submit"> Submit </UButton>
      </UForm>
      <template #footer></template>
    </UCard>
  </USlideover>
</template>
