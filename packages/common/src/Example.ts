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
    document.data.taxOption = {
      title: "Apply taxes",
      applicable: true,
      default: true,
    };
    document.data.discountsCharges = [
      {
        title: "Some discount",
        value: 5,
        type: DCType.Discount,
        valueType: ValueType.Percent,
        amount: 10,
      },
    ];

    document.calculate();

    return document;
  }
}

export { Example };
