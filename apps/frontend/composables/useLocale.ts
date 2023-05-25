import { sprintf } from 'sprintf-js'

const messages = {
	'en': {
		'invoice': 'invoice',
		'offer': 'offer',
		'number': 'number',
		'no': 'No.',
		'date': 'date',
		'due on': 'due on',
		'your VAT': 'your VAT',
		'pos': 'pos',
		'project': 'project',
		'duration': 'duration',
		'description': 'description',
		'quantity': 'quantity',
		'unit price': 'unit price',
		'total price': 'total price',
		'subtotal': 'subtotal',
		'net': 'net',
		'incl. tax': 'incl. tax',
		'total': 'total',
		'user': 'user',
		'sum total': 'sum total',
		'duration total': 'duration total',
		'payment conditions': 'Payment conditions',
		'Payment within %d days': 'Payment within %d days',
	},
	'de-AT': {
		'invoice': 'Rechnung',
		'offer': 'Angebot',
		'number': 'Nummer',
		'no': 'Nr.',
		'date': 'Datum',
		'due on': 'fällig am',
		'your VAT': 'Ihre USt-Id',
		'pos': 'Pos',
		'project': 'Projekt',
		'duration': 'Dauer',
		'description': 'Beschreibung',
		'quantity': 'Menge',
		'unit price': 'Einzelpreis',
		'total price': 'Gesamtpreis',
		'subtotal': 'Zwischensumme',
		'net': 'Netto',
		'incl. tax': 'zzgl. USt',
		'total': 'Brutto',
		'user': 'User',
		'sum total': 'Gesamt-Summe',
		'duration total': 'Gesamt-Dauer',
		'Payment conditions': 'Zahlungskonditionen',
		'Payment within %d days.': 'Zahlung innerhalb von %d Tagen.',
	},
}

function t(key: string, ...val: any): string {
	const loc = useSettings().settings.general.locale
	return messages[loc] ? sprintf(messages[loc][key], val || null) ?? sprintf(messages['en'][key], val || null) : key
}

export default { t }
