import _ from "lodash";
import { TaxOption } from "./Document";

class Helpers {
  static merge<T>(defaultObj: T, remoteObj: T): T {
    const result = defaultObj as T;

    // Override with remote values that are not empty

    if ((defaultObj && !remoteObj) || (!defaultObj && !remoteObj)) {
      return defaultObj;
    }

    if (!defaultObj && remoteObj) {
      return remoteObj;
    }

    const allKeys = new Set([
      ...Object.keys(defaultObj!),
      ...Object.keys(remoteObj!),
    ]) as Set<keyof T>;

    allKeys.forEach((key: keyof T) => {
      let val1 = defaultObj[key];
      let val2 = remoteObj[key];

      // implement a deep merge as well

      // Check if values are "empty" (null, undefined, empty string, empty array, empty object)
      const isEmpty1 = this.isEmptyValue(val1);
      const isEmpty2 = this.isEmptyValue(val2);

      // implement deep merge
      if (
        !isEmpty1 &&
        !isEmpty2 &&
        typeof val1 === "object" &&
        typeof val2 === "object" &&
        !Array.isArray(val1) &&
        !Array.isArray(val2)
      ) {
        result[key] = this.merge(val1, val2);
        return;
      }

      // If both are empty, use undefined
      if (isEmpty1 && isEmpty2) {
        result[key] = val1; // or val2, doesn't matter
      }
      // If only val1 is empty, use val2
      else if (isEmpty1) {
        result[key] = val2;
      }
      // If only val2 is empty, use val1
      else if (isEmpty2) {
        result[key] = val1;
      }
      // If neither is empty, prefer val2 (second object takes precedence)
      else {
        result[key] = val2;
      }
    });
    return result;
  }

  static trim(str: string): string {
    const lines = str.split("\n");
    const trimmedLines = lines
      .filter((l) => l.trim() !== "")
      .map((line) => line.trim());
    return trimmedLines.join("\n");
  }

  static isEmptyValue(value: any) {
    if (value === null || value === undefined) {
      return true;
    }

    if (value === "") {
      return true;
    }

    if (Array.isArray(value) && value.length === 0) {
      return true;
    }

    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0
    ) {
      return true;
    }

    if (typeof value === "function") {
      return false;
    }

    return false;
  }

  static appendTaxOptions(existing: TaxOption[]): TaxOption[] {
    const noTaxOptions: TaxOption[] = [
      { title: "Zero Rated", code: "Z", applicable: false, default: false },
      {
        title: "Exempt from tax",
        code: "E",
        applicable: false,
        default: false,
      },
      {
        title: "Reverse charge",
        code: "AE",
        applicable: false,
        default: false,
      },
      {
        title: "Intra-community supply",
        code: "K",
        applicable: false,
        default: false,
      },
      {
        title: "Free export item",
        code: "G",
        applicable: false,
        default: false,
      },
      {
        title: "Outside scope of tax",
        code: "O",
        applicable: false,
        default: false,
      },
      {
        title: "Canary Islands indirect tax (IGIC)",
        code: "L",
        applicable: false,
        default: false,
      },
      {
        title: "Ceuta/Melilla tax (IPSI)",
        code: "M",
        applicable: false,
        default: false,
      },
    ];
    const toAppend = [] as TaxOption[];
    for (const option of noTaxOptions) {
      if (!existing.find((o) => o.code === option.code)) {
        toAppend.push(option);
      }
    }

    return [...existing, ...toAppend];
  }

  static escapeXML(value: string) {
    if (!value) return "";
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }
}

export { Helpers };
