<script lang="ts" setup>
definePageMeta({
  layout: 'core',
})

const tabs = ['Organization', 'General', 'Style', 'Offers', 'Invoices', 'Clients', 'Taxes', 'Units']
const activeTab = ref(Math.max(tabs.indexOf(window.location.href.split('#')[1]), 0))
const tabContents = [
  defineAsyncComponent(() => import('~/components/Settings/Organization.vue')),
  defineAsyncComponent(() => import('~/components/Settings/General.vue')),
  defineAsyncComponent(() => import('~/components/Settings/Style.vue')),
  defineAsyncComponent(() => import('~/components/Settings/Offers.vue')),
  defineAsyncComponent(() => import('~/components/Settings/Invoices.vue')),
  defineAsyncComponent(() => import('~/components/Settings/Clients.vue')),
  defineAsyncComponent(() => import('~/components/Settings/Taxes.vue')),
  defineAsyncComponent(() => import('~/components/Settings/Units.vue')),
]

function save(e) {
  e.preventDefault()
  useSettings().save()
}
</script>
<template>
  <form @submit="save">
    <div class="flex gap-2">
      <button type="submit" class="btn btn-sm btn-primary gap-2"><FaIcon icon="fa-solid fa-plus-circle " /> Save</button>
    </div>
    <div class="divider"></div>
    <div class="tabs mt-5 bg-base-200">
      <a
        v-for="(tab, i) in tabs"
        :href="'#' + tabs[activeTab]"
        class="tab tab-lifted"
        :class="i === activeTab ? 'tab-active' : ''"
        @click="activeTab = i"
      >
        {{ tab }}
      </a>
    </div>
    <div class="bg-base-100 p-5 rounded-b-lg">
      <component :is="tabContents[activeTab]" />
    </div>
  </form>
</template>

<style>
.tabs > .tab {
  flex: 1;
}

.tabs .tab-active {
  @apply bg-base-100;
}
</style>
