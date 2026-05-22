// 20221118135522
// https://raw.githubusercontent.com/leequixxx/currencies.json/master/currencies.json
import { currencies, locales, countries } from "@repo/common/Locale";

const mySymbol = () => currencies.find((c) => c.cc === useProfile().me.organization.settings.general.currency).symbol;

export default { mySymbol, currencies, locales, countries };
