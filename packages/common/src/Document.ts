import { Client } from "./Client";
import _ from "lodash";
import { Helpers } from "./Helpers";
import { DateTime } from "luxon";

export enum DocumentStatus {
  Draft = 0,
  Pending = 1,
  Accepted = 2,
  Paid = 3,
}

export enum EInvoiceType {
  CII = "CII",
  UBL = "UBL",
  XRechnungCII = "XRECHNUNG-CII",
  XRechnungUBL = "XRECHNUNG-UBL",
  FacturXMinimum = "Factur-X-Minimum",
  FacturXBasicWL = "Factur-X-Basic WL",
  FacturXBasic = "Factur-X-Basic",
  FacturXEN16931 = "Factur-X-EN16931",
  FacturXExtended = "Factur-X-Extended",
  FacturXXRechnung = "Factur-X-XRechnung",
  PeppolBis = "PEPPOL-BIS",
}

export enum DocumentType {
  Invoice = 1,
  Offer = 2,
  Reminder = 3,
}

export enum ConvertOption {
  Full = "full",
  Partial = "partial",
  Final = "final",
}

export enum ValueType {
  Percent = "percent",
  Fixed = "fixed",
}

export enum DCType {
  Discount = "discount",
  Charge = "charge",
}

class Recurring {
  id: string = "";
  cron: string = "";
  active = false;
  startDate: Date = new Date();
  nextRun: Date = new Date();
  invoiceId: string = "";
  invoice: Document | null = null;

  constructor(json?: any) {
    if (json) {
      Helpers.merge(this, json);
      this.startDate = new Date(Date.parse(json.startDate.toString()));
      this.nextRun = new Date(Date.parse(json.nextRun.toString()));
    }
  }
  toJSON() {
    return { ...this };
  }
}

export interface Position {
  id: number;
  title: string;
  text: string;
  quantity: number;
  unit: string;
  price: number;
  tax: number;
  taxPrice: number;
  discount: number;
  net: number;
  netNoDiscount: number;
  total: number;
  focused: boolean;
  totalPercentage: number;
}

export interface TaxOption {
  title: string;
  applicable: boolean;
  default: boolean;
  code?: string;
}

export interface TaxRate {
  rate: number;
  default: boolean;
}

export interface DiscountCharge {
  id?: string;
  title: string;
  value: number;
  type: string;
  valueType: string;
  amount: number;
}

export interface DocumentData {
  title: string;
  positions: Position[];
  eInvoiceType: EInvoiceType | "";
  discountsCharges: DiscountCharge[];
  taxes: { [rate: string]: number };
  headingText: string;
  footerText: string;
  date: Date;
  dueDate: Date;
  dueDays: number;
  deliveryDate: Date | null;
  total: number;
  net: number;
  netNoDiscount: number;
  taxOption: TaxOption;
}

class Document {
  id: string = "";
  clientId: null | string = null;
  client: null | Client = null;
  number: string = "";
  status: DocumentStatus = DocumentStatus.Pending;
  offerId: null | string = null;
  templateId: null | string = null;
  invoiceId: null | string = null;
  totalReminders = 0;
  isRecurring = false;
  isFromRecurring = false;
  overdue = false;
  offer: Document | null = null;
  invoices: Document[] = [];
  recurringInvoice: Recurring | null = null;
  data = {
    title: "",
    eInvoiceType: "" as EInvoiceType,
    positions: [] as Position[],
    discountsCharges: [] as DiscountCharge[],
    taxes: {} as { [rate: string]: number },
    date: new Date(),
    dueDate: new Date(),
    deliveryDate: new Date(),
    headingText: "",
    footerText: "",
    total: 0,
    dueDays: 14,
    net: 0,
    netNoDiscount: 0,
    taxOption: {} as TaxOption,
  };

  type = DocumentType.Invoice;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  timeout: any;

