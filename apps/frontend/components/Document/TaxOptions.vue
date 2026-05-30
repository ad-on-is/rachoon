<script setup>
const document = useDocument().item;
const taxOptions = useSettings().settings.taxes.options;

const taxOption = ref(document.data.taxOption?.title);

watch(
  () => taxOption.value,
  (option) => {
    const selectedOption = taxOptions.find((o) => o.title === option);
    if (selectedOption) {
      useDocument().setTaxOption(selectedOption);
    }
  },
);
</script>

<template>
  <div class="prose">
    <h3 class="mb-3">Tax</h3>
  </div>
  <select class="select select-bordered select-sm bg-base-300 max-w-56" v-model="taxOption" :disabled="useDocument().isDisabled()">
    <option value="null" key="default">Select Tax option</option>
    <option v-for="(o, i) in taxOptions" :value="o.title" :key="o.title">
      {{ o.title }}
    </option>
  </select>
</template>
