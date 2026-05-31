import _ from "lodash";
import { Helpers } from "./Helpers";

export interface ClientData {
  info: {
    vat: string;
    addition: string;
    reference: string;
  };
  address: {
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  contactPerson: {
    fullName: string;
    email: string;
  };
  conditions: {
    earlyPayment: {
      discount: number | null;
      days: number | null;
    };
    invoiceDueDays: number | null;
    rate: number | null;
    discount: {
      value: number | null;
      valueType: string;
    };
  };
}

class Client {
  id: string = "";
  name: string = "";
  sequence: number | null = null;
  number: string = "";
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  data: ClientData = {
    address: { street: "", zip: "", city: "", country: "" },
    info: { vat: "", addition: "", reference: "" },
    contactPerson: { fullName: "", email: "" },
    conditions: {
      earlyPayment: { days: null, discount: null },
      invoiceDueDays: null,
      rate: null,
      discount: { value: null, valueType: "percent" },
    },
  };
  totalInvoices: number = 0;
  pendingInvoices: number = 0;
  totalOffers: number = 0;
  totalReminders: number = 0;
  pendingOffers: number = 0;

  public constructor(json?: any) {
    if (json) {
      Helpers.merge<Client>(this, json);
      if (json.updatedAt && json.createdAt) {
        this.updatedAt = new Date(Date.parse(json.updatedAt.toString()));
        this.createdAt = new Date(Date.parse(json.createdAt.toString()));
      }
    }
  }

  public errors(): string[] {
    const e: string[] = [];
    if (this.name === "") {
      e.push("Name is required");
    }

    if (this.data.contactPerson.email == "") {
      e.push("E-mail is required");
    }

    return e;
  }

  public toJSON() {
    return { ...this };
  }
}

export { Client };
