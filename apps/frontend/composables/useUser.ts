import { User } from "@repo/common";
import _ from "lodash";
import Base from "./_base";

class UserStore extends Base<User> {
  save = async (e: Event) => {
    super.save(e);
    const u = await useApi().users().saveOrUpdate(this.item.value!, !this.isNew());
    if (this.isNew()) {
      useRouter().replace(`/users/${u.id}`);
    }
  };

  form = async () => {
    const id = useRoute().params["id"] as string;

    this.loading.value = true;
    this.item.value = new User();
    if (id !== "new") {
      this.item.value = await useApi().users().get(id);
    }

    this.loading.value = false;
  };

  delete = async (id?: string) => {
    useApp().confirm(async () => {
      await useApi()
        .users()
        .delete(id || this.item.value.id);
      if (id) {
        this.items.value = this.items.value.filter((i) => i.id !== (id || this.item.value.id));
      } else {
        useRouter().replace(`/${this.type()}/`);
      }
    }, `Are you sure you want to delete the user ${this.item.value.data.username}?`);
  };
}

export default defineStore("user", () => new UserStore(ref(new User()), useApi().users().getAll));
