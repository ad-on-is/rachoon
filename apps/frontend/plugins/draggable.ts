import { defineNuxtPlugin } from "nuxt/app";

import draggable from "vuedraggable";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Draggable", draggable);
});
