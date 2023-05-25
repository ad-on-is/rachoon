<script setup lang="ts">
	import { InvoiceOrOffer } from '~~/models/invoiceOrOffer'

	const props = defineProps({
		offer: Object,
	})
	const offer = props.offer as InvoiceOrOffer
	const option = ref('full')
	const value = ref(null)
	const valueType = ref('percent')

	const amount = computed(() =>
		valueType.value === 'percent' ? useFormat.toCurrency((offer.data.net / 100) * value.value) : useFormat.toCurrency(value.value)
	)
</script>

<template>
	<div class="prose mb-5">
		<div v-if="offer.invoices.length > 0">
			<h3>Previous invoices</h3>
			<table class="table table-compact">
				<tbody>
					<tr v-for="i in offer.invoices">
						<td>{{ i.number }}</td>
						<td>{{ useFormat.toCurrency(i.data.net) }}</td>
						<td>{{ useFormat.toCurrency(i.data.total) }}</td>
					</tr>
				</tbody>
			</table>
			<div class="divider"></div>
		</div>
		<h3 class="mt-0">Type</h3>
		<p>What kind of invoice would you like to create?</p>
	</div>
	<label class="flex flex-row gap-2 mb-2" v-if="offer.invoices.length === 0">
		<input type="radio" name="option" class="radio radio-warning radio-sm" @change="option = 'full'" :checked="option === 'full'" />
		<span class="label-text">Full - convert offer to invoice</span>
	</label>
	<label class="flex flex-row gap-2 mb-2">
		<input type="radio" name="option" class="radio radio-warning radio-sm" @change="option = 'partial'" :checked="option === 'partial'" />
		<span class="label-text">Partial - only a specific amount of the offer</span>
	</label>
	<label class="flex flex-row gap-2 mb-2" v-if="offer.invoices.length > 0">
		<input type="radio" name="option" class="radio radio-warning radio-sm" @change="option = 'final'" :checked="option === 'final'" />
		<span class="label-text">Final - Remaining amount (subtract previous invoices)</span>
	</label>
	<div class="form-control prose mt-10" v-if="option === 'partial'">
		<h3>Partial amount</h3>
		<p>What amount should be converted to the invoice?</p>
		<div class="input-group">
			<input type="text" placeholder="0" class="input input-bordered input-sm w-40" v-model="value" />
			<select class="select select-bordered select-sm bg-base-300" v-model="valueType">
				<option value="percent">%</option>
				<option value="fixed">
					{{ useCountries.mySymbol() }}
				</option>
			</select>
			<span class="text-warning text-sm input-bordered w-40 text-right">{{ amount }}</span>
		</div>
	</div>
	<div class="divider"></div>
	<div class="text-center mt-5">
		<NuxtLink :href="`/invoices/new?offer=${offer.id}&option=${option}&value=${value}&valueType=${valueType}`" class="btn btn-primary btn-sm">
			Convert to invoice
		</NuxtLink>
	</div>
</template>
