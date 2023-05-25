<template>
	<div class="prose mt-5">
		<h2>Invoices</h2>
	</div>
	<div class="divider opacity-50"></div>
	<div class="grid grid-cols-2 gap-5">
		<div>
			<SettingsFormat entity="invoices" />
			<div class="divider"></div>
			<div>
				<label class="label w-full max-w-xs">
					<span class="label-text">Due in</span>
				</label>
				<label class="input-group">
					<input
						type="text"
						placeholder="10"
						v-maska="'#*'"
						v-model="useSettings().settings.invoices.dueDays"
						required
						class="input input-bordered input-sm w-full max-w-xs" />
					<span class="text-sm text-info">days</span>
				</label>
			</div>
		</div>

		<Preview example="invoice" />
	</div>
</template>
