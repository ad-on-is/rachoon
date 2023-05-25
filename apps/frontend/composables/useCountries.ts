// 20221118135522
// https://raw.githubusercontent.com/leequixxx/currencies.json/master/currencies.json

const currencies = [
	{
		cc: 'AED',
		symbol: 'د.إ;',
		name: 'UAE dirham',
	},
	{
		cc: 'AFN',
		symbol: 'Afs',
		name: 'Afghan afghani',
	},
	{
		cc: 'ALL',
		symbol: 'L',
		name: 'Albanian lek',
	},
	{
		cc: 'AMD',
		symbol: 'AMD',
		name: 'Armenian dram',
	},
	{
		cc: 'ANG',
		symbol: 'NAƒ',
		name: 'Netherlands Antillean gulden',
	},
	{
		cc: 'AOA',
		symbol: 'Kz',
		name: 'Angolan kwanza',
	},
	{
		cc: 'ARS',
		symbol: '$',
		name: 'Argentine peso',
	},
	{
		cc: 'AUD',
		symbol: '$',
		name: 'Australian dollar',
	},
	{
		cc: 'AWG',
		symbol: 'ƒ',
		name: 'Aruban florin',
	},
	{
		cc: 'AZN',
		symbol: 'AZN',
		name: 'Azerbaijani manat',
	},
	{
		cc: 'BAM',
		symbol: 'KM',
		name: 'Bosnia and Herzegovina konvertibilna marka',
	},
	{
		cc: 'BBD',
		symbol: 'Bds$',
		name: 'Barbadian dollar',
	},
	{
		cc: 'BDT',
		symbol: '৳',
		name: 'Bangladeshi taka',
	},
	{
		cc: 'BGN',
		symbol: 'BGN',
		name: 'Bulgarian lev',
	},
	{
		cc: 'BHD',
		symbol: '.د.ب',
		name: 'Bahraini dinar',
	},
	{
		cc: 'BIF',
		symbol: 'FBu',
		name: 'Burundi franc',
	},
	{
		cc: 'BMD',
		symbol: 'BD$',
		name: 'Bermudian dollar',
	},
	{
		cc: 'BND',
		symbol: 'B$',
		name: 'Brunei dollar',
	},
	{
		cc: 'BOB',
		symbol: 'Bs.',
		name: 'Bolivian boliviano',
	},
	{
		cc: 'BRL',
		symbol: 'R$',
		name: 'Brazilian real',
	},
	{
		cc: 'BSD',
		symbol: 'B$',
		name: 'Bahamian dollar',
	},
	{
		cc: 'BTN',
		symbol: 'Nu.',
		name: 'Bhutanese ngultrum',
	},
	{
		cc: 'BWP',
		symbol: 'P',
		name: 'Botswana pula',
	},
	{
		cc: 'BYR',
		symbol: 'Br',
		name: 'Belarusian ruble',
	},
	{
		cc: 'BZD',
		symbol: 'BZ$',
		name: 'Belize dollar',
	},
	{
		cc: 'CAD',
		symbol: '$',
		name: 'Canadian dollar',
	},
	{
		cc: 'CDF',
		symbol: 'F',
		name: 'Congolese franc',
	},
	{
		cc: 'CHF',
		symbol: 'Fr.',
		name: 'Swiss franc',
	},
	{
		cc: 'CLP',
		symbol: '$',
		name: 'Chilean peso',
	},
	{
		cc: 'CNY',
		symbol: '¥',
		name: 'Chinese/Yuan renminbi',
	},
	{
		cc: 'COP',
		symbol: 'Col$',
		name: 'Colombian peso',
	},
	{
		cc: 'CRC',
		symbol: '₡',
		name: 'Costa Rican colon',
	},
	{
		cc: 'CUC',
		symbol: '$',
		name: 'Cuban peso',
	},
	{
		cc: 'CVE',
		symbol: 'Esc',
		name: 'Cape Verdean escudo',
	},
	{
		cc: 'CZK',
		symbol: 'Kč',
		name: 'Czech koruna',
	},
	{
		cc: 'DJF',
		symbol: 'Fdj',
		name: 'Djiboutian franc',
	},
	{
		cc: 'DKK',
		symbol: 'Kr',
		name: 'Danish krone',
	},
	{
		cc: 'DOP',
		symbol: 'RD$',
		name: 'Dominican peso',
	},
	{
		cc: 'DZD',
		symbol: 'د.ج',
		name: 'Algerian dinar',
	},
	{
		cc: 'EEK',
		symbol: 'KR',
		name: 'Estonian kroon',
	},
	{
		cc: 'EGP',
		symbol: '£',
		name: 'Egyptian pound',
	},
	{
		cc: 'ERN',
		symbol: 'Nfa',
		name: 'Eritrean nakfa',
	},
	{
		cc: 'ETB',
		symbol: 'Br',
		name: 'Ethiopian birr',
	},
	{
		cc: 'EUR',
		symbol: '€',
		name: 'European Euro',
	},
	{
		cc: 'FJD',
		symbol: 'FJ$',
		name: 'Fijian dollar',
	},
	{
		cc: 'FKP',
		symbol: '£',
		name: 'Falkland Islands pound',
	},
	{
		cc: 'GBP',
		symbol: '£',
		name: 'British pound',
	},
	{
		cc: 'GEL',
		symbol: 'GEL',
		name: 'Georgian lari',
	},
	{
		cc: 'GHS',
		symbol: 'GH₵',
		name: 'Ghanaian cedi',
	},
	{
		cc: 'GIP',
		symbol: '£',
		name: 'Gibraltar pound',
	},
	{
		cc: 'GMD',
		symbol: 'D',
		name: 'Gambian dalasi',
	},
	{
		cc: 'GNF',
		symbol: 'FG',
		name: 'Guinean franc',
	},
	{
		cc: 'GQE',
		symbol: 'CFA',
		name: 'Central African CFA franc',
	},
	{
		cc: 'GTQ',
		symbol: 'Q',
		name: 'Guatemalan quetzal',
	},
	{
		cc: 'GYD',
		symbol: 'GY$',
		name: 'Guyanese dollar',
	},
	{
		cc: 'HKD',
		symbol: 'HK$',
		name: 'Hong Kong dollar',
	},
	{
		cc: 'HNL',
		symbol: 'L',
		name: 'Honduran lempira',
	},
	{
		cc: 'HRK',
		symbol: 'kn',
		name: 'Croatian kuna',
	},
	{
		cc: 'HTG',
		symbol: 'G',
		name: 'Haitian gourde',
	},
	{
		cc: 'HUF',
		symbol: 'Ft',
		name: 'Hungarian forint',
	},
	{
		cc: 'IDR',
		symbol: 'Rp',
		name: 'Indonesian rupiah',
	},
	{
		cc: 'ILS',
		symbol: '₪',
		name: 'Israeli new sheqel',
	},
	{
		cc: 'INR',
		symbol: '₹',
		name: 'Indian rupee',
	},
	{
		cc: 'IQD',
		symbol: 'د.ع',
		name: 'Iraqi dinar',
	},
	{
		cc: 'IRR',
		symbol: 'IRR',
		name: 'Iranian rial',
	},
	{
		cc: 'ISK',
		symbol: 'kr',
		name: 'Icelandic króna',
	},
	{
		cc: 'JMD',
		symbol: 'J$',
		name: 'Jamaican dollar',
	},
	{
		cc: 'JOD',
		symbol: 'JOD',
		name: 'Jordanian dinar',
	},
	{
		cc: 'JPY',
		symbol: '¥',
		name: 'Japanese yen',
	},
	{
		cc: 'KES',
		symbol: 'KSh',
		name: 'Kenyan shilling',
	},
	{
		cc: 'KGS',
		symbol: 'сом',
		name: 'Kyrgyzstani som',
	},
	{
		cc: 'KHR',
		symbol: '៛',
		name: 'Cambodian riel',
	},
	{
		cc: 'KMF',
		symbol: 'KMF',
		name: 'Comorian franc',
	},
	{
		cc: 'KPW',
		symbol: 'W',
		name: 'North Korean won',
	},
	{
		cc: 'KRW',
		symbol: 'W',
		name: 'South Korean won',
	},
	{
		cc: 'KWD',
		symbol: 'KWD',
		name: 'Kuwaiti dinar',
	},
	{
		cc: 'KYD',
		symbol: 'KY$',
		name: 'Cayman Islands dollar',
	},
	{
		cc: 'KZT',
		symbol: 'T',
		name: 'Kazakhstani tenge',
	},
	{
		cc: 'LAK',
		symbol: 'KN',
		name: 'Lao kip',
	},
	{
		cc: 'LBP',
		symbol: '£',
		name: 'Lebanese lira',
	},
	{
		cc: 'LKR',
		symbol: 'Rs',
		name: 'Sri Lankan rupee',
	},
	{
		cc: 'LRD',
		symbol: 'L$',
		name: 'Liberian dollar',
	},
	{
		cc: 'LSL',
		symbol: 'M',
		name: 'Lesotho loti',
	},
	{
		cc: 'LTL',
		symbol: 'Lt',
		name: 'Lithuanian litas',
	},
	{
		cc: 'LVL',
		symbol: 'Ls',
		name: 'Latvian lats',
	},
	{
		cc: 'LYD',
		symbol: 'LD',
		name: 'Libyan dinar',
	},
	{
		cc: 'MAD',
		symbol: 'MAD',
		name: 'Moroccan dirham',
	},
	{
		cc: 'MDL',
		symbol: 'MDL',
		name: 'Moldovan leu',
	},
	{
		cc: 'MGA',
		symbol: 'FMG',
		name: 'Malagasy ariary',
	},
	{
		cc: 'MKD',
		symbol: 'MKD',
		name: 'Macedonian denar',
	},
	{
		cc: 'MMK',
		symbol: 'K',
		name: 'Myanma kyat',
	},
	{
		cc: 'MNT',
		symbol: '₮',
		name: 'Mongolian tugrik',
	},
	{
		cc: 'MOP',
		symbol: 'P',
		name: 'Macanese pataca',
	},
	{
		cc: 'MRO',
		symbol: 'UM',
		name: 'Mauritanian ouguiya',
	},
	{
		cc: 'MUR',
		symbol: 'Rs',
		name: 'Mauritian rupee',
	},
	{
		cc: 'MVR',
		symbol: 'Rf',
		name: 'Maldivian rufiyaa',
	},
	{
		cc: 'MWK',
		symbol: 'MK',
		name: 'Malawian kwacha',
	},
	{
		cc: 'MXN',
		symbol: '$',
		name: 'Mexican peso',
	},
	{
		cc: 'MYR',
		symbol: 'RM',
		name: 'Malaysian ringgit',
	},
	{
		cc: 'MZM',
		symbol: 'MTn',
		name: 'Mozambican metical',
	},
	{
		cc: 'NAD',
		symbol: 'N$',
		name: 'Namibian dollar',
	},
	{
		cc: 'NGN',
		symbol: '₦',
		name: 'Nigerian naira',
	},
	{
		cc: 'NIO',
		symbol: 'C$',
		name: 'Nicaraguan córdoba',
	},
	{
		cc: 'NOK',
		symbol: 'kr',
		name: 'Norwegian krone',
	},
	{
		cc: 'NPR',
		symbol: 'NRs',
		name: 'Nepalese rupee',
	},
	{
		cc: 'NZD',
		symbol: 'NZ$',
		name: 'New Zealand dollar',
	},
	{
		cc: 'OMR',
		symbol: 'OMR',
		name: 'Omani rial',
	},
	{
		cc: 'PAB',
		symbol: 'B./',
		name: 'Panamanian balboa',
	},
	{
		cc: 'PEN',
		symbol: 'S/.',
		name: 'Peruvian nuevo sol',
	},
	{
		cc: 'PGK',
		symbol: 'K',
		name: 'Papua New Guinean kina',
	},
	{
		cc: 'PHP',
		symbol: '₱',
		name: 'Philippine peso',
	},
	{
		cc: 'PKR',
		symbol: 'Rs.',
		name: 'Pakistani rupee',
	},
	{
		cc: 'PLN',
		symbol: 'zł',
		name: 'Polish zloty',
	},
	{
		cc: 'PYG',
		symbol: '₲',
		name: 'Paraguayan guarani',
	},
	{
		cc: 'QAR',
		symbol: 'QR',
		name: 'Qatari riyal',
	},
	{
		cc: 'RON',
		symbol: 'L',
		name: 'Romanian leu',
	},
	{
		cc: 'RSD',
		symbol: 'din.',
		name: 'Serbian dinar',
	},
	{
		cc: 'RUB',
		symbol: 'R',
		name: 'Russian ruble',
	},
	{
		cc: 'SAR',
		symbol: 'SR',
		name: 'Saudi riyal',
	},
	{
		cc: 'SBD',
		symbol: 'SI$',
		name: 'Solomon Islands dollar',
	},
	{
		cc: 'SCR',
		symbol: 'SR',
		name: 'Seychellois rupee',
	},
	{
		cc: 'SDG',
		symbol: 'SDG',
		name: 'Sudanese pound',
	},
	{
		cc: 'SEK',
		symbol: 'kr',
		name: 'Swedish krona',
	},
	{
		cc: 'SGD',
		symbol: 'S$',
		name: 'Singapore dollar',
	},
	{
		cc: 'SHP',
		symbol: '£',
		name: 'Saint Helena pound',
	},
	{
		cc: 'SLL',
		symbol: 'Le',
		name: 'Sierra Leonean leone',
	},
	{
		cc: 'SOS',
		symbol: 'Sh.',
		name: 'Somali shilling',
	},
	{
		cc: 'SRD',
		symbol: '$',
		name: 'Surinamese dollar',
	},
	{
		cc: 'SYP',
		symbol: 'LS',
		name: 'Syrian pound',
	},
	{
		cc: 'SZL',
		symbol: 'E',
		name: 'Swazi lilangeni',
	},
	{
		cc: 'THB',
		symbol: '฿',
		name: 'Thai baht',
	},
	{
		cc: 'TJS',
		symbol: 'TJS',
		name: 'Tajikistani somoni',
	},
	{
		cc: 'TMT',
		symbol: 'm',
		name: 'Turkmen manat',
	},
	{
		cc: 'TND',
		symbol: 'DT',
		name: 'Tunisian dinar',
	},
	{
		cc: 'TRY',
		symbol: 'TRY',
		name: 'Turkish new lira',
	},
	{
		cc: 'TTD',
		symbol: 'TT$',
		name: 'Trinidad and Tobago dollar',
	},
	{
		cc: 'TWD',
		symbol: 'NT$',
		name: 'New Taiwan dollar',
	},
	{
		cc: 'TZS',
		symbol: 'TZS',
		name: 'Tanzanian shilling',
	},
	{
		cc: 'UAH',
		symbol: 'UAH',
		name: 'Ukrainian hryvnia',
	},
	{
		cc: 'UGX',
		symbol: 'USh',
		name: 'Ugandan shilling',
	},
	{
		cc: 'USD',
		symbol: 'US$',
		name: 'United States dollar',
	},
	{
		cc: 'UYU',
		symbol: '$U',
		name: 'Uruguayan peso',
	},
	{
		cc: 'UZS',
		symbol: 'UZS',
		name: 'Uzbekistani som',
	},
	{
		cc: 'VEB',
		symbol: 'Bs',
		name: 'Venezuelan bolivar',
	},
	{
		cc: 'VND',
		symbol: '₫',
		name: 'Vietnamese dong',
	},
	{
		cc: 'VUV',
		symbol: 'VT',
		name: 'Vanuatu vatu',
	},
	{
		cc: 'WST',
		symbol: 'WS$',
		name: 'Samoan tala',
	},
	{
		cc: 'XAF',
		symbol: 'CFA',
		name: 'Central African CFA franc',
	},
	{
		cc: 'XCD',
		symbol: 'EC$',
		name: 'East Caribbean dollar',
	},
	{
		cc: 'XDR',
		symbol: 'SDR',
		name: 'Special Drawing Rights',
	},
	{
		cc: 'XOF',
		symbol: 'CFA',
		name: 'West African CFA franc',
	},
	{
		cc: 'XPF',
		symbol: 'F',
		name: 'CFP franc',
	},
	{
		cc: 'YER',
		symbol: 'YER',
		name: 'Yemeni rial',
	},
	{
		cc: 'ZAR',
		symbol: 'R',
		name: 'South African rand',
	},
	{
		cc: 'ZMK',
		symbol: 'ZK',
		name: 'Zambian kwacha',
	},
	{
		cc: 'ZWR',
		symbol: 'Z$',
		name: 'Zimbabwean dollar',
	},
]

