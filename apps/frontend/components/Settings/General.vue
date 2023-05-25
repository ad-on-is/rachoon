<script setup>
import * as dateFns from "date-fns";
const date = dateFns.format(Date.now(), "yyyy-MM-dd H:m:s");
</script>
<template>
  <div class="prose mt-5">
    <h2>General</h2>
  </div>
  <div class="divider opacity-50"></div>
  <div class="grid grid-cols-2 gap-5">
    <div class="grid grid-cols-2 gap-5">
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Currency</span>
        </label>
        <select
          class="select select-bordered select-sm bg-base-300"
          v-model="useSettings().settings.general.currency"
        >
          <option v-for="c in useCountries.currencies" :value="c.cc">
            {{ c.cc }} ({{ c.symbol }})
          </option>
        </select>
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">Locale</span>
        </label>
        <select
          class="select select-bordered select-sm bg-base-300"
          v-model="useSettings().settings.general.locale"
        >
          <option v-for="(v, k) in useCountries.locales" :value="k">
            {{ v[1] }}
          </option>
        </select>
      </div>
    </div>

    <div class="text-center prose">
      <p>Currency preview</p>
      <h2 class="text-info m-0 p-0">
        {{ useFormat.toCurrency(100000) }}
      </h2>
      <p class="mt-5">Date preview</p>
      <h2 class="text-warning m-0 p-0">
        {{ useFormat.date(date) }}
      </h2>
    </div>
  </div>
</template>
