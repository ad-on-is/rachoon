<script setup lang="ts">
import { DocumentType } from "@repo/common";
import { onClickOutside } from "@vueuse/core";

const document = useDocument().item;
const positions = document.data.positions;
const discountsCharges = document.data.discountsCharges;

const formRef = ref(null);

onClickOutside(formRef, () => {
  document.unfocusPositions();
});
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-compact table-sm w-full">
      <thead>
        <tr>
          <th width="20" class="bg-info bg-opacity-10 bg-op"></th>
          <th>Position</th>
          <th width="200" v-if="document.type !== DocumentType.Reminder">Quantity</th>
          <th width="170">Price</th>
          <th width="120" v-if="document.type !== DocumentType.Reminder">Tax</th>
          <th width="120" v-if="document.type !== DocumentType.Reminder">Discount</th>
          <th width="200" class="text-right">Total Net</th>
          <th width="50"></th>
        </tr>
      </thead>

      <Draggable :list="positions" item-key="id" tag="tbody" handle=".handle" ghost-class="ghost" ref="formRef">
        <template #item="{ _, index }">
          <DocumentItemPosition :index="index" />
        </template>
      </Draggable>
    </table>
  </div>

  <div class="flex justify-center mt-5 mb-10">
    <button :disabled="document.disabled()" class="btn btn-xs btn-outline gap-1" @click="document.addPosition()">
      <FaIcon icon="fa-add mr-5" />
      Add position
    </button>
  </div>
  <div class="divider"></div>
  <table class="table document-line table-compact w-full shadow-lg table-info" v-if="discountsCharges.length > 0">
    <thead>
      <tr>
        <th width="20"></th>
        <th width="200" class="bg-primary primary bg-opacity-10">Discount/Charge</th>
        <th>Title</th>
        <th width="170">Value</th>
        <th width="50"></th>
      </tr>
    </thead>

    <Draggable :list="discountsCharges" item-key="id" tag="tbody" handle=".handle" ghost-class="ghost">
      <template #item="{ _, index }">
        <DocumentItemDiscountCharge :index="index" />
      </template>
    </Draggable>
  </table>
  <p v-else class="text-info text-center" :class="document.disabled() ? 'opacity-30' : ''">
    Add discounts or charges to apply them on the subtotal.
  </p>
  <div class="flex justify-center mt-5">
    <button class="btn btn-xs btn-info btn-outline mb-10 gap-1" @click="document.addDiscountCharge()" :disabled="document.disabled()">
      <FaIcon icon="fa-add" />
      Add discount or charge
    </button>
  </div>
</template>

<style scoped>
.modal-box {
  max-width: 80vw;
  height: 90vh;
}
</style>
