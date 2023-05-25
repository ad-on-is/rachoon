<script setup>
	watch(
		computed(() => JSON.stringify(useClient().client.data.conditions.discount.valueType)),
		() => {
			if (useClient().client.data.conditions.discount.valueType === 'percent' && useClient().client.data.conditions.discount.value > 100) {
				useClient().client.data.conditions.discount.value = 100
			}
		}
	)
</script>

<template>
	<div>
		<div class="divider"></div>
		<div class="prose mb-5">
			<h2>Conditions</h2>
		</div>
		<div class="grid grid-cols-2 gap-5">
			<div>
				<label class="label w-full max-w-xs">
					<span class="label-text">Early payment within</span>
				</label>
				<label class="input-group">
					<input
						type="text"
						placeholder="0"
						v-maska="'#*'"
						v-model="useClient().client.data.conditions.earlyPayment.days"
						class="input input-bordered input-sm w-full max-w-xs" />
					<span class="text-sm text-info">days</span>
				</label>
			</div>
			<div>
				<label class="label w-full max-w-xs">
					<span class="label-text">Early payment discount</span>
				</label>
				<label class="input-group">
					<input
						type="text"
						placeholder="0"
						v-maska="{ mask: '#*.##', preprocessor: (val) => useFormat.max100(val) }"
						v-model="useClient().client.data.conditions.earlyPayment.discount"
						class="input input-bordered input-sm w-full max-w-xs" />
					<span class="text-sm text-info">%</span>
				</label>
			</div>
			<div>
				<label class="label w-full max-w-xs">
					<span class="label-text">Invoice due in</span>
				</label>
				<label class="input-group">
					<input
						type="text"
						placeholder="14"
						v-maska="'#*'"
						v-model="useClient().client.data.conditions.invoiceDueDays"
						class="input input-bordered input-sm w-full max-w-xs" />
					<span class="text-sm text-info">days</span>
				</label>
			</div>
			<div>
				<label class="label w-full max-w-xs">
					<span class="label-text">Overall discount</span>
				</label>
				<div class="form-control">
					<div class="input-group">
						<input
							type="text"
							placeholder="0"
							v-maska="{
								mask: '#*.##',
								preprocessor: (val) => {
									return useClient().client.data.conditions.discount.valueType === 'percent' ? useFormat.max100(val) : val
								},
							}"
							v-model="useClient().client.data.conditions.discount.value"
							class="input input-bordered input-sm w-full max-w-xs" />
						<select class="select select-bordered select-sm bg-base-300" v-model="useClient().client.data.conditions.discount.valueType">
							<option selected value="percent">%</option>
							<option value="fixed">
								{{ useCountries.mySymbol() }}
							</option>
						</select>
					</div>
				</div>
			</div>
			<div>
				<label class="label w-full max-w-xs">
					<span class="label-text">Hourly rate</span>
				</label>
				<label class="input-group">
					<input
						type="text"
						placeholder="0"
						v-maska="'#*'"
						class="input input-bordered input-sm w-full max-w-xs"
						v-model="useClient().client.data.conditions.rate" />
					<span class="text-sm text-info">{{ useCountries.mySymbol() }}/h</span>
				</label>
			</div>
		</div>
	</div>
</template>