  constructor(json?: any) {
    if (json) {
      if (!json.data) {
        return;
      }
      Helpers.merge(this, json);
      this.data.positions.map((p) => (p.focused = false));
      if (json.offer) {
        this.offer = new Document(json.offer);
      }

      this.invoices = (json.invoices || []).map((i: any) => new Document(i));
      this.data.date = new Date(Date.parse(json.data.date.toString()));
      this.data.dueDate = new Date(Date.parse(json.data.dueDate.toString()));
      if (json.updatedAt && json.createdAt) {
        this.updatedAt = new Date(Date.parse(json.updatedAt.toString()));
        this.createdAt = new Date(Date.parse(json.createdAt.toString()));
      }
      if (json.recurringInvoice) {
        this.recurringInvoice = new Recurring(json.recurringInvoice);
      }
      if (json.client) {
        this.client = new Client(json.client);
      }
    }
  }

  calculate() {
    this.calcPositions();
    this.calcTaxes();
    this.calcNet();
    this.calcTotal();
  }

  static getTypeString(
    type: DocumentType,
    toLower: boolean = false,
    plural: boolean = false,
  ) {
    let t = DocumentType[type];
    if (toLower) t = t.toLowerCase();
    if (plural) t += "s";
    return t;
  }

  getType(toLower: boolean = false) {
    if (toLower) return DocumentType[this.type].toLowerCase();
    return DocumentType[this.type];
  }

  calculateInvoiceToConvertPositions(
    offer: Document,
    option: string,
    value: number,
    valueType: string,
  ) {
    this.data.taxOption = offer.data.taxOption;
    this.removePositions();
    if (option === ConvertOption.Partial) {
      offer.data.positions.forEach((position) => {
        let p = { ...position };
        if (valueType === ValueType.Percent) p.price = (p.price / 100) * value;
        if (valueType === ValueType.Fixed)
          p.price = ((value / 100) * p.totalPercentage) / p.quantity;
        p.price = Math.round(p.price * 100) / 100;
        this.data.positions.push(p);
      });
    }
    if (option === ConvertOption.Full) {
      offer.data.positions.forEach((position) => {
        const p = { ...position };
        this.addPosition(p);
      });
    }
    if (option === ConvertOption.Final) {
      const previousNet = offer.invoices.reduce((p, c) => p + c.data.net, 0);
      const newNet = offer.data.net - previousNet;
      offer.data.positions.map((position) => {
        const p = { ...position };
        p.price = ((newNet / 100) * p.totalPercentage) / p.quantity;
        p.price = Math.round(p.price * 100) / 100;
        this.addPosition(p);
      });
    }

    offer.data.discountsCharges.map((discountOrCharge) => {
      const d = { ...discountOrCharge };
      this.addDiscountCharge(d);
    });
  }

  rebuild() {
    this.data.dueDays = Math.round(
      DateTime.fromJSDate(this.data.dueDate).diff(
        DateTime.fromJSDate(this.data.date),
        "days",
      ).days,
    );
    if (this.data.positions.length === 0) {
      this.addPosition();
    }

    this.calculate();
  }

  errors = (): string[] => {
    const e: string[] = [];
    if (this.clientId === null) {
      e.push("You need to select a client");
    }
    return e;
  };

  convertedFromOffer = () => this.offerId !== null && this.offerId !== "";
  disabled = () =>
    this.convertedFromOffer() || this.type === DocumentType.Reminder;

