<script setup lang="ts">
	const invoiceOrOffer = useInvoiceOrOffer().invoiceOrOffer
	const positions = invoiceOrOffer.data.positions
	const discountsCharges = invoiceOrOffer.data.discountsCharges

	const modal = ref(false)
</script>

<template>
	<div v-if="modal">
		<input type="checkbox" id="timetrack-modal" class="modal-toggle" />
		<label for="timetrack-modal" class="modal cursor-pointer" @click.self="modal = false">
			<label class="modal-box relative">
				<TimeTrackListForImport @selected="modal = false" />
			</label>
		</label>
	</div>
	<table class="table table-compact table-zebra w-full shadow-lg table-primary">
		<thead>
			<tr>
				<th width="20" class="bg-info bg-opacity-10 bg-op"></th>
				<th>Position</th>
				<th width="200">Quantity</th>
				<th width="170">Price</th>
				<th width="120">Tax</th>
				<th width="120">Discount</th>
				<th width="200" class="text-right">Total Net</th>
				<th width="50"></th>
			</tr>
		</thead>

		<Draggable :list="positions" item-key="id" tag="tbody" handle=".handle" ghost-class="ghost">
			<template #item="{ _, index }">
				<InvoiceOrOfferItemPosition :index="index" />
			</template>
		</Draggable>
	</table>
	<div class="flex justify-center mt-5 mb-10">
		<button :disabled="invoiceOrOffer.disabled() ? true : null" class="btn btn-xs btn-primary btn-outline gap-1" @click="invoiceOrOffer.addPosition()">
			<FaIcon icon="fa-add mr-5" />Add position
		</button>
		<label
			:disabled="invoiceOrOffer.disabled() || invoiceOrOffer.clientId === null ? true : null"
			class="btn btn-xs btn-warning btn-outline gap-1 ml-5"
			for="timetrack-modal"
			@click="modal = true"
		>
			<FaIcon icon="fa-clock mr-5" />Import from TimeTrack {{ invoiceOrOffer.clientId === null ? ' (client must be set)' : '' }}
		</label>
	</div>
	<table class="table table-compact table-zebra w-full shadow-lg table-info" v-if="discountsCharges.length > 0">
		<thead>
			<tr>
				<th width="20"></th>
				<th width="200" class="bg-primary primary bg-opacity-10">Discount/Charge</th>
				<th>Title</th>
				<th width="170">Value</th>
				<th width="50"></th>
			</tr>
		</thead>

		<Draggable :list="discountsCharges" item-key="id" tag="tbody" handle=".handle" ghost-class="ghost">
			<template #item="{ _, index }">
				<InvoiceOrOfferItemDiscountCharge :index="index" />
			</template>
		</Draggable>
	</table>
	<p v-else class="text-info text-center" :class="invoiceOrOffer.disabled() ? 'opacity-30' : ''">Add discounts or charges to apply them on the subtotal.</p>
	<div class="flex justify-center mt-5">
		<button class="btn btn-xs btn-info btn-outline mb-10 gap-1" @click="invoiceOrOffer.addDiscountCharge()" :disabled="invoiceOrOffer.disabled() ? true : null">
			<FaIcon icon="fa-add" /> Add discount or charge
		</button>
	</div>
</template>

<style scoped>
	.modal-box {
		max-width: 80vw;
		height: 90vh;
	}
</style>
