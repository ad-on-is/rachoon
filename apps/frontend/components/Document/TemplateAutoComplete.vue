<script setup lang="ts">
import TypeAhead from "vue3-simple-typeahead";
import type { Template } from "@repo/common";
const val = ref("");
defineProps({
  placeholder: { type: String, default: "Type for autocomplete ..." },
});
</script>
<template>
  <TypeAhead
    class="input input-bordered input-sm w-full max-w-xs"
    :placeholder="$props.placeholder"
    :items="useDocument().templates"
    :minInputLength="1"
    :value="val"
    @onInput="(i: any) => (val = i.input)"
    @selectItem="
      (i: Template) => {
        val = `${i.title}`;
        useDocument().setTemplate(i.id);
      }
    "
    :itemProjection="
      (item: Template) => {
        return `${item.title}`;
      }
    "
  >
    <template #list-item-text="slot">
      <span v-html="slot.boldMatchText(slot.item.title)"></span>
    </template>
  </TypeAhead>
</template>
