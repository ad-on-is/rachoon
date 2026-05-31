import { Client } from "@repo/common";
import _ from "lodash";
import Base from "./_base";

class ClientStore extends Base<Client> {
  save = async (e: Event) => {
    super.save(e);
    const c = await useApi().clients().saveOrUpdate(this.item.value!, !this.isNew());
    if (this.isNew()) {
      useRouter().replace(`/clients/${c.id}`);
    }
  };

  delete = async (id?: string) => {
    useApp().confirm(async () => {
      await useApi()
        .clients()
        .delete(id || this.item.value.id);

      if (id) {
        this.items.value = this.items.value.filter((i) => i.id !== (id || this.item.value.id));
      } else {
        useRouter().replace(`/${this.type()}/`);
      }
    }, `Are you sure you want to delete the client ${this.item.value.name}?`);
  };

  form = async () => {
    const id = useRoute().params["id"] as string;

    this.loading.value = true;
    this.item.value = new Client();
    if (id === "new") {
      const [number, _] = await useApi().number("client").get();
      this.item.value.number = number;
    } else {
      this.item.value = _.mergeWith(this.item.value, await useApi().clients().get(id));
    }

    this.loading.value = false;
  };
}

export default defineStore("client", () => new ClientStore(ref(new Client()), useApi().clients().getAll));
