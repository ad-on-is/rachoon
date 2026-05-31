import { DateTime } from "luxon";

class Format {
  static toCurrency(value: any, locale: string, currency: string) {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    });

    return formatter.format(Number(value));
  }

  static date(value: Date, locale: string) {
    return DateTime.fromJSDate(value)
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_SHORT); // const formatter = new Intl.DateTimeFormat(locale);
  }

  static longDate(value: Date, locale: string) {
    return DateTime.fromJSDate(value)
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_FULL);
  }

  static max100(val: string) {
    if (Number(val) > 100) val = "100";
    return val;
  }

  static number(
    entity: { format: string; padZeros: number },
    sequence: number = 0,
  ) {
    let number = String(sequence).padStart(entity.padZeros, "0");

    number = entity.format.replace("{number}", number);
    const d = number.match(/\{date:[a-zA-Z_\-\.]+\}/);
    if (d) {
      const format = d[0].replace("{date:", "").replace("}", "");
      const date = DateTime.now().toFormat(format);
      number = number.replace(d[0], date);
    }
    return number;
  }
}

export { Format };
