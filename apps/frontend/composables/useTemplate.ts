import { Template } from "@repo/common";
import _ from "lodash";
import Base from "./_base";

class TemplateStore extends Base<Template> {
  save = async (e: Event) => {
    super.save(e);
    const c = await useApi().templates().saveOrUpdate(this.item.value!, !this.isNew());
    if (this.isNew()) {
      useRouter().replace(`/${this.type}/${c.id}`);
    }
  };

  get = async (id: string): Promise<Template> => {
    this.loading.value = true;
    const t = await useApi().templates().get(id);
    this.loading.value = false;
    return t;
  };

  delete = async (id?: string) => {
    useApp().confirm(async () => {
      await useApi()
        .templates()
        .delete(id || this.item.value.id);
      if (id) {
        this.items.value = this.items.value.filter((i) => i.id !== (id || this.item.value.id));
      } else {
        useRouter().replace(`/templates/`);
      }
    }, `Are you sure you want to delete the template ${this.item.value.title}?`);
  };

  duplicate = async (id: string) => {
    this.loading.value = true;
    const duplicate = await useApi().templates().duplicate(id);
    useRouter().push(`/templates/${duplicate.id}`);
    this.loading.value = false;
  };

  form = async () => {
    const id = useRoute().params["id"] as string;

    this.loading.value = true;
    this.item.value = new Template();
    if (id !== "new") {
      this.item.value = _.mergeWith(this.item.value, await useApi().templates().get(id));
    }

    this.loading.value = false;
  };
}

export default defineStore("template", () => new TemplateStore(ref(new Template()), useApi().templates().getAll));
