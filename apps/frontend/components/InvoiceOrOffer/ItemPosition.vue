<script setup lang="ts">
	const props = defineProps({
		index: Number,
	})
	const invoiceOrOffer = useInvoiceOrOffer().invoiceOrOffer
	const position = invoiceOrOffer.data.positions[props.index]
	const taxRates = useProfile().me.organization.settings.taxes.rates
	const units = useProfile().me.organization.settings.units

	position.tax = position.tax || taxRates.filter((r) => r.default)[0].rate
	position.unit = position.unit || units.filter((u) => u.default)[0].title
</script>

<template>
	<tr>
		<td colspan="8">
			<div class="collapse" :class="{ 'collapse-open': position.focused }">
				<table class="table table-compact table-zebra w-full">
					<tbody>
						<tr>
							<td class="handle text-info" width="20">
								<FaIcon icon="fa-up-down" />
							</td>
							<td>
								<input
									type="text"
									:disabled="invoiceOrOffer.disabled()"
									placeholder="Add a short summary ..."
									v-model="position.title"
									@focus="invoiceOrOffer.focusPosition(index)"
									class="input input-bordered input-sm w-full" />
							</td>
							<td width="200">
								<div class="form-control">
									<div class="input-group">
										<input
											:disabled="invoiceOrOffer.disabled()"
											type="text"
											placeholder="0"
											v-maska="'#*.#*'"
											v-model="position.quantity"
											class="input input-bordered input-sm w-full" />
										<select class="select select-bordered select-sm bg-base-300" v-model="position.unit" :disabled="invoiceOrOffer.disabled()">
											<option v-for="u in units" :value="u.title" :key="u.title">
												{{ u.title }}
											</option>
										</select>
									</div>
								</div>
							</td>
							<td width="170">
								<div class="form-control">
									<label class="input-group">
										<input
											type="text"
											placeholder="0"
											v-model.number="position.price"
											v-maska="'#*.##'"
											class="input input-bordered input-sm w-full"
											:disabled="invoiceOrOffer.disabled()" />
										<span>€</span>
									</label>
								</div>
							</td>
							<td width="120">
								<div class="form-control">
									<label class="input-group">
										<select class="select select-bordered select-sm" v-model="position.tax" :disabled="invoiceOrOffer.disabled()">
											<option v-for="r in taxRates" :value="r.rate" :key="r.rate">{{ r.rate }}%</option>
										</select>
										<span>%</span>
									</label>
								</div>
							</td>
							<td width="120">
								<div class="form-control">
									<label class="input-group">
										<input
											type="text"
											placeholder="0"
											class="input input-bordered input-sm w-full"
											v-model.number="position.discount"
											v-maska="{ mask: '#*.##', preprocessor: (val) => useFormat.max100(val) }"
											:disabled="invoiceOrOffer.disabled()" />
										<span>%</span>
									</label>
								</div>
							</td>
							<td width="200" class="text-right">
								<Popper arrow hover>
									<span class="text-info">{{ useFormat.toCurrency(position.net) }}</span>
									<template #content>
										<div class="text-xs">
											{{ useFormat.toCurrency(position.netNoDiscount) }}<br />
											{{ position.net - position.netNoDiscount === 0 ? '' : useFormat.toCurrency(position.net - position.netNoDiscount) }}<br />
											-----------<br />
											{{ useFormat.toCurrency(position.net) }}<br />
											tax: {{ useFormat.toCurrency(position.total - position.net) }}<br />
											-----------<br />
											{{ useFormat.toCurrency(position.total) }}<br />
										</div>
									</template>
								</Popper>
							</td>
							<td width="50">
								<button
									class="btn btn-square btn-sm mr-2 text-error"
									@click="invoiceOrOffer.removePosition(index)"
									:disabled="invoiceOrOffer.disabled()">
									<FaIcon icon="fa-trash-can" />
								</button>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="collapse-content p-0">
					<Editor v-model="position.text" placeholder="Add a description ..." class="ml-4 bg-transparent" />
				</div>
			</div>
		</td>
	</tr>
</template>
