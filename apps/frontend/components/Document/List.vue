<script setup lang="ts">
import { Document, DocumentStatus, DocumentType } from "@repo/common";
import * as cronstrue from "cronstrue";

const props = defineProps({
  filter: { type: Array<string>, required: false, default: [] },
  list: { type: Array as () => Document[], default: null },
  type: { type: String, default: null, required: false },
  canFilter: { type: Boolean, default: true },
  showHeader: { type: Boolean, default: true },
});

const controller = () => useDocument();
if (props.filter.length === 3) {
  controller().filter([props.filter[0], props.filter[1], props.filter[2]]);
} else {
  if (!props.list) {
    controller().list();
  } else {
    controller().items = props.list;
  }
}
controller().watchSearch();
const icons = { offers: "fa-file-contract", invoices: "fa-file-invoice", reminders: "fa-file-lines" };

const getStatusClass = (row: Document): string => {
  if (row.overdue && row.status === DocumentStatus.Pending) return "error";
  if (row.status === DocumentStatus.Accepted) return "info";
  if (row.status === DocumentStatus.Paid) return "success";
  if (row.invoices.length > 0) {
    const sum = row.invoices.reduce((p, c) => (p += c.data.net), 0);
    return sum >= row.data.net ? "success" : "warning";
  }

  return "";
};

const getStatusIcon = (row: Document): string => {
  if (row.invoices.length > 0) {
    return "fa solid fa-check";
  }
  switch (row.status) {
    case DocumentStatus.Pending:
      return "fa-regular fa-clock";
    case DocumentStatus.Draft:
      return "fa-solid fa-pen-to-square";
    default:
      return "fa-solid fa-check";
  }
};

const getStatusTooltip = (row: Document): string => {
  if (row.overdue && row.status === DocumentStatus.Pending) return "Overdue";
  if (row.status === DocumentStatus.Accepted) return "Accepted";
  if (row.status === DocumentStatus.Paid) return "Paid";
  if (row.status === DocumentStatus.Draft) return "Draft";
  if (row.invoices.length > 0) {
    const sum = row.invoices.reduce((p, c) => (p += c.data.net), 0);
    return sum >= row.data.net ? "Fully invoiced" : `${useFormat.toCurrency(sum)} invoiced`;
  }
  return row.status == DocumentStatus.Pending ? "Pending" : "Sent";
};

const columns = [
  { label: "# Number", field: "number", class: "", width: "250" },
  { label: "", field: "hints", class: "text-center hidden md:table-cell", width: "60" },
  { label: "Client", field: "client", class: "hidden md:table-cell", width: "200" },
  { label: "Status", field: "status", class: "text-center", width: "100" },
  { label: "Due Date", field: "data.dueDate", class: "hidden md:table-cell", width: "120" },
  { label: "Net", field: "data.net", class: "hidden md:table-cell", width: "200" },
  { label: "Total", field: "data.total", class: "", width: "200" },
  { label: "", field: "actions", class: "text-right" },
];
</script>