const locales = {
	'af-ZA': ['Afrikaans', 'Afrikaans'],
	'ar': ['العربية', 'Arabic'],
	'bg-BG': ['Български', 'Bulgarian'],
	'ca-AD': ['Català', 'Catalan'],
	'cs-CZ': ['Čeština', 'Czech'],
	'cy-GB': ['Cymraeg', 'Welsh'],
	'da-DK': ['Dansk', 'Danish'],
	'de-AT': ['Deutsch (Österreich)', 'German (Austria)'],
	'de-CH': ['Deutsch (Schweiz)', 'German (Switzerland)'],
	'de-DE': ['Deutsch (Deutschland)', 'German (Germany)'],
	'el-GR': ['Ελληνικά', 'Greek'],
	'en-GB': ['English (UK)', 'English (UK)'],
	'en-US': ['English (US)', 'English (US)'],
	'es-CL': ['Español (Chile)', 'Spanish (Chile)'],
	'es-ES': ['Español (España)', 'Spanish (Spain)'],
	'es-MX': ['Español (México)', 'Spanish (Mexico)'],
	'et-EE': ['Eesti keel', 'Estonian'],
	'eu': ['Euskara', 'Basque'],
	'fa-IR': ['فارسی', 'Persian'],
	'fi-FI': ['Suomi', 'Finnish'],
	'fr-CA': ['Français (Canada)', 'French (Canada)'],
	'fr-FR': ['Français (France)', 'French (France)'],
	'he-IL': ['עברית', 'Hebrew'],
	'hi-IN': ['हिंदी', 'Hindi'],
	'hr-HR': ['Hrvatski', 'Croatian'],
	'hu-HU': ['Magyar', 'Hungarian'],
	'id-ID': ['Bahasa Indonesia', 'Indonesian'],
	'is-IS': ['Íslenska', 'Icelandic'],
	'it-IT': ['Italiano', 'Italian'],
	'ja-JP': ['日本語', 'Japanese'],
	'km-KH': ['ភាសាខ្មែរ', 'Khmer'],
	'ko-KR': ['한국어', 'Korean'],
	'la': ['Latina', 'Latin'],
	'lt-LT': ['Lietuvių kalba', 'Lithuanian'],
	'lv-LV': ['Latviešu', 'Latvian'],
	'mn-MN': ['Монгол', 'Mongolian'],
	'nb-NO': ['Norsk bokmål', 'Norwegian (Bokmål)'],
	'nl-NL': ['Nederlands', 'Dutch'],
	'nn-NO': ['Norsk nynorsk', 'Norwegian (Nynorsk)'],
	'pl-PL': ['Polski', 'Polish'],
	'pt-BR': ['Português (Brasil)', 'Portuguese (Brazil)'],
	'pt-PT': ['Português (Portugal)', 'Portuguese (Portugal)'],
	'ro-RO': ['Română', 'Romanian'],
	'ru-RU': ['Русский', 'Russian'],
	'sk-SK': ['Slovenčina', 'Slovak'],
	'sl-SI': ['Slovenščina', 'Slovenian'],
	'sr-RS': ['Српски / Srpski', 'Serbian'],
	'sv-SE': ['Svenska', 'Swedish'],
	'th-TH': ['ไทย', 'Thai'],
	'tr-TR': ['Türkçe', 'Turkish'],
	'uk-UA': ['Українська', 'Ukrainian'],
	'vi-VN': ['Tiếng Việt', 'Vietnamese'],
	'zh-CN': ['中文 (中国大陆)', 'Chinese (PRC)'],
	'zh-TW': ['中文 (台灣)', 'Chinese (Taiwan)'],
}

