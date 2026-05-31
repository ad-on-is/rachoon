import {
  DCType,
  Document,
  DocumentStatus,
  DocumentType,
  Recurring,
  ValueType,
  type TaxOption,
  ConvertOption,
  Helpers,
  Client,
} from "@repo/common";
import { DateTime } from "luxon";

import _ from "lodash";
import type { Template } from "~/models/template";
import Base from "./_base";

class DocumentStore extends Base<Document> {
  clients = ref<Client[]>([]);
  templates = ref<Template[]>([]);
  mustSave = ref(-1);
  offer = ref(new Document());
  reminderInvoice = ref(new Document());
  recurring = ref(new Recurring());

  offerToInvoiceOption = ref(ConvertOption.Full);
  offerToInvoiceValue = ref(1);
  offerToInvoiceValueType = ref(ValueType.Percent);
  canBeDraft = ref(false);

  parentList = this.list;

  isOfferToConvert = () => this.isNew() && useRoute().query.offer;
  isInvoice = () => this.singularType() === "invoice";
  isOffer = () => this.singularType() === "offer";
  isReminder = () => this.singularType() === "reminder";
  isDisabled = () => false;

  setTemplate = (id: string) => {
    this.item.value.templateId = id;
  };

  searchClient = async (query: string) => {
    const clients = await useApi().clients().getForAutoComplete(query);
    this.clients.value = [...this.clients.value, ...clients];
  };

  setClient = (client: Client) => {
    this.item.value.clientId = client.id;
    this.item.value.client = client;
    if (client.data.conditions.discount.value > 0) {
      (client.data.conditions.discount.value,
        client.data.conditions.discount.valueType,
        this.item.value.addDiscountCharge({
          id: Date.now().toString(),
          title: "Client discount",
          type: DCType.Discount,
          value: client.data.conditions.discount.value,
          valueType: client.data.conditions.discount.valueType,
          amount: 0,
        }));
    }
    if (this.item.value.data.positions[0].price === null && this.item.value.data.positions[0].quantity === null) {
      this.item.value.removePosition(0);
    }
    this.item.value.rebuild();
  };

  toggleDraft = (draft: boolean) => {
    if (draft) {
      this.item.value.status = DocumentStatus.Draft;
    } else {
      this.item.value.status = DocumentStatus.Pending;
    }
    this.setNumberByStatus(this.item.value.status);
  };

  setStatus = (d: Document) => {
    if (d.invoices.length > 0) {
      useToast("Cannot change status", "Offer is already invoiced.", "warning");
      return;
    }
    if (d.status === DocumentStatus.Draft) {
      return;
    }
    const status =
      d.status === DocumentStatus.Pending
        ? d.type === DocumentType.Invoice
          ? DocumentStatus.Paid
          : DocumentStatus.Accepted
        : DocumentStatus.Pending;
    d.setStatus(status);
    useApi().documents(this.docType()).setStatus(d.id, status);
  };

  list = async () => {
    this.getAllFunc = useApi().documents(this.docType()).getAll;
    this.parentList();
  };

  docType = (): DocumentType => {
    return DocumentType[this.singularType(true) as keyof typeof DocumentType];
  };

  save = async () => {
    try {
      const ioo = await useApi().documents(this.docType()).saveOrUpdate(this.item.value, !this.isNew());
      if (this.isNew()) {
        useRouter().replace(`/${this.type()}/${ioo.id}`);
      }
    } catch (e) {}
    this.mustSave.value = 0;
  };

  preview = async () => {
    return (await useApi().render(this.item.value, true)) as string[];
  };

  download = async (io?: Document) => {
    const dio = io || this.item.value;
    const data = (await useApi().render(dio)) as string;
    let a = document.createElement("a");
    a.href = data;
    a.download = dio!.number + ".pdf";
    a.click();
  };

  updated = () => {
    this.item.value.rebuild();
    this.mustSave.value++;
  };

  duplicate = async (id: string) => {
    this.loading.value = true;
    const duplicate = await useApi().documents(this.docType()).duplicate(id);
    useRouter().push(`/${this.type()}/${duplicate.id}`);
    this.loading.value = false;
  };

