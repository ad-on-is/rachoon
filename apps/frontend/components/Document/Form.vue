<script setup lang="ts">
import { DocumentStatus } from "@repo/common";

const controller = () => useDocument();
const isDraft = ref(false);
controller().form();
onMounted(() => {
  isDraft.value = controller().item.status === DocumentStatus.Draft;
  watch(
    // fixes the problem where old,new values are the same
    [
      computed(() => JSON.stringify(controller().item.data.positions)),
      computed(() => JSON.stringify(controller().item.data.discountsCharges)),
      computed(() => JSON.stringify(controller().item.data.taxOption)),
      computed(() => JSON.stringify(controller().item.data.date)),
      computed(() => JSON.stringify(controller().item.data.dueDate)),
    ],
    () => {
      controller().updated();
    },
  );
});

async function save() {
  await controller().save();
}

const settingsModal = ref(null);
const recurringModal = ref(null);
const offerToInvoiceModal = ref(null);

const offerNumber = controller().isOfferToConvert() ? ` from ${controller().offer.number}` : "";

const convert = () => {
  controller().calculateOfferToInvoice();
};

watch(isDraft, () => {
  controller().toggleDraft(isDraft.value);
});
</script>
<template>
  <Loading v-if="controller().loading" />

  <div v-else>
    <FormHeader
      :title="`${controller().singularType(true)}`"
      :subtitle="`#${controller().item.number}${offerNumber}`"
      icon="fa-file-invoice-dollar"
    >
      <template #buttons>
        <div v-if="controller().canBeDraft">
          <label class="label gap-2">
            <input type="checkbox" class="toggle toggle-xs toggle-info" v-model="isDraft" />
            <span class="text-xs">DRAFT</span>
          </label>
        </div>
        <div
          class="tooltip tooltip-bottom"
          data-tip="Recurring settings"
          v-if="controller().item.isRecurring || (controller().isNew() && !controller().isOfferToConvert())"
        >
          <label
            :class="`btn btn-sm btn-ghost btn-circle ${controller().recurring.active ? 'text-green-500 bg-green-900 bg-opacity-15' : ''}`"
            @click="recurringModal.showModal()"
          >
            <FaIcon icon="fa-solid fa-repeat" />
          </label>
        </div>

        <div class="tooltip tooltip-bottom" data-tip="Preview">
          <Preview />
        </div>

        <div class="tooltip tooltip-bottom" data-tip="Create invoice" v-if="controller().isOfferToConvert()">
          <label class="btn btn-sm btn-ghost btn-circle" @click="offerToInvoiceModal.showModal()">
            <FaIcon icon="fa-solid fa-file-export" />
          </label>
        </div>

        <div class="tooltip tooltip-bottom" data-tip="Download PDF" v-if="!controller().isNew() && controller().mustSave <= 1">
          <label class="btn btn-sm btn-ghost" @click="controller().download()">
            <FaIcon icon="fa-solid fa-file-pdf" />
          </label>
        </div>

        <div class="tooltip tooltip-bottom" data-tip="Duplicate">
          <label v-if="!controller().isNew()" class="btn btn-sm btn-ghost btn-circle" @click="controller().duplicate(controller().item.id)">
            <FaIcon icon="fa-solid fa-copy " />
          </label>
        </div>

        <div class="tooltip tooltip-bottom" data-tip="Create reminder" v-if="!controller().isNew() && controller().isInvoice()">
          <NuxtLink :to="`/reminders/new?invoice=${controller().item.id}`" class="btn btn-sm btn-ghost btn-circle">
            <FaIcon icon="fa-solid fa-file-lines" />
          </NuxtLink>
        </div>

        <div class="tooltip tooltip-bottom" data-tip="Options">
          <label class="btn btn-sm btn-ghost btn-circle cursor-pointer" @click="settingsModal.showModal()">
            <FaIcon icon="fa-solid fa-gear" />
          </label>
        </div>

        <label class="btn btn-sm btn-ghost text-error gap-2" v-if="!controller().isNew()" @click="controller().delete()">
          <FaIcon icon="fa-solid fa-close" />
          Delete
        </label>

        <button class="btn btn-sm btn-neutral" @click="save">
          <FaIcon icon="fa-solid fa-save " />
          Save
        </button>
      </template>
    </FormHeader>

    <dialog ref="settingsModal" class="modal">
      <div class="modal-box">
        <DocumentSettings />
      </div>
    </dialog>

    <dialog
      ref="recurringModal"
      class="modal"
      v-if="controller().item.isRecurring || (controller().isNew() && !controller().isOfferToConvert())"
    >
      <div class="modal-box">
        <DocumentRecurringForm />
      </div>
    </dialog>

    <dialog
      v-if="controller().isOfferToConvert()"
      ref="offerToInvoiceModal"
      class="modal"
      @close="convert"
      :open="controller().offer.id !== ''"
    >
      <div class="modal-box">
        <DocumentToInvoice />
      </div>
    </dialog>

    <ul v-if="controller().hasErrors" class="border-1 border-warning rounded p-5 mt-5 mb-10 mx-5">
      <li v-for="e in controller().item.errors()" class="text-warning">
        {{ e }}
      </li>
    </ul>
    <div>
      <div class="flex flex-row px-5 mb-5 pt-14">
        <div class="w-1/3 px-5 py-3">
          <div v-if="controller().isNew() && !controller().isReminder() && !controller().isOfferToConvert()">
            <label class="label">
              <span class="label-text">Select a client</span>
            </label>
            <DocumentClientAutoComplete required v-if="controller().type() !== 'reminders'" />
          </div>

          <div class="prose text-sm" v-if="controller().item.client">
            <h3 class="m-0 p-0" v-if="!controller().isNew() || controller().isOfferToConvert()">{{ controller().item.client.name }}</h3>
            <p class="m-0 p-0">
              <br />
              {{ controller().item.client.data.address.street }}
              <br />
              {{ controller().item.client.data.address.zip }}
              {{ controller().item.client.data.address.city }}
              <br />
              {{ controller().item.client.data.address.country }}
              <br />
            </p>
          </div>
        </div>
        <div class="flex flex-grow">
          <div class="w-full prose text-center pt-3" v-if="controller().item.overdue">
            <h2 class="m-0 p-0 text-warning">Invoice overdue!</h2>
            <p>You should create a reminder.</p>
            <NuxtLink class="btn btn-sm btn-neutral gap-2 no-underline" :to="`/reminders/new?invoice=${controller().item.id}`">
              <FaIcon icon="fa-solid fa-bell" />
              Create reminder
            </NuxtLink>
          </div>
        </div>
        <div class="flex w-1/3 justify-end">
          <div class="">
            <label class="label">
              <span class="label-text">Invoice date:</span>
            </label>
            <DatePicker v-model="controller().item.data.date" />
            <label class="label">
              <span class="label-text">Due date:</span>
            </label>
            <DatePicker v-model="controller().item.data.dueDate" />
          </div>
        </div>
      </div>

      <div class="alert px-5 text-error" v-if="controller().item.disabled()">
        <FaIcon icon="fa-solid fa-triangle-exclamation" />
        <p>
          This {{ controller().singularType() }} cannot be modified.
          <span v-if="controller().item.convertedFromOffer()">It's been converted from an offer.</span>
        </p>
      </div>
      <DocumentItems />
      <div class="divider p-0 m-0"></div>
      <div class="flex flex-row gap-5 px-10 bg-base-100 py-5">
        <div class="basis-2/4"></div>
        <div class="basis-1/4">
          <DocumentTaxOptions v-if="controller().type() !== 'reminders'" />
        </div>

        <div class="basis-1/4">
          <DocumentTotals />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-box {
  max-height: 800px;
}

.ghost {
  opacity: 0.5;

  td {
    @apply bg-warning-content #{!important};
  }
}

.sortable-chosen {
  opacity: 0.3;

  td {
    @apply bg-warning-content #{!important};
  }

  .collapse-content {
    display: none;
  }
}
</style>
