<script setup>
import { Format } from "@repo/common";
const props = defineProps({
  entity: String,
});
const entity = useSettings().settings[props.entity];
</script>

<template>
  <div class="grid grid-cols-2 gap-y-4">
    <div>
      <label class="label w-full max-w-xs">
        <span class="label-text">Format</span>
      </label>
      <input
        type="text"
        placeholder="VAT-Number"
        v-model="entity.number.format"
        required
        class="input input-bordered input-sm w-full max-w-xs"
      />
      <div class="text-xs mt-3">
        Placeholders:
        <span class="text-info">
          {number} {date:#FORMAT#}
          <br />
        </span>

        <a href="https://date-fns.org/v2.29.3/docs/format" target="_blank">See format options here</a>
      </div>
    </div>

    <div>
      <label class="label w-full max-w-xs">
        <span class="label-text">Pad with zeros</span>
      </label>
      <input
        type="text"
        v-maska="'#*'"
        v-model="entity.number.padZeros"
        placeholder=""
        required
        class="input input-bordered input-sm w-full max-w-xs"
      />
    </div>

    <div class="prose">
      <span class="label w-full max-w-xs">Number preview</span>
      <h2 class="m-0 p-0">
        {{ Format.number(entity.number) }}
      </h2>
    </div>
  </div>
</template>