// 20221127154623
// https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json

const countries = [
	{
		country: 'Afghanistan',
		abbreviation: 'AF',
	},
	{
		country: 'Albania',
		abbreviation: 'AL',
	},
	{
		country: 'Algeria',
		abbreviation: 'DZ',
	},
	{
		country: 'American Samoa',
		abbreviation: 'AS',
	},
	{
		country: 'Andorra',
		abbreviation: 'AD',
	},
	{
		country: 'Angola',
		abbreviation: 'AO',
	},
	{
		country: 'Anguilla',
		abbreviation: 'AI',
	},
	{
		country: 'Antarctica',
		abbreviation: 'AQ',
	},
	{
		country: 'Antigua and Barbuda',
		abbreviation: 'AG',
	},
	{
		country: 'Argentina',
		abbreviation: 'AR',
	},
	{
		country: 'Armenia',
		abbreviation: 'AM',
	},
	{
		country: 'Aruba',
		abbreviation: 'AW',
	},
	{
		country: 'Australia',
		abbreviation: 'AU',
	},
	{
		country: 'Austria',
		abbreviation: 'AT',
	},
	{
		country: 'Azerbaijan',
		abbreviation: 'AZ',
	},
	{
		country: 'Bahamas',
		abbreviation: 'BS',
	},
	{
		country: 'Bahrain',
		abbreviation: 'BH',
	},
	{
		country: 'Bangladesh',
		abbreviation: 'BD',
	},
	{
		country: 'Barbados',
		abbreviation: 'BB',
	},
	{
		country: 'Belarus',
		abbreviation: 'BY',
	},
	{
		country: 'Belgium',
		abbreviation: 'BE',
	},
	{
		country: 'Belize',
		abbreviation: 'BZ',
	},
	{
		country: 'Benin',
		abbreviation: 'BJ',
	},
	{
		country: 'Bermuda',
		abbreviation: 'BM',
	},
	{
		country: 'Bhutan',
		abbreviation: 'BT',
	},
	{
		country: 'Bolivia',
		abbreviation: 'BO',
	},
	{
		country: 'Bosnia and Herzegovina',
		abbreviation: 'BA',
	},
	{
		country: 'Botswana',
		abbreviation: 'BW',
	},
	{
		country: 'Bouvet Island',
		abbreviation: 'BV',
	},
	{
		country: 'Brazil',
		abbreviation: 'BR',
	},
	{
		country: 'British Indian Ocean Territory',
		abbreviation: 'IO',
	},
	{
		country: 'Brunei',
		abbreviation: 'BN',
	},
	{
		country: 'Bulgaria',
		abbreviation: 'BG',
	},
	{
		country: 'Burkina Faso',
		abbreviation: 'BF',
	},
	{
		country: 'Burundi',
		abbreviation: 'BI',
	},
	{
		country: 'Cambodia',
		abbreviation: 'KH',
	},
	{
		country: 'Cameroon',
		abbreviation: 'CM',
	},
	{
		country: 'Canada',
		abbreviation: 'CA',
	},
	{
		country: 'Cape Verde',
		abbreviation: 'CV',
	},
	{
		country: 'Cayman Islands',
		abbreviation: 'KY',
	},
	{
		country: 'Central African Republic',
		abbreviation: 'CF',
	},
	{
		country: 'Chad',
		abbreviation: 'TD',
	},
	{
		country: 'Chile',
		abbreviation: 'CL',
	},
	{
		country: 'China',
		abbreviation: 'CN',
	},
	{
		country: 'Christmas Island',
		abbreviation: 'CX',
	},
	{
		country: 'Cocos (Keeling) Islands',
		abbreviation: 'CC',
	},
	{
		country: 'Colombia',
		abbreviation: 'CO',
	},
	{
		country: 'Comoros',
		abbreviation: 'KM',
	},
	{
		country: 'Congo',
		abbreviation: 'CG',
	},
	{
		country: 'Cook Islands',
		abbreviation: 'CK',
	},
	{
		country: 'Costa Rica',
		abbreviation: 'CR',
	},
	{
		country: 'Croatia',
		abbreviation: 'HR',
	},
	{
		country: 'Cuba',
		abbreviation: 'CU',
	},
	{
		country: 'Cyprus',
		abbreviation: 'CY',
	},
	{
		country: 'Czech Republic',
		abbreviation: 'CZ',
	},
	{
		country: 'Denmark',
		abbreviation: 'DK',
	},
	{
		country: 'Djibouti',
		abbreviation: 'DJ',
	},
	{
		country: 'Dominica',
		abbreviation: 'DM',
	},
	{
		country: 'Dominican Republic',
		abbreviation: 'DO',
	},
	{
		country: 'East Timor',
		abbreviation: 'TP',
	},
	{
		country: 'Ecuador',
		abbreviation: 'EC',
	},
	{
		country: 'Egypt',
		abbreviation: 'EG',
	},
	{
		country: 'El Salvador',
		abbreviation: 'SV',
	},
	{
		country: 'Equatorial Guinea',
		abbreviation: 'GQ',
	},
	{
		country: 'Eritrea',
		abbreviation: 'ER',
	},
	{
		country: 'Estonia',
		abbreviation: 'EE',
	},
	{
		country: 'Ethiopia',
		abbreviation: 'ET',
	},
	{
		country: 'Falkland Islands',
		abbreviation: 'FK',
	},
	{
		country: 'Faroe Islands',
		abbreviation: 'FO',
	},
	{
		country: 'Fiji Islands',
		abbreviation: 'FJ',
	},
	{
		country: 'Finland',
		abbreviation: 'FI',
	},
	{
		country: 'France',
		abbreviation: 'FR',
	},
	{
		country: 'French Guiana',
		abbreviation: 'GF',
	},
	{
		country: 'French Polynesia',
		abbreviation: 'PF',
	},
	{
		country: 'French Southern territories',
		abbreviation: 'TF',
	},
	{
		country: 'Gabon',
		abbreviation: 'GA',
	},
	{
		country: 'Gambia',
		abbreviation: 'GM',
	},
	{
		country: 'Georgia',
		abbreviation: 'GE',
	},
	{
		country: 'Germany',
		abbreviation: 'DE',
	},
	{
		country: 'Ghana',
		abbreviation: 'GH',
	},
	{
		country: 'Gibraltar',
		abbreviation: 'GI',
	},
	{
		country: 'Greece',
		abbreviation: 'GR',
	},
	{
		country: 'Greenland',
		abbreviation: 'GL',
	},
	{
		country: 'Grenada',
		abbreviation: 'GD',
	},
	{
		country: 'Guadeloupe',
		abbreviation: 'GP',
	},
	{
		country: 'Guam',
		abbreviation: 'GU',
	},
	{
		country: 'Guatemala',
		abbreviation: 'GT',
	},
	{
		country: 'Guernsey',
		abbreviation: 'GG',
	},
	{
		country: 'Guinea',
		abbreviation: 'GN',
	},
	{
		country: 'Guinea-Bissau',
		abbreviation: 'GW',
	},
	{
		country: 'Guyana',
		abbreviation: 'GY',
	},
	{
		country: 'Haiti',
		abbreviation: 'HT',
	},
	{
		country: 'Heard Island and McDonald Islands',
		abbreviation: 'HM',
	},
	{
		country: 'Holy See (Vatican City State)',
		abbreviation: 'VA',
	},
	{
		country: 'Honduras',
		abbreviation: 'HN',
	},
	{
		country: 'Hong Kong',
		abbreviation: 'HK',
	},
	{
		country: 'Hungary',
		abbreviation: 'HU',
	},
	{
		country: 'Iceland',
		abbreviation: 'IS',
	},
	{
		country: 'India',
		abbreviation: 'IN',
	},
	{
		country: 'Indonesia',
		abbreviation: 'ID',
	},
	{
		country: 'Iran',
		abbreviation: 'IR',
	},
	{
		country: 'Iraq',
		abbreviation: 'IQ',
	},
	{
		country: 'Ireland',
		abbreviation: 'IE',
	},
	{
		country: 'Isle of Man',
		abbreviation: 'IM',
	},
	{
		country: 'Israel',
		abbreviation: 'IL',
	},
	{
		country: 'Italy',
		abbreviation: 'IT',
	},
	{
		country: 'Ivory Coast',
		abbreviation: 'CI',
	},
	{
		country: 'Jamaica',
		abbreviation: 'JM',
	},
	{
		country: 'Japan',
		abbreviation: 'JP',
	},
	{
		country: 'Jersey',
		abbreviation: 'JE',
	},
	{
		country: 'Jordan',
		abbreviation: 'JO',
	},
	{
		country: 'Kazakhstan',
		abbreviation: 'KZ',
	},
	{
		country: 'Kenya',
		abbreviation: 'KE',
	},
	{
		country: 'Kiribati',
		abbreviation: 'KI',
	},
	{
		country: 'Kuwait',
		abbreviation: 'KW',
	},
	{
		country: 'Kyrgyzstan',
		abbreviation: 'KG',
	},
	{
		country: 'Laos',
		abbreviation: 'LA',
	},
	{
		country: 'Latvia',
		abbreviation: 'LV',
	},
	{
		country: 'Lebanon',
		abbreviation: 'LB',
	},
	{
		country: 'Lesotho',
		abbreviation: 'LS',
	},
	{
		country: 'Liberia',
		abbreviation: 'LR',
	},
	{
		country: 'Libyan Arab Jamahiriya',
		abbreviation: 'LY',
	},
	{
		country: 'Liechtenstein',
		abbreviation: 'LI',
	},
	{
		country: 'Lithuania',
		abbreviation: 'LT',
	},
	{
		country: 'Luxembourg',
		abbreviation: 'LU',
	},
	{
		country: 'Macao',
		abbreviation: 'MO',
	},
	{
		country: 'North Macedonia',
		abbreviation: 'MK',
	},
	{
		country: 'Madagascar',
		abbreviation: 'MG',
	},
	{
		country: 'Malawi',
		abbreviation: 'MW',
	},
	{
		country: 'Malaysia',
		abbreviation: 'MY',
	},
	{
		country: 'Maldives',
		abbreviation: 'MV',
	},
	{
		country: 'Mali',
		abbreviation: 'ML',
	},
	{
		country: 'Malta',
		abbreviation: 'MT',
	},
	{
		country: 'Marshall Islands',
		abbreviation: 'MH',
	},
	{
		country: 'Martinique',
		abbreviation: 'MQ',
	},
	{
		country: 'Mauritania',
		abbreviation: 'MR',
	},
	{
		country: 'Mauritius',
		abbreviation: 'MU',
	},
	{
		country: 'Mayotte',
		abbreviation: 'YT',
	},
	{
		country: 'Mexico',
		abbreviation: 'MX',
	},
	{
		country: 'Micronesia, Federated States of',
		abbreviation: 'FM',
	},
	{
		country: 'Moldova',
		abbreviation: 'MD',
	},
	{
		country: 'Monaco',
		abbreviation: 'MC',
	},
	{
		country: 'Mongolia',
		abbreviation: 'MN',
	},
	{
		country: 'Montenegro',
		abbreviation: 'ME',
	},
	{
		country: 'Montserrat',
		abbreviation: 'MS',
	},
	{
		country: 'Morocco',
		abbreviation: 'MA',
	},
	{
		country: 'Mozambique',
		abbreviation: 'MZ',
	},
	{
		country: 'Myanmar',
		abbreviation: 'MM',
	},
	{
		country: 'Namibia',
		abbreviation: 'NA',
	},
	{
		country: 'Nauru',
		abbreviation: 'NR',
	},
	{
		country: 'Nepal',
		abbreviation: 'NP',
	},
	{
		country: 'Netherlands',
		abbreviation: 'NL',
	},
	{
		country: 'Netherlands Antilles',
		abbreviation: 'AN',
	},
	{
		country: 'New Caledonia',
		abbreviation: 'NC',
	},
	{
		country: 'New Zealand',
		abbreviation: 'NZ',
	},
	{
		country: 'Nicaragua',
		abbreviation: 'NI',
	},
	{
		country: 'Niger',
		abbreviation: 'NE',
	},
	{
		country: 'Nigeria',
		abbreviation: 'NG',
	},
	{
		country: 'Niue',
		abbreviation: 'NU',
	},
	{
		country: 'Norfolk Island',
		abbreviation: 'NF',
	},
	{
		country: 'North Korea',
		abbreviation: 'KP',
	},
	{
		country: 'Northern Ireland',
		abbreviation: 'GB',
	},
	{
		country: 'Northern Mariana Islands',
		abbreviation: 'MP',
	},
	{
		country: 'Norway',
		abbreviation: 'NO',
	},
	{
		country: 'Oman',
		abbreviation: 'OM',
	},
	{
		country: 'Pakistan',
		abbreviation: 'PK',
	},
	{
		country: 'Palau',
		abbreviation: 'PW',
	},
	{
		country: 'Palestine',
		abbreviation: 'PS',
	},
	{
		country: 'Panama',
		abbreviation: 'PA',
	},
	{
		country: 'Papua New Guinea',
		abbreviation: 'PG',
	},
	{
		country: 'Paraguay',
		abbreviation: 'PY',
	},
	{
		country: 'Peru',
		abbreviation: 'PE',
	},
	{
		country: 'Philippines',
		abbreviation: 'PH',
	},
	{
		country: 'Pitcairn',
		abbreviation: 'PN',
	},
	{
		country: 'Poland',
		abbreviation: 'PL',
	},
	{
		country: 'Portugal',
		abbreviation: 'PT',
	},
	{
		country: 'Puerto Rico',
		abbreviation: 'PR',
	},
	{
		country: 'Qatar',
		abbreviation: 'QA',
	},
	{
		country: 'Reunion',
		abbreviation: 'RE',
	},
	{
		country: 'Romania',
		abbreviation: 'RO',
	},
	{
		country: 'Russian Federation',
		abbreviation: 'RU',
	},
	{
		country: 'Rwanda',
		abbreviation: 'RW',
	},
	{
		country: 'Saint Helena',
		abbreviation: 'SH',
	},
	{
		country: 'Saint Kitts and Nevis',
		abbreviation: 'KN',
	},
	{
		country: 'Saint Lucia',
		abbreviation: 'LC',
	},
	{
		country: 'Saint Pierre and Miquelon',
		abbreviation: 'PM',
	},
	{
		country: 'Saint Vincent and the Grenadines',
		abbreviation: 'VC',
	},
	{
		country: 'Samoa',
		abbreviation: 'WS',
	},
	{
		country: 'San Marino',
		abbreviation: 'SM',
	},
	{
		country: 'Sao Tome and Principe',
		abbreviation: 'ST',
	},
	{
		country: 'Saudi Arabia',
		abbreviation: 'SA',
	},
	{
		country: 'Senegal',
		abbreviation: 'SN',
	},
	{
		country: 'Serbia',
		abbreviation: 'RS',
	},
	{
		country: 'Seychelles',
		abbreviation: 'SC',
	},
	{
		country: 'Sierra Leone',
		abbreviation: 'SL',
	},
	{
		country: 'Singapore',
		abbreviation: 'SG',
	},
	{
		country: 'Slovakia',
		abbreviation: 'SK',
	},
	{
		country: 'Slovenia',
		abbreviation: 'SI',
	},
	{
		country: 'Solomon Islands',
		abbreviation: 'SB',
	},
	{
		country: 'Somalia',
		abbreviation: 'SO',
	},
	{
		country: 'South Africa',
		abbreviation: 'ZA',
	},
	{
		country: 'South Georgia and the South Sandwich Islands',
		abbreviation: 'GS',
	},
	{
		country: 'South Korea',
		abbreviation: 'KR',
	},
	{
		country: 'South Sudan',
		abbreviation: 'SS',
	},
	{
		country: 'Spain',
		abbreviation: 'ES',
	},
	{
		country: 'Sri Lanka',
		abbreviation: 'LK',
	},
	{
		country: 'Sudan',
		abbreviation: 'SD',
	},
	{
		country: 'Suriname',
		abbreviation: 'SR',
	},
	{
		country: 'Svalbard and Jan Mayen',
		abbreviation: 'SJ',
	},
	{
		country: 'Swaziland',
		abbreviation: 'SZ',
	},
	{
		country: 'Sweden',
		abbreviation: 'SE',
	},
	{
		country: 'Switzerland',
		abbreviation: 'CH',
	},
	{
		country: 'Syria',
		abbreviation: 'SY',
	},
	{
		country: 'Tajikistan',
		abbreviation: 'TJ',
	},
	{
		country: 'Tanzania',
		abbreviation: 'TZ',
	},
	{
		country: 'Thailand',
		abbreviation: 'TH',
	},
	{
		country: 'The Democratic Republic of Congo',
		abbreviation: 'CD',
	},
	{
		country: 'Timor-Leste',
		abbreviation: 'TL',
	},
	{
		country: 'Togo',
		abbreviation: 'TG',
	},
	{
		country: 'Tokelau',
		abbreviation: 'TK',
	},
	{
		country: 'Tonga',
		abbreviation: 'TO',
	},
	{
		country: 'Trinidad and Tobago',
		abbreviation: 'TT',
	},
	{
		country: 'Tunisia',
		abbreviation: 'TN',
	},
	{
		country: 'Turkey',
		abbreviation: 'TR',
	},
	{
		country: 'Turkmenistan',
		abbreviation: 'TM',
	},
	{
		country: 'Turks and Caicos Islands',
		abbreviation: 'TC',
	},
	{
		country: 'Tuvalu',
		abbreviation: 'TV',
	},
	{
		country: 'Uganda',
		abbreviation: 'UG',
	},
	{
		country: 'Ukraine',
		abbreviation: 'UA',
	},
	{
		country: 'United Arab Emirates',
		abbreviation: 'AE',
	},
	{
		country: 'United Kingdom',
		abbreviation: 'UK',
	},
	{
		country: 'United States',
		abbreviation: 'US',
	},
	{
		country: 'United States Minor Outlying Islands',
		abbreviation: 'UM',
	},
	{
		country: 'Uruguay',
		abbreviation: 'UY',
	},
	{
		country: 'Uzbekistan',
		abbreviation: 'UZ',
	},
	{
		country: 'Vanuatu',
		abbreviation: 'VU',
	},
	{
		country: 'Venezuela',
		abbreviation: 'VE',
	},
	{
		country: 'Vietnam',
		abbreviation: 'VN',
	},
	{
		country: 'Virgin Islands, British',
		abbreviation: 'VG',
	},
	{
		country: 'Virgin Islands, U.S.',
		abbreviation: 'VI',
	},
	{
		country: 'Wallis and Futuna',
		abbreviation: 'WF',
	},
	{
		country: 'Western Sahara',
		abbreviation: 'EH',
	},
	{
		country: 'Yemen',
		abbreviation: 'YE',
	},
	{
		country: 'Zambia',
		abbreviation: 'ZM',
	},
	{
		country: 'Zimbabwe',
		abbreviation: 'ZW',
	},
]

const mySymbol = () => currencies.find((c) => c.cc === useProfile().me.organization.settings.general.currency).symbol

export default { currencies, locales, countries, mySymbol }