  handleReminder = async () => {
    this.reminderInvoice.value = await useApi()
      .documents(DocumentType.Invoice)
      .get(useRoute().query.invoice as string);
    this.item.value.data.positions[0] = {
      net: this.reminderInvoice.value.data.total,
      tax: 0,
      text: "",
      unit: "",
      price: this.reminderInvoice.value.data.total,
      title: this.reminderInvoice.value.number,
      total: this.reminderInvoice.value.data.total,
      quantity: 1,
      totalPercentage: 100,
    };
    if (useSettings().settings.reminders.fees.length > 0) {
      for (const fee of useSettings().settings.reminders.fees) {
        this.item.value.data.discountsCharges.push(fee);
      }
    } else {
      this.item.value.data.discountsCharges.push({
        title: "Reminder fee",
        value: 5,
        type: DCType.Charge,
        valueType: ValueType.Fixed,
        amount: 0,
      });
    }
    this.item.value.clientId = this.reminderInvoice.value.clientId;
    this.item.value.client = this.reminderInvoice.value.client;
    this.item.value.invoiceId = this.reminderInvoice.value.id;
    this.item.value.data.taxOption = {};
    this.item.value.calculate();
  };

  setNumberByStatus = async (status: DocumentStatus) => {
    if (status === DocumentStatus.Pending) {
      const [number, _] = await useApi().number(this.docType()).get();
      this.item.value.number = number;
    } else {
      this.item.value.number = "DRAFT-" + Date.now();
    }
  };

  handleNew = async () => {
    this.canBeDraft.value = true;
    new Promise(async (r) => {
      this.clients.value = await useApi().clients().getForAutoComplete();
      r(true);
    });

    this.recurring.value = new Recurring();

    new Promise(async (r) => {
      const defaultStatus = useSettings().settings[this.type()].status;
      this.item.value.status = defaultStatus;

      await this.setNumberByStatus(defaultStatus);
      r(true);
    });

    this.item.value.data.dueDate = DateTime.fromJSDate(this.item.value.data.dueDate)
      .plus({ days: useSettings().settings[this.type()].dueDays })
      .toJSDate();

    this.item.value.data.taxOption = useSettings().settings.taxes.options.filter((o) => o.default)[0];

    if (this.type() === "reminders") {
      this.handleReminder();
    }
    if (this.offer.value) await this.handleOfferToInvoice();
  };

  form = async () => {
    this.loading.value = true;
    this.canBeDraft.value = false;
    new Promise(async (r) => {
      this.templates.value = (await useApi().templates().getAll()).rows;
      r(true);
    });
    const id = useRoute().params["id"] as string;

    this.item.value = new Document();
    this.item.value.type = this.docType();
    if (this.isNew()) {
      await this.handleNew();
    } else {
      this.item.value = Helpers.merge<Document>(this.item.value, await useApi().documents(this.docType()).get(id));
      if (this.item.value.status === DocumentStatus.Draft) {
        this.canBeDraft.value = true;
      }
      if (this.item.value.recurringInvoice) {
        this.recurring.value = this.item.value.recurringInvoice;
      } else {
        this.recurring.value = new Recurring();
      }
    }

    this.item.value.rebuild();
    this.mustSave.value = -1;
    this.loading.value = false;
  };

  setTaxOption = (Option: TaxOption) => {
    this.item.value.data.taxOption = Option;
    this.updated();
  };

  delete = async (id?: string) => {
    useApp().confirm(async () => {
      await useApi()
        .documents(this.docType())
        .delete(id || this.item.value.id);
      if (id) {
        this.items.value = this.items.value.filter((i) => i.id !== id);
      } else {
        useRouter().replace(`/${this.type()}/`);
      }
    }, `Are you sure you want to delete ${this.singularType()} ${this.item.value.number}?`);
  };

  calculateOfferToInvoice = () => {
    const option = this.offerToInvoiceOption.value;
    const value = Number(this.offerToInvoiceValue.value);
    const valueType = this.offerToInvoiceValueType.value;
    this.item.value.calculateInvoiceToConvertPositions({ ...this.offer.value }, option, value, valueType);
  };

  handleOfferToInvoice = async () => {
    if (useRoute().query.offer) {
      _.mergeWith(
        this.offer.value,
        await useApi()
          .documents(DocumentType.Offer)
          .get(useRoute().query.offer as string),
      );
      this.offer.value.rebuild();
      this.item.value.client = this.offer.value.client;
      this.item.value.clientId = this.offer.value.clientId;
      this.item.value.offerId = this.offer.value.id;
      this.calculateOfferToInvoice();
    } else {
      _.mergeWith(this.offer.value, new Document());
    }
  };
}

export default defineStore("document", () => new DocumentStore(ref(new Document()), useApi().documents(DocumentType.Invoice).getAll));
