<script setup lang="ts">
import { DocumentStatus, EInvoiceType } from "@repo/common";
const eInvoiceTypes = Object.values(EInvoiceType);
const stati = [DocumentStatus.Draft, DocumentStatus.Pending];
</script>
<template>
  <FormSection title="Invoice" description="Configure your invoice settings.">
    <div class="grid grid-cols-2">
      <div class="">
        <label class="label w-full max-w-xs">
          <span class="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Invoice"
          v-model="useSettings().settings.invoices.title"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>

      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Due in</span>
        </label>
        <label class="input-group">
          <input
            type="text"
            placeholder="10"
            v-maska="'#*'"
            v-model="useSettings().settings.invoices.dueDays"
            required
            class="input input-bordered input-sm w-full max-w-xs"
          />
          <span class="text-sm text-info">days</span>
        </label>
      </div>

      <div>
        <label class="label">Default Status</label>
        <select class="select select-bordered select-sm bg-base-300 max-w-56" v-model="useSettings().settings.invoices.status">
          <option v-for="t in stati" :value="t" :key="t">
            {{ DocumentStatus[t] }}
          </option>
        </select>
      </div>
      <div>
        <label class="label">Default E-Invoice Type</label>
        <select class="select select-bordered select-sm bg-base-300 max-w-56" v-model="useSettings().settings.invoices.eInvoiceType">
          <option v-for="t in eInvoiceTypes" :value="t" :key="t">
            {{ t }}
          </option>
        </select>
      </div>
    </div>

    <SettingsFormat entity="invoices" />
  </FormSection>

  <FormSection title="Offers" description="Configure your offer settings.">
    <div class="grid grid-cols-2">
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Offer"
          v-model="useSettings().settings.offers.title"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>

      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Due in</span>
        </label>
        <label class="input-group">
          <input
            type="text"
            placeholder="10"
            v-maska="'#*'"
            v-model="useSettings().settings.offers.dueDays"
            required
            class="input input-bordered input-sm w-full max-w-xs"
          />
          <span class="text-sm text-info">days</span>
        </label>
      </div>
      <div>
        <label class="label">Default Status</label>
        <select class="select select-bordered select-sm bg-base-300 max-w-56" v-model="useSettings().settings.offers.status">
          <option v-for="t in stati" :value="t" :key="t">
            {{ DocumentStatus[t] }}
          </option>
        </select>
      </div>
    </div>
    <SettingsFormat entity="offers" />
  </FormSection>

  <FormSection title="Reminders" description="Configure your reminder settings.">
    <div class="grid grid-cols-2">
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Offer"
          v-model="useSettings().settings.reminders.title"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>

      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Due in</span>
        </label>
        <label class="input-group">
          <input
            type="text"
            placeholder="10"
            v-maska="'#*'"
            v-model="useSettings().settings.reminders.dueDays"
            required
            class="input input-bordered input-sm w-full max-w-xs"
          />
          <span class="text-sm text-info">days</span>
        </label>
      </div>
      <div>
        <label class="label">Default Status</label>
        <select class="select select-bordered select-sm bg-base-300 max-w-56" v-model="useSettings().settings.reminders.status">
          <option v-for="t in stati" :value="t" :key="t">
            {{ DocumentStatus[t] }}
          </option>
        </select>
      </div>
    </div>
    <SettingsFormat entity="reminders" />
  </FormSection>

  <SettingsReminderFees />
</template>
