<script setup lang="ts">
import { EInvoiceType } from "@repo/common";

const controller = () => useDocument();
const emit = defineEmits(["close"]);
const eInvoiceTypes = Object.values(EInvoiceType);
</script>

<template>
  <div>
    <label class="label">Template</label>
    <select class="select select-bordered select-sm bg-base-300 max-w-56" v-model="controller().item.templateId">
      <option value="null" key="default">Default</option>
      <option v-for="u in controller().templates" :value="u.id" :key="u.title">
        {{ u.title }}
      </option>
    </select>
  </div>

  <div class="grid grid-cols-2 justify-between mt-2">
    <div>
      <label class="label">E-Invoice Type</label>
      <select class="select select-bordered select-sm bg-base-300 max-w-56" v-model="controller().item.data.eInvoiceType">
        <option value="" key="default">Default</option>
        <option v-for="t in eInvoiceTypes" :value="t" :key="t">
          {{ t }}
        </option>
      </select>
    </div>
    <div>
      <label class="label">Delivery Date</label>
      <DatePicker v-model="controller().item.data.deliveryDate" class="max-w-56" />
    </div>
  </div>

  <label class="label mt-5">Text before table</label>
  <Editor
    v-model="controller().item.data.headingText"
    placeholder="Add a text that will be shown before the table ..."
    class="bg-transparent"
  />

  <label class="label mt-5">Text after table</label>
  <Editor
    v-model="controller().item.data.footerText"
    placeholder="Add a text that will be shown after the table ..."
    class="bg-transparent"
  />
  <div class="divider"></div>
  <form method="dialog" class="text-right">
    <button class="btn btn-sm btn-neutral" @click="emit('close')">OK</button>
  </form>
</template>
