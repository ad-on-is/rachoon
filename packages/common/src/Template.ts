import { Helpers } from "./Helpers";
import _ from "lodash";

export interface TemplateData {
  columns: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  texts: {
    beforeTable: string;
    afterTable: string;
  };
  colors: {
    border: string;
    primary: string;
    bodyText: string;
    secondary: string;
    footerText: string;
    headerText: string;
    footerBackground: string;
    headerBackground: string;
    tableOddBackground: string;
    tableEvenBackground: string;
  };
}

class Template {
  id: string = "";
  title: string = "";
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  thumbnail: string = "";
  isGlobal: boolean = false;
  data: TemplateData = {
    columns: {
      first: "",
      second: "",
      third: "",
      fourth: "",
    },
    texts: {
      beforeTable: "",
      afterTable: "",
    },
    colors: {
      border: "#E6E9EF",
      primary: "#7287FD",
      bodyText: "#1E1E2E",
      secondary: "#DC8A78",
      footerText: "#CDD6F4",
      headerText: "#1E1E2E",
      footerBackground: "#1E1E2E",
      headerBackground: "#E6E9EF",
      tableOddBackground: "#FFFFFF",
      tableEvenBackground: "#E6E9EF",
    },
  };

  html: string = "";
  default: boolean = false;
  premium: boolean = false;

  public constructor(json?: any) {
    if (json) {
      Helpers.merge(this, json);
      if (json.updatedAt && json.createdAt) {
        this.updatedAt = new Date(Date.parse(json.updatedAt.toString()));
        this.createdAt = new Date(Date.parse(json.createdAt.toString()));
      }
    }
  }

  public errors(): string[] {
    const e: string[] = [];
    if (this.title === "") {
      e.push("Name is required");
    }

    return e;
  }

  public toJSON() {
    return { ...this };
  }
}

export { Template };