<template>
  <Loading v-if="controller().loading" />

  <div v-else>
    <FormHeader
      v-if="$props.showHeader"
      :title="controller().type(true)"
      :icon="icons[controller().type() as string]"
      :divider="false"
      showSearch
      v-model="controller().search"
    >
      <template #buttons>
        <NuxtLink
          class="btn btn-new btn-sm gap-2 no-underline"
          :href="`/${controller().type()}/new`"
          v-if="controller().type() !== 'reminders'"
        >
          <FaIcon icon="fa-solid fa-plus-circle " />
          New
          {{ controller().singularType() }}
        </NuxtLink>
      </template>
    </FormHeader>

    <DataTable
      :columns="columns"
      :rows="list || controller().items"
      :sortableFields="$props.canFilter ? ['number', 'data.dueDate', 'data.net', 'data.total', 'status'] : []"
      :loading="controller().refresh"
      @doLoadMore="controller().doLoadMore()"
      :showLoadMore="controller().hasMore()"
      @sort="(sort) => controller().sort(sort)"
    >
      <template #number="{ row }">
        <NuxtLink :href="`/${$props.type || controller().type()}/${row.id}`" class="link">
          {{ row.number }}
        </NuxtLink>
        <br />
        <small class="opacity-50">last modified {{ useFormat.date(row.updatedAt) }}</small>
      </template>
      <template #hints="{ row }">
        <div
          class="tooltip"
          :data-tip="`${row.isRecurring ? `Recurs ${cronstrue.toString(row.recurringInvoice.cron, { use24HourTimeFormat: true })}` : `Created from ${row.invoice.id}`}`"
          v-if="row.isRecurring || row.isFromRecurring"
        >
          <span :class="`iconbadge ${row.isRecurring ? (row.recurringInvoice.active ? 'success' : 'warning') : ''}`">
            <NuxtLink :href="`/invoices/${row.recurringId}`" v-if="row.isFromRecurring">
              <FaIcon icon="fa-solid fa-repeat" />
            </NuxtLink>
            <FaIcon icon="fa-solid fa-repeat" v-else />
          </span>
        </div>
        <div class="tooltip" v-if="row.invoices.length > 0" data-tip="View Invoices">
          <span class="iconbadge">
            <NuxtLink :href="`/invoices/offer/${row.id}`">
              <FaIcon icon="fa-solid fa-file-invoice" />
            </NuxtLink>
          </span>
        </div>
        <div v-if="row.offer" class="tooltip" :data-tip="`Invoiced from: ${row.offer?.number}`">
          <span class="iconbadge">
            <NuxtLink :href="`/offers/${row.offer?.id}`">
              <FaIcon icon="fa-solid fa-signature" />
            </NuxtLink>
          </span>
        </div>
        <div v-if="row.overdueInvoice" class="tooltip" :data-tip="`Overdue ${row.overdueInvoice.number}`">
          <span class="iconbadge">
            <NuxtLink :href="`/invoices/${row.overdueInvoice.id}`">
              <FaIcon icon="fa-solid fa-file-invoice" />
            </NuxtLink>
          </span>
        </div>
        <div v-if="row.totalReminders > 0" class="tooltip" :data-tip="`Reminders ${row.totalReminders}`">
          <span class="iconbadge">
            <NuxtLink :href="`/reminders/invoice/${row.id}`">
              <FaIcon icon="fa-solid fa-bell" />
            </NuxtLink>
          </span>
        </div>
      </template>
      <template #client="{ row }">
        {{ row.client.name }}
        <br />
        <small class="opacity-50">{{ row.client.data.contactPerson.fullName }}</small>
      </template>
      <template #status="{ row }">
        <div class="tooltip" :data-tip="getStatusTooltip(row)">
          <span class="iconbadge" :class="getStatusClass(row)" @click="controller().setStatus(row)">
            <FaIcon :icon="getStatusIcon(row)" />
          </span>
        </div>
      </template>
      <template #data.dueDate="{ row }">
        <span :class="row.overdue ? 'text-rose-500' : ''">
          {{ useFormat.date(row.data.dueDate) }}
        </span>
      </template>
      <template #data.net="{ row }">
        {{ useFormat.toCurrency(row.data.net) }}
      </template>
      <template #data.total="{ row }">
        <div class="tooltip" :data-tip="`taxes ${useFormat.toCurrency(row.data.total - row.data.net)}`">
          <span>{{ useFormat.toCurrency(row.data.total) }}</span>
        </div>
      </template>
      <template #actions="{ row }">
        <ContextMenu>
          <li>
            <NuxtLink :to="`/${controller().type()}/${row.id}`">
              <FaIcon icon="fa-regular fa-edit" />
              Edit {{ controller().singularType(true) }}
            </NuxtLink>
          </li>
          <li>
            <label @click="controller().download(row)">
              <FaIcon icon="fa-regular fa-file-pdf" />
              Download PDF
            </label>
          </li>

          <li v-if="row.type === DocumentType.Invoice && row.overdue">
            <NuxtLink :href="`/reminders/new?invoice=${row.id}`">
              <FaIcon icon="fa-solid fa-bullhorn" />
              Create Reminder
            </NuxtLink>
          </li>

          <li>
            <label @click="controller().duplicate(row.id)" v-if="row.type !== 'reminder'">
              <FaIcon icon="fa-regular fa-copy" />
              Duplicate {{ controller().singularType(true) }}
            </label>
          </li>

          <li v-if="controller().isOffer() && row.invoices.reduce((p, c) => (p += c.data.net), 0) < row.data.net">
            <NuxtLink :to="`/invoices/new?offer=${row.id}`">
              <FaIcon icon="fa-solid fa-file-import" />
              Create Invoice
            </NuxtLink>
          </li>

          <li class="mt-2 p-0 disabled">
            <div class="divider m-0 p-0"></div>
          </li>

          <li class="mt-0">
            <label class="text-error" @click="controller().delete(row.id)">
              <FaIcon icon="fa-solid fa-close" />
              Delete
            </label>
          </li>
        </ContextMenu>
      </template>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped>
.modal-box {
  max-height: 800px;
}
</style>
