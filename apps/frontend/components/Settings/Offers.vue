<template>
	<div class="prose mt-5">
		<h2>Offers</h2>
	</div>
	<div class="divider opacity-50"></div>
	<div class="grid grid-cols-2 gap-5">
		<div>
			<SettingsFormat entity="offers" />
			<div class="divider"></div>
			<div>
				<label class="label w-full max-w-xs">
					<span class="label-text">Valid for</span>
				</label>
				<label class="input-group">
					<input
						type="text"
						v-maska="'#*'"
						placeholder="10"
						v-model="useSettings().settings.offers.dueDays"
						required
						class="input input-bordered input-sm w-full max-w-xs" />
					<span class="text-sm text-info">days</span>
				</label>
			</div>
		</div>

		<Preview example="offer" />
	</div>
</template>
