import { Dashboard } from "@repo/common";

class DashboardStore {
  dashboard = ref(new Dashboard());
  loading = ref(true);

  get = async () => {
    this.loading.value = true;
    this.dashboard.value = await useApi().dashboard().get();
    this.loading.value = false;
  };
}

export default defineStore("dashboard", () => new DashboardStore());
