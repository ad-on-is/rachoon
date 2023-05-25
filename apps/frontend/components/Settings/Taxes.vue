<script setup>
	const rates = useSettings().settings.taxes.rates
	const options = useSettings().settings.taxes.options
	const defaultRate = ref(rates.findIndex((r) => r.default))
	const defaultOption = ref(options.findIndex((o) => o.default))
</script>
<template>
	<div class="prose mt-5">
		<h2>Taxes</h2>
	</div>
	<div class="divider opacity-50"></div>
	<div class="grid grid-cols-2 gap-5">
		<div>
			<table class="table table-compact table-zebra w-full table-primary">
				<thead>
					<tr>
						<th>Rate</th>
						<th>Default</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(r, i) in rates" :key="i">
						<td>
							<div class="form-control">
								<label class="input-group">
									<input type="text" placeholder="0" v-model.number="r.rate" v-maska="'#*.##'" class="input input-bordered input-sm" />
									<span class="text-sm text-info">%</span>
								</label>
							</div>
						</td>
						<td>
							<div class="form-control">
								<input
									type="radio"
									class="radio radio-success"
									:value="i"
									v-model="defaultRate"
									@change="useSettings().settings.setDefaultRate(i)" />
							</div>
						</td>
						<td class="text-right">
							<button class="btn btn-square btn-sm mr-2" @click="useSettings().settings.removeTaxRate(i)">
								<FaIcon icon="fa-trash-can" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="flex justify-center mt-5">
				<button class="btn btn-xs btn-info btn-outline gap-1" @click="useSettings().settings.addTaxRate()">
					<FaIcon icon="fa-add mr-5" />Add rate
				</button>
			</div>
			<div class="divider"></div>
			<div class="prose mb-5">
				<h2>Options</h2>
			</div>
			<table class="table table-compact table-zebra w-full table-primary">
				<thead>
					<tr>
						<th>Title</th>
						<th>Applicable</th>
						<th>Default</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(o, i) in options" :key="i">
						<td>
							<div class="form-control">
								<label>
									<input type="text" placeholder="0" v-model="o.title" class="input input-bordered input-sm" />
								</label>
							</div>
						</td>
						<td>
							<div class="form-control">
								<input type="checkbox" v-model="o.applicable" class="checkbox checkbox-success" />
							</div>
						</td>
						<td>
							<div class="form-control">
								<input
									type="radio"
									class="radio radio-success"
									:value="i"
									v-model="defaultOption"
									@change="useSettings().settings.setDefaultOption(i)" />
							</div>
						</td>
						<td class="text-right">
							<button class="btn btn-square btn-sm mr-2" @click="useSettings().settings.removeTaxOption(i)">
								<FaIcon icon="fa-trash-can" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="flex justify-center mt-5">
				<button class="btn btn-xs btn-info btn-outline gap-1" @click="useSettings().settings.addTaxOption()">
					<FaIcon icon="fa-add mr-5" />Add option
				</button>
			</div>
		</div>
		<div></div>
	</div>
</template>
