import { defineNuxtPlugin } from "nuxt/app";

import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;

library.add(fas, far, fab);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FaIcon", FontAwesomeIcon);
});
