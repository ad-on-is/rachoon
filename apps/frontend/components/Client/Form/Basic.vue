<template>
  <div>
    <div class="prose mb-5">
      <h2>Client</h2>
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text"
            >Organization name <span class="text-error">*</span></span
          >
        </label>
        <input
          type="text"
          v-model="useClient().client.name"
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
          v-model="useClient().client.data.info.addition"
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
          v-model="useClient().client.data.info.vat"
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
    </div>
  </div>
</template>
