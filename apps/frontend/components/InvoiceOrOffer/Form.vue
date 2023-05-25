<!-- 
todo: 
- select client (add client ad-hoc)
- Discount
- Show tax/EU-tax/non-EU tax/one-stop-shop
- reccuring?

 -->

<script setup lang="ts">
	useInvoiceOrOffer().form()

	const modal = ref(false)

	watch(
		// fixes the problem where old,new values are the same
		[
			computed(() => JSON.stringify(useInvoiceOrOffer().invoiceOrOffer.data.positions)),
			computed(() => JSON.stringify(useInvoiceOrOffer().invoiceOrOffer.data.discountsCharges)),
			computed(() => JSON.stringify(useInvoiceOrOffer().invoiceOrOffer.data.taxOption)),
			computed(() => JSON.stringify(useInvoiceOrOffer().invoiceOrOffer.data.date)),
			computed(() => JSON.stringify(useInvoiceOrOffer().invoiceOrOffer.data.dueDate)),
		],
		() => {
			useInvoiceOrOffer().updated()
		}
	)

	definePageMeta({
		layout: 'core',
	})

	async function save() {
		const inv = await useInvoiceOrOffer().save()
		// useRouter().replace(inv.id.toString());
	}

	function preview() {
		modal.value = true
	}
</script>
<template>
	<progress class="progress w-full progress-primary" v-if="useInvoiceOrOffer().loading"></progress>
	<div v-else>
		<div v-if="modal">
			<input type="checkbox" id="preview-modal" class="modal-toggle" />
			<label for="preview-modal" class="modal cursor-pointer" @click.self="modal = false">
				<label class="modal-box relative" for="preview-modal">
					<Preview />
				</label>
			</label>
		</div>
		<div class="flex gap-2">
			<button class="btn btn-sm btn-primary gap-2" @click="save"><FaIcon icon="fa-solid fa-save " /> Save</button>
			<label class="btn btn-sm btn-warning gap-2 btn-outline" for="preview-modal" @click="modal = true"
				><FaIcon icon="fa-solid fa-eye" /> Preview</label
			>
			<button
				class="btn btn-sm btn-success gap-2 btn-outline"
				@click="useInvoiceOrOffer().download()"
				v-if="useInvoiceOrOffer().invoiceOrOffer.id !== '' && useInvoiceOrOffer().mustSave <= 1">
				<FaIcon icon="fa-solid fa-file-pdf" />
				Download PDF
			</button>
			<button
				class="btn btn-sm btn-error gap-2 btn-outline"
				v-if="useInvoiceOrOffer().invoiceOrOffer.id !== ''"
				@click="useInvoiceOrOffer().del()">
				<FaIcon icon="fa-solid fa-close" /> Delete
			</button>
		</div>

		<div class="divider"></div>
		<ul v-if="useInvoiceOrOffer().hasErrors" class="border-2 border-warning rounded p-5 mt-5 mb-10">
			<li v-for="e in useInvoiceOrOffer().invoiceOrOffer.errors()" class="text-warning">
				{{ e }}
			</li>
		</ul>

		<div class="flex flex-row">
			<div class="basis-1/2">
				<div class="prose mb-5">
					<h1 class="mb-2">
						<FaIcon :icon="useInvoiceOrOffer().type() === 'offers' ? 'fa-solid fa-file-invoice' : 'fa-solid fa-file-invoice-dollar'" />
						{{ useInvoiceOrOffer().title }}
					</h1>
				</div>
				<div class="prose"><h3 class="text-success">Client</h3></div>
				<div v-if="useRoute().params['id'] === 'new'">
					<label class="label">
						<span class="label-text">Select a client</span>
					</label>
					<InvoiceOrOfferClientAutoComplete required />
				</div>

				<div class="prose" v-if="useInvoiceOrOffer().invoiceOrOffer.client">
					<p class="mt-5 mb-5 text-info">
						{{ useInvoiceOrOffer().invoiceOrOffer.client.name }} <br />
						{{ useInvoiceOrOffer().invoiceOrOffer.client.data.address.street }}<br />
						{{ useInvoiceOrOffer().invoiceOrOffer.client.data.address.zip }}
						{{ useInvoiceOrOffer().invoiceOrOffer.client.data.address.city }}<br />
						{{ useInvoiceOrOffer().invoiceOrOffer.client.data.address.country }}<br />
					</p>
				</div>
			</div>
			<div class="flex basis-1/2 flex-row">
				<div class="basis-1/2 prose"></div>
				<div class="basis-1/2 mb-5">
					<div class="prose">
						<h2 v-if="useInvoiceOrOffer().offerToConvert.id !== ''" class="mt-0 !text-error">
							{{ useRoute().query.option }} of
							{{ useInvoiceOrOffer().offerToConvert.number }}
						</h2>
						<h3 class="text-info">Date</h3>
					</div>
					<label class="label">
						<span class="label-text">Invoice date:</span>
					</label>
					<DatePicker v-model="useInvoiceOrOffer().invoiceOrOffer.data.date" />
					<label class="label">
						<span class="label-text">Due date:</span>
					</label>
					<DatePicker v-model="useInvoiceOrOffer().invoiceOrOffer.data.dueDate" />
				</div>
			</div>
		</div>
		<div class="divider m-0 p-0"></div>
		<div class="collapse collapse-arrow rounded-box">
			<input type="checkbox" />
			<h3 class="collapse-title text-lg text-warning w-60 pl-0">Custom heading text</h3>
			<div class="collapse-content p-0">
				<Editor v-model="useInvoiceOrOffer().invoiceOrOffer.data.headingText" />
			</div>
		</div>
		<div class="divider m-0 p-0"></div>
		<InvoiceOrOfferItems />
		<div class="divider p-0 m-0"></div>
		<div class="collapse collapse-arrow rounded-box">
			<input type="checkbox" />
			<h3 class="collapse-title text-lg text-warning w-60 pl-0">Custom footer text</h3>
			<div class="collapse-content p-0">
				<Editor v-model="useInvoiceOrOffer().invoiceOrOffer.data.footerText" />
			</div>
		</div>
		<div class="divider p-0 m-0"></div>
		<div class="flex flex-row gap-5">
			<div class="basis-2/4"></div>
			<div class="basis-1/4">
				<InvoiceOrOfferOptions />
			</div>

			<div class="basis-1/4">
				<InvoiceOrOfferTotals />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.modal-box {
		max-height: 800px;
	}
	.ghost {
		opacity: 0.5;
		td {
			@apply bg-warning-content #{!important};
		}
	}
	.sortable-chosen {
		opacity: 0.3;
		td {
			@apply bg-warning-content #{!important};
		}
		.collapse-content {
			display: none;
		}
	}
</style>
