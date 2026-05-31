import { Client } from "./Client";
import { DCType, Document, DocumentType, ValueType } from "./Document";

class Example {
  static client() {
    const client = new Client();
    client.name = "BlueHorizon Data Systems Inc. ";
    client.data = {
      info: {
        vat: "XX-12345",
        addition: "",
        reference: "",
      },
      contactPerson: {
        fullName: "Madison Blake",
        email: "blake@bh.com",
      },
      address: {
        street: "example",
        zip: "1234",
        city: "Somewhere",
        country: "Somewhere",
      },
      conditions: {
        rate: 60,
        discount: { value: 0, valueType: "" },
        earlyPayment: {
          days: 0,
          discount: 0,
        },
        invoiceDueDays: 0,
      },
    };
    return client;
  }
  static get(type: DocumentType) {
    const document = new Document();
    document.type = type;
    document.number = "2023-0001";
    document.sequence = 1;
    document.client = this.client();
    document.data.date = new Date();
    document.data.dueDate = new Date(
      new Date().setDate(new Date().getDate() + 30),
    );
    document.data.positions = [
      {
        id: Date.now(),
        taxPrice: 0,
        discount: 0,
        net: 0,
        netNoDiscount: 0,
        total: 0,
        totalPercentage: 0,
        focused: false,
        title: "Lorem ipsum dolor sit amet",
        text: "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",
        quantity: 5,
        price: 300,
        tax: 20,
        unit: "hrs",
      },
      {
        id: Date.now(),
        taxPrice: 0,
        discount: 0,
        net: 0,
        netNoDiscount: 0,
        total: 0,
        totalPercentage: 0,
        focused: false,
        title: "Lorem ipsum dolor sit amet",
        text: "<p>Lorem ipsum dolor sit amet, consectetuer</p>",
        quantity: 10,
        price: 10000,
        tax: 20,
        unit: "hrs",
      },
    ];
    if (type === DocumentType.Invoice || type === DocumentType.Offer) {
      document.data.taxOption = {
        title: "Apply taxes",
        applicable: true,
        default: true,
      };
    }
    if (type === DocumentType.Offer) {
      document.data.discountsCharges = [
        {
          title: "Some discount",
          value: 5,
          type: DCType.Discount,
          valueType: ValueType.Percent,
          amount: 10,
        },
      ];
    }

    if (type === DocumentType.Reminder) {
      document.data.discountsCharges = [
        {
          title: "Reminder Fee",
          value: 5,
          type: DCType.Charge,
          valueType: ValueType.Fixed,
          amount: 10,
        },
      ];
    }

    if (type === DocumentType.Reminder) {
      document.data.positions = [
        {
          id: Date.now(),
          taxPrice: 0,
          discount: 0,
          net: 0,
          netNoDiscount: 0,
          total: 0,
          totalPercentage: 0,
          focused: false,
          title: "INV-001-2001",
          text: "",
          quantity: 10,
          price: 10000,
          tax: 20,
          unit: "unit",
        },
      ];
    }

    document.calculate();

    return document;
  }
}

export { Example };
