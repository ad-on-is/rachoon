import {
  ValueType,
  type DiscountCharge,
  type TaxOption,
  type TaxRate,
  DCType,
} from "./Document";
import _ from "lodash";

export interface SettingsData {
  general: {
    currency: string;
    locale: string;
  };
  units: { title: string; default: boolean }[];
  invoices: {
    title: string;
    eInvoiceType: string;
    number: {
      format: string;
      padZeros: number;
    };
    dueDays: number;
  };
  offers: {
    title: string;
    number: {
      format: string;
      padZeros: number;
    };
    dueDays: number;
  };
  reminders: {
    title: string;
    number: {
      format: string;
      padZeros: number;
    };
    fees: DiscountCharge[];
    dueDays: number;
  };

  clients: {
    number: {
      format: string;
      padZeros: number;
    };
  };
  taxes: {
    rates: TaxRate[];
    options: TaxOption[];
  };
}

class Settings implements SettingsData {
  general = {
    currency: "USD",
    locale: "en-US",
  };
  invoices = {
    title: "Invoice",
    eInvoiceType: "",
    number: {
      format: "INV-{number}-{date:yMMdd}",
      padZeros: 3,
    },
    dueDays: 30,
  };
  offers = {
    title: "Offer",
    number: {
      format: "OFF-{number}-{date:yMMdd}",
      padZeros: 3,
    },
    dueDays: 30,
  };
  reminders = {
    title: "Reminder",
    number: {
      format: "REM-{number}-{date:yMMdd}",
      padZeros: 3,
    },
    fees: [] as DiscountCharge[],
    dueDays: 30,
  };

  clients = {
    number: {
      format: "CLI-{number}-{date:yMMdd}",
      start: 0,
      padZeros: 3,
    },
  };

  units = [
    { title: "hours", default: true },
    { title: "days", default: false },
  ];

  taxes = {
    rates: [
      { rate: 10, default: false },
      { rate: 20, default: true },
    ],
    options: [
      { title: "Apply Taxes", applicable: true, default: true },
      { title: "Reverse Charge", applicable: false, default: false },
    ],
  };

  constructor(json?: any) {
    if (json) {
      _.merge(this, json);
    }
  }

  public setDefaultRate(index: number) {
    this.taxes.rates.map((r) => (r.default = false));
    if (this.taxes.rates[index]) {
      this.taxes.rates[index].default = true;
    }
  }

  public setDefaultUnit(index: number) {
    this.units.map((u) => (u.default = false));
    if (this.units[index]) {
      this.units[index].default = true;
    }
  }

  public setDefaultOption(index: number) {
    this.taxes.options.map((o) => (o.default = false));
    if (this.taxes.options[index]) {
      this.taxes.options[index].default = true;
    }
  }

  public removeTaxRate(index: number) {
    this.taxes.rates.splice(index, 1);
  }
  public removeUnit(index: number) {
    this.units.splice(index, 1);
  }

  public removeFee(index: number) {
    this.reminders.fees.splice(index, 1);
  }
  public removeTaxOption(index: number) {
    this.taxes.options.splice(index, 1);
  }
  public addTaxRate() {
    this.taxes.rates.push({ rate: 0, default: false });
  }
  public addUnit() {
    this.units.push({ title: "", default: false });
  }

  public addFee() {
    this.reminders.fees.push({
      title: "Reminder fee",
      value: 0,
      amount: 0,
      type: DCType.Charge,
      valueType: ValueType.Fixed,
    });
  }
  public addTaxOption() {
    this.taxes.options.push({ title: "", default: false, applicable: true });
  }
  public toJSON() {
    return { ...this };
  }
}

export { Settings };
