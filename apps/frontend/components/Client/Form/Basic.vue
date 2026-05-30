<script setup lang="ts">
const controller = () => useClient();
</script>
<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            Organization name
            <span class="text-error">*</span>
          </span>
        </label>
        <input
          type="text"
          v-model="controller().item.name"
          placeholder="Organization name"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Name addition</span>
        </label>
        <input
          type="text"
          v-model="controller().item.data.info.addition"
          placeholder=""
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">VAT-Number</span>
        </label>
        <input
          type="text"
          placeholder="VAT-Number"
          v-model="controller().item.data.info.vat"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Reference</span>
        </label>
        <input
          type="text"
          placeholder="12-ABCDEF-34"
          v-model="controller().item.data.info.reference"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
    </div>
  </div>
</template>