  calcPositions = () => {
    let sumPositions = this.data.positions.reduce(
      (p, c) => (p += c.quantity * c.price),
      0,
    );
    let sumPositionsNoDiscount = 0;
    this.data.positions.map((p) => {
      p.net = p.quantity * p.price;
      p.netNoDiscount = p.quantity * p.price;
      sumPositionsNoDiscount += p.net;
      if (p.discount > 0) {
        p.net -= (p.net / 100) * p.discount;
      }
      p.taxPrice = (p.net / 100) * p.tax;
      p.total = p.net + p.taxPrice;
      if (sumPositions === 0 || p.net === 0) {
        p.totalPercentage = 0;
      } else {
        p.totalPercentage = (100 / sumPositions) * p.net;
      }
      return p;
    });
    this.data.netNoDiscount = sumPositionsNoDiscount;
    let sumDiscountsCharges = 0;
    this.data.discountsCharges.forEach((dc) => {
      const v =
        dc.valueType === "percent"
          ? (sumPositions / 100) * dc.value
          : Number(dc.value);

      dc.amount = v;
      if (dc.title != "" && dc.value > 0) {
        if (dc.type === "discount") {
          sumDiscountsCharges -= v;
        } else {
          sumDiscountsCharges += v;
        }
      }
    });

    this.data.positions.map((p) => {
      p.net += (sumDiscountsCharges / 100) * p.totalPercentage;
      p.taxPrice = (p.net / 100) * p.tax;
      const pTax = this.data.taxOption?.applicable ? p.taxPrice : 0;
      p.total = p.net + pTax;
    });
  };

  setStatus(status: DocumentStatus) {
    this.status = status;
  }

  totalTaxes(): number {
    let total = 0;
    Object.entries(this.data.taxes).forEach(([_, value]) => {
      total += value as number;
    });
    return total;
  }

  totalCharges(): number {
    let total = 0;
    this.data.discountsCharges.forEach((dc) => {
      if (dc.type === DCType.Charge) {
        total += dc.amount;
      }
    });
    return total;
  }

  totalDiscounts(): number {
    let total = 0;
    this.data.discountsCharges.forEach((dc) => {
      if (dc.type === DCType.Discount) {
        total += dc.amount;
      }
    });
    return total;
  }

  calcTotal() {
    this.data.total = 0;
    this.data.total += Math.round(this.data.net * 100) / 100;

    if (this.data.taxOption?.applicable) {
      Object.entries(this.data.taxes).forEach(([_, value]) => {
        this.data.total += Math.round((value as number) * 100) / 100;
      });
    }
  }

  calcNet() {
    this.data.net = 0;
    this.data.net = this.data.positions.reduce((p, c) => (p += c.net), 0);
  }

  totalTaxBasis(rate: number): number {
    let total = 0;
    this.data.positions.forEach((p) => {
      if (p.tax === rate) {
        total += p.net;
      }
    });
    return total;
  }

  calcTaxes() {
    this.data.taxes = {};
    const rates: { [_: number]: number } = {};
    this.data.positions.forEach((p) => {
      if (!rates[p.tax]) {
        rates[p.tax] = 0;
      }
      rates[p.tax]! += p.taxPrice;
    });
    this.data.taxes = rates;
  }

  addPosition(
    pos: Position = {
      id: Date.now(),
      title: "",
      text: "",
      quantity: 0,
      unit: "",
      price: 0,
      tax: 0,
      taxPrice: 0,
      discount: 0,
      netNoDiscount: 0,
      net: 0,
      total: 0,
      focused: false,
      totalPercentage: 0,
    },
  ) {
    this.data.positions.push({ ...pos });
  }

  removePosition(index: number) {
    this.data.positions.splice(index, 1);

    if (this.data.positions.length === 0) {
      this.addPosition();
    }
  }

  removePositions() {
    this.data.positions.splice(0, this.data.positions.length);
    return this.data;
  }

  removeDiscountCharge(index: number) {
    this.data.discountsCharges.splice(index, 1);
  }

  addDiscountCharge(
    d: DiscountCharge = {
      id: Date.now().toString(),
      title: "",
      value: 0,
      type: DCType.Discount,
      valueType: ValueType.Percent,
      amount: 0,
    },
  ) {
    this.data.discountsCharges.push(d);
  }

  focusPosition(index: number) {
    this.unfocusPositions();
    this.data.positions[index]!.focused = true;
  }

  unfocusPositions() {
    this.data.positions.map((p) => (p.focused = false));
  }

  toJSON() {
    return { ...this };
  }
}

export { Document, Recurring };
