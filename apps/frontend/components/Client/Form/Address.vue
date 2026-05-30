<script setup lang="ts">
const controller = () => useClient();
</script>
<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            Street
            <span class="text-red-700">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="Street"
          v-model="controller().item.data.address.street"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            ZIP
            <span class="text-red-700">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="ZIP"
          v-model="controller().item.data.address.zip"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            City
            <span class="text-red-700">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="City"
          v-model="controller().item.data.address.city"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            Country
            <span class="text-red-700">*</span>
          </span>
        </label>
        <select class="select select-bordered select-sm bg-base-300 w-full max-w-xs" v-model="controller().item.data.address.country">
          <option v-for="c in useCountries.countries" :value="c.abbreviation">
            {{ c.country }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
