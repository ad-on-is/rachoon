import { Token, User, Helpers, type TaxOption } from "@repo/common";
import _ from "lodash";

class ProfileStore {
  me = ref<User>(new User());
  loading = ref(false);
  newPassword = ref(null);
  newPasswordRepeat = ref(null);
  tokens = ref<Array<Token>>([]);
  init = async () => {
    this.loading.value = true;
    try {
      if (useAuth().key() && this.me.value.id === null) {
        this.me.value = Helpers.merge(this.me.value, await useApi().profile().get());

        this.me.value.organization.settings.taxes.options = Helpers.appendTaxOptions(this.me.value.organization.settings.taxes.options);
      }
    } catch (e) {
      console.error("useProfile", e);
    }
    this.loading.value = false;
  };

  getTokens = async () => {
    this.tokens.value = await useApi().tokens().getAll();
  };

  deleteToken = async (token: Token) => {
    useApp().confirm(async () => {
      const index = _.findIndex(this.tokens.value, { id: token.id });
      if (index > -1) {
        this.tokens.value.splice(index, 1);
      }
      await useApi().tokens().delete(token.id!);
    }, `Are you sure you want to delete token: ${token.name}?`);
  };

  save = async (e: Event) => {
    e.preventDefault();
    useApi().profile().save(this.me.value);
  };

  selectFile = async (e: any) => {
    const file = e.target.files[0];

    /* Make sure file exists */
    if (!file) return;
    const readData = (f: any): Promise<any> =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(f);
      });
    const data = await readData(file);
    const size = data.length / 1024;

    if (size > 5) {
      useToast("Invalid image", "The image is too large", "error");
      return;
    } else {
      this.me.value.data.avatar = data as string;
    }
  };

  savePassword = (e: Event) => {
    e.preventDefault();
    if (this.newPassword.value !== this.newPasswordRepeat.value) return;
    useApi().profile().savePassword(this.newPassword.value);
  };
}

export default defineStore("profile", () => new ProfileStore());
