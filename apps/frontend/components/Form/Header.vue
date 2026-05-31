<template>
  <div
    :class="`header px-2 lg:px-5 py-3 flex gap-5 justify-between items-center prose ${$props.divider ? 'border-b border-base-300' : ''}`"
  >
    <h3 class="flex gap-3 items-center m-0 p-0">
      <label for="app-drawer" class="btn btn-ghost btn-sm lg:hidden"><FaIcon icon="fa-bars" /></label>
      <FaIcon :icon="`fa-solid ${$props.icon}`" />
      <span>{{ $props.title }}</span>
      <span class="text-xs mt-1 opacity-50">{{ $props.subtitle }}</span>
    </h3>

    <div class="flex gap-2">
      <input
        type="text"
        placeholder="Search…"
        class="input input-sm input-bordered hidden md:inline-block"
        v-model="search"
        v-if="$props.showSearch"
      />
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: false, default: "" },
  icon: { type: String, required: false, default: "fa-user" },
  divider: { type: Boolean, required: false, default: true },
  showSearch: { type: Boolean, required: false, default: false },
});

const search = defineModel("modelValue", { required: false });
</script>
