<script setup lang="ts">
	const invoiceOrOffer = useInvoiceOrOffer().invoiceOrOffer
</script>

<template>
	<div class="prose max-w-full">
		<div v-if="invoiceOrOffer.data.discountsCharges.length > 0">
			<div class="flex justify-between">
				<h3 class="m-0 !text-base-content">Subtotal</h3>
				<h2 class="m-0 !text-base-content">
					{{ useFormat.toCurrency(invoiceOrOffer.data.netNoDiscount) }}
				</h2>
			</div>
			<div class="divider text-info">Discounts / Charges</div>
			<div v-for="dc in invoiceOrOffer.data.discountsCharges">
				<div class="flex justify-between" v-if="dc.title !== '' && Number(dc.value || 0) > 0">
					<h3 class="m-0 !text-info">
						{{ dc.type === 'discount' ? '-' : '+' }}
						{{ dc.title }}
						{{ dc.valueType === 'percent' ? '(' + dc.value + '%)' : '' }}
					</h3>
					<h3 class="m-0 !text-info">
						{{ useFormat.toCurrency(dc.amount) }}
					</h3>
				</div>
			</div>
			<div class="divider"></div>
		</div>

		<div class="flex justify-between">
			<h3 class="m-0 !text-base-content">Net</h3>
			<h3 class="m-0 !text-base-content">
				{{ useFormat.toCurrency(invoiceOrOffer.data.net) }}
			</h3>
		</div>
		<div>
			<div class="divider text-warning m-0 p-0">
				{{ invoiceOrOffer.data.taxOption.title }}
			</div>
			<div v-if="invoiceOrOffer.data.taxOption.applicable">
				<div class="flex justify-between" v-for="(_, rate) in invoiceOrOffer.data.taxes">
					<h3 class="m-0 !text-warning">{{ rate }}%</h3>
					<h3 class="m-0 !text-warning">
						{{ useFormat.toCurrency(invoiceOrOffer.data.taxes[rate]) }}
					</h3>
				</div>
			</div>
			<div v-else>
				<div class="flex justify-between">
					<h3 class="m-0 !text-warning"></h3>
					<h3 class="m-0 !text-warning">
						{{ useFormat.toCurrency(0) }}
					</h3>
				</div>
			</div>
		</div>

		<div class="divider m-0 p-0"></div>
		<h1 class="text-right text-success">
			{{ useFormat.toCurrency(invoiceOrOffer.data.total) }}
		</h1>
	</div>
</template>
