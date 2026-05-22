import { Settings } from "./Settings";
import _ from "lodash";

export interface OrganizationData {
  info: {
    vat: string;
    addition: string;
  };
  payment: {
    iban: string;
    bic: string;
    accountHolder: string;
  };
  contactPerson: {
    fullName: string;
    email: string;
  };
  address: {
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  logo: string;
}

class Organization {
  id: string = "";
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  name: string = "";
  slug: string = "";
  data: OrganizationData = {
    address: { street: "", zip: "", city: "", country: "" },
    info: { vat: "", addition: "" },
    payment: { iban: "", bic: "", accountHolder: "" },
    contactPerson: { fullName: "", email: "" },
    logo: "",
  };
  settings: Settings = new Settings();

  constructor(json?: any) {
    if (json) {
      _.merge(this, json);
      this.settings = new Settings(this.settings);
    }
  }
  public toJSON() {
    return { ...this };
  }
}

export { Organization };
