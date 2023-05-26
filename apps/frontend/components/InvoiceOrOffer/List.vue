<!-- 

todo: 
- reminders (probably automatically?)
- reversals (cancellation, storno)
- credit (gutschrift) ? 

 -->

<script setup lang="ts">
	import { InvoiceOrOffer } from '~~/models/invoiceOrOffer'
	import * as datefns from 'date-fns'

	definePageMeta({
		layout: 'core',
	})
	const props = defineProps({
		list: Array<InvoiceOrOffer>,
		type: String,
	})

	const modal = ref(false)
	const offer = ref(new InvoiceOrOffer())

	function offerToInvoice(io: InvoiceOrOffer) {
		offer.value = io
		modal.value = true
	}

	useInvoiceOrOffer().list()
</script>

<template>
	<progress class="progress w-full progress-primary" v-if="useInvoiceOrOffer().loading"></progress>
	<div v-else>
		<div v-if="modal">
			<input type="checkbox" id="offerToInvoice-modal" class="modal-toggle" />
			<label for="offerToInvoice-modal" class="modal cursor-pointer">
				<label class="modal-box relative">
					<InvoiceOrOfferToInvoice :offer="offer" />
				</label>
			</label>
		</div>
		<div v-if="(!list || list.length === 0) && useInvoiceOrOffer().invoicesOrOffers.length === 0" class="text-center mt-20">
			<div class="prose">
				<FaIcon :icon="useInvoiceOrOffer().type() === 'offers' ? 'fa-solid fa-file-invoice' : 'fa-solid fa-file-invoice-dollar'" class="text-5xl text-accent" />
				<h1 class="!text-accent mt-5">No {{ useInvoiceOrOffer().type() }}</h1>
				<p>
					It appears you have
					<strong class="text-accent">no {{ useInvoiceOrOffer().type() }}</strong>
					created. Go ahead and create one.
				</p>
			</div>
			<div class="mt-10">
				<NuxtLink :href="'/' + useInvoiceOrOffer().type() + '/new'" class="btn btn-primary btn-sm gap-2">
					<FaIcon icon="fa-solid fa-plus-circle " />
					new {{ useInvoiceOrOffer().singularType() }}
				</NuxtLink>
			</div>
		</div>
		<div v-else class="overflow-x-auto">
			<div v-if="!list">
				<NuxtLink :href="'/' + useInvoiceOrOffer().type() + '/new'" class="btn btn-primary btn-sm gap-2">
					<FaIcon icon="fa-solid fa-plus-circle " />
					new {{ useInvoiceOrOffer().singularType() }}
				</NuxtLink>

				<div class="divider"></div>
			</div>
			<table class="table table-zebra table-compact w-full table-primary overflow-hidden">
				<!-- head -->
				<thead>
					<tr>
						<th width="50"></th>
						<th>#</th>
						<th>Client</th>
						<th>{{ useInvoiceOrOffer().type() === 'invoices' ? 'Offer' : 'Invoiced' }}</th>
						<th>Date</th>
						<th>Net</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr class="hover" v-for="io in list || useInvoiceOrOffer().invoicesOrOffers" :key="io.id">
						<td class="text-center">
							<span
								class="btn btn-circle btn-xs mr-2"
								:class="io.status === 'pending' ? (datefns.isPast(io.data.dueDate) ? 'btn-error' : 'btn-warning') : 'btn-success'"
								@click="useInvoiceOrOffer().setStatus(io)"
							>
								<FaIcon :icon="io.status == 'pending' ? 'fa-regular fa-clock' : 'fa-check'" />
							</span>
						</td>
						<td width="200">
							<NuxtLink :href="'/' + (useInvoiceOrOffer().type() || type) + '/' + io.id" class="link">{{ io.number }}</NuxtLink>
							<br />
							<small class="opacity-50">last modified {{ useFormat.date(io.updatedAt) }}</small>
						</td>
						<td>
							{{ io.client.name }}
							<br />
							<small class="opacity-50">{{ io.client.number }}</small>
						</td>
						<td>
							<span v-if="io.offer.id !== ''" class="text-warning">
								{{ useFormat.toCurrency(io.offer.data.total) }}
								<br />
								<span class="badge badge-xs badge-outline badge-warning opacity-30 py-2 mr-2"
									><NuxtLink :href="`/offers/${io.offer.id}`">{{ io.offer.number }}</NuxtLink></span
								>
							</span>
							<span v-if="io.invoices.length > 0" class="text-warning">
								{{ useFormat.toCurrency(io.invoices.reduce((p, c) => (p += c.data.total), 0)) }}
								<br />
								<span class="badge badge-xs badge-outline badge-warning opacity-30 py-2 mr-2" v-for="inv in io.invoices">
									<NuxtLink :href="`/invoices/${inv.id}`">{{ inv.number }}</NuxtLink></span
								>
							</span>
							<span v-else></span>
						</td>
						<td width="200">
							{{ useFormat.date(io.data.date) }}
							<br />
							<small :class="io.status === 'pending' && datefns.isPast(io.data.dueDate) ? 'text-error' : 'opacity-50'"> due on {{ useFormat.date(io.data.dueDate) }} </small>
						</td>

						<td class="text-info" width="200">
							{{ useFormat.toCurrency(io.data.net) }}
							<br />
							&nbsp;
						</td>
						<td width="200">
							<span class="text-success">{{ useFormat.toCurrency(io.data.total) }}</span>
							<br />
							<small class="opacity-50">taxes {{ useFormat.toCurrency(io.data.total - io.data.net) }}</small>
						</td>
						<td width="50" class="text-right">
							<Popper arrow hover content="Download PDF">
								<span class="btn btn-square btn-sm" @click="useInvoiceOrOffer().download(io)">
									<FaIcon icon="fa-download" />
								</span>
							</Popper>

							<Popper arrow hover content="Create invoice" v-if="io.type === 'offer' && io.invoices.reduce((p, c) => (p += c.data.net), 0) < io.data.net">
								<label for="offerToInvoice-modal" class="btn btn-square btn-sm ml-2" @click="offerToInvoice(io)">
									<FaIcon icon="fa-money-check-dollar" />
								</label>
							</Popper>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.modal-box {
		max-height: 800px;
	}
</style>
