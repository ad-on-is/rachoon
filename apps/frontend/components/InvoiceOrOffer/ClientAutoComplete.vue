<script setup lang="ts">
	import TypeAhead from 'vue3-simple-typeahead'
	import { Client } from '~~/models/client'
	const val = ref('')
</script>
<template>
	<TypeAhead
		class="input input-bordered input-sm w-full max-w-xs"
		placeholder="Type for autocomplete ..."
		:items="useInvoiceOrOffer().clients"
		:minInputLength="1"
		:value="val"
		@onInput="(i) => (val = i.input)"
		@selectItem="
			(i) => {
				val = `${i.name} (${i.number})`
				useInvoiceOrOffer().setClient(i)
			}
		"
		:itemProjection="
			(item: Client) => {
				return `${item.name}${item.number}${item.data.contactPerson.fullName}`
			}
		">
		<template #list-item-text="slot"
			><span
				v-html="
					slot.boldMatchText(slot.item.name) +
					'<br /><small>' +
					slot.boldMatchText(slot.item.number) +
					'<br />' +
					slot.boldMatchText(slot.item.data.contactPerson.fullName) +
					'</small>'
				"></span
		></template>
	</TypeAhead>
</template>
