<script setup lang="ts">
const document = useDocument().item;
</script>

<template>
  <div class="prose max-w-full">
    <div v-if="document.data.discountsCharges.length > 0">
      <div class="flex justify-between">
        <h3 class="m-0 !text-base-content">Subtotal</h3>
        <h2 class="m-0 !text-base-content">
          {{ useFormat.toCurrency(document.data.netNoDiscount) }}
        </h2>
      </div>
      <div class="divider text-info">Discounts / Charges</div>
      <div v-for="dc in document.data.discountsCharges">
        <div class="flex justify-between" v-if="dc.title !== '' && Number(dc.value || 0) > 0">
          <h4 class="m-0 opacity-50">
            {{ dc.type === "discount" ? "-" : "+" }}
            {{ dc.title }}
            {{ dc.valueType === "percent" ? "(" + dc.value + "%)" : "" }}
          </h4>
          <h4 class="m-0 opacity-50">
            {{ useFormat.toCurrency(dc.amount) }}
          </h4>
        </div>
      </div>
      <div class="divider m-0 p-0"></div>
    </div>

    <div class="flex justify-between">
      <h3 class="m-0 !text-base-content">Net</h3>
      <h3 class="m-0 !text-base-content">
        {{ useFormat.toCurrency(document.data.net) }}
      </h3>
    </div>
    <div>
      <div class="divider m-0 p-0">
        {{ document.data.taxOption?.title }}
      </div>
      <div class="flex justify-between" v-for="(_, rate) in document.data.taxes">
        <h4 class="m-0 opacity-50">{{ rate }}%</h4>
        <h4 class="m-0 opacity-50">
          {{ useFormat.toCurrency(document.data.taxes[rate]) }}
        </h4>
      </div>
    </div>

    <div class="divider m-0 p-0"></div>
    <h1 class="text-right text-success">
      {{ useFormat.toCurrency(document.data.total) }}
    </h1>
  </div>
</template>
