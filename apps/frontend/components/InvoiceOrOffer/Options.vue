<script setup>
const invoiceOrOffer = useInvoiceOrOffer().invoiceOrOffer
const taxOptions = useSettings().settings.taxes.options
</script>

<template>
  <div class="prose mt-5">
    <h3 class="!text-warning mb-3">Tax</h3>
    <p class="mb-5">Select a tax option</p>
  </div>
  <label class="flex flex-row gap-2 mb-2" v-for="(o, i) in taxOptions" :key="i">
    <input
      type="radio"
      name="taxoption"
      class="radio radio-warning radio-sm"
      :disabled="useInvoiceOrOffer().offerToConvert.id !== ''"
      @change="invoiceOrOffer.setTaxOption(o)"
      :checked="o.title === invoiceOrOffer.data.taxOption.title"
    />
    <span class="label-text !text-base-content">{{ o.title }}</span>
  </label>
</template>
