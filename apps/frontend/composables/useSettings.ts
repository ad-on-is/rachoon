import useApi from "./useApi";

import { type TaxOption } from "@repo/common";

class SettingsStore {
  settings = useProfile().me.organization.settings;
  organizationData = useProfile().me.organization.data;
  save = async () => {
    await useApi().organization().save(useProfile().me.organization);
  };

  selectFile = async (e) => {
    const file = e.target.files[0];

    /* Make sure file exists */
    if (!file) return;
    const readData = (f): Promise<any> =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(f);
      });
    const data = await readData(file);
    const size = data.length / 1024;
    const { $toast } = useNuxtApp();

    if (size > 16) {
      useToast("Invalid image", "The image is too large", "error");

      return;
    } else {
      useProfile().me.organization.data.logo = data as string;
    }
  };
}

export default defineStore("settings", () => new SettingsStore());
