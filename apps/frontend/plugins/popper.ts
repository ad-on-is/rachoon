import { defineNuxtPlugin } from 'nuxt/app'

import Popper from 'vue3-popper'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Popper', Popper)
})
