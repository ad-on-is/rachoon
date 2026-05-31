<script setup>
definePageMeta({
  layout: "core",
});
useProfile().init();
useDashboard().get();
</script>

<template>
  <div>
    <Loading v-if="useDashboard().loading" />

    <div v-else class="mx-5 mt-5">
      <div class="prose mb-5 mx-5">
        <h2 class="">
          <label for="app-drawer" class="btn btn-ghost btn-sm lg:hidden"><FaIcon icon="fa-bars" /></label>

          Statistics
        </h2>
      </div>

      <div class="stats stats-vertical lg:stats-horizontal flex-col lg:flex-row flex shadow">
        <div class="stat">
          <div class="stat-figure text-info text-3xl">
            <FaIcon icon="fa-solid fa-check" />
          </div>
          <div class="stat-title text-info">Offers accepted</div>
          <div class="stat-value">
            {{ useFormat.toCurrency(useDashboard().dashboard.offers.total) }}
          </div>
          <div class="stat-desc">
            net
            {{ useFormat.toCurrency(useDashboard().dashboard.offers.net) }}
          </div>
        </div>
        <div class="stat">
          <div class="stat-figure text-success text-3xl">
            <FaIcon icon="fa-solid fa-check" />
          </div>
          <div class="stat-title text-success">Invoices paid</div>
          <div class="stat-value">
            {{ useFormat.toCurrency(useDashboard().dashboard.invoices.total) }}
          </div>
          <div class="stat-desc">
            net
            {{ useFormat.toCurrency(useDashboard().dashboard.invoices.net) }}
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-error text-3xl">
            <FaIcon icon="fa-solid fa-clock" />
          </div>
          <div class="stat-title text-error">Invoices overdue</div>
          <div class="stat-value">
            {{ useFormat.toCurrency(useDashboard().dashboard.invoices.overdue.total) }}
          </div>
          <div class="stat-desc">
            net
            {{ useFormat.toCurrency(useDashboard().dashboard.invoices.overdue.net) }}
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-warning text-3xl">
            <FaIcon icon="fa-solid fa-bell" />
          </div>
          <div class="stat-title text-warning">Reminders open</div>
          <div class="stat-value">
            {{ useFormat.toCurrency(useDashboard().dashboard.reminders.total) }}
          </div>
          <div class="stat-desc">
            net
            {{ useFormat.toCurrency(useDashboard().dashboard.reminders.net) }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10" v-if="useDashboard().dashboard.invoices.pending.length > 0">
      <div class="prose mb-5 mx-5">
        <h2 class="">Pending invoices</h2>
      </div>
      <DocumentList :canFilter="false" :showHeader="false" :list="useDashboard().dashboard.invoices.pending" type="invoices" />
      <div class="mx-5 mt-5 text-right"><NuxtLink to="/invoices" class="btn btn-xs btn-neutral no-underline">View all</NuxtLink></div>
    </div>
    <div class="mt-10" v-if="useDashboard().dashboard.offers.pending.length > 0">
      <div class="prose mb-5 mx-5">
        <h2 class="">Pending Offers</h2>
      </div>
      <DocumentList :canFilter="false" :showHeader="false" :list="useDashboard().dashboard.offers.pending" type="offers" />
      <div class="mx-5 mt-5 text-right"><NuxtLink to="/offers" class="btn btn-xs btn-neutral no-underline">View all</NuxtLink></div>
    </div>
    <div class="mt-10" v-if="useDashboard().dashboard.reminders.pending.length > 0">
      <div class="prose mb-5 mx-5">
        <h2 class="">Pending reminders</h2>
      </div>
      <DocumentList :canFilter="false" :showHeader="false" :list="useDashboard().dashboard.reminders.pending" type="reminders" />
      <div class="mx-5 mt-5 text-right"><NuxtLink to="/reminders" class="btn btn-xs btn-neutral no-underline">View all</NuxtLink></div>
    </div>
  </div>
</template>
