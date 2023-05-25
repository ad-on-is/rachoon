<script setup>
	const props = defineProps({
		entity: String,
	})
	const entity = useSettings().settings[props.entity]
</script>

<template>
	<div class="grid grid-cols-2 gap-5">
		<div>
			<label class="label w-full max-w-xs">
				<span class="label-text">Start with number <span class="text-red-700">*</span></span>
			</label>
			<input
				type="text"
				v-model="entity.number.start"
				v-maska="'#*'"
				placeholder="Organization name"
				required
				class="input input-bordered input-sm w-full max-w-xs" />
		</div>
		<div>
			<label class="label w-full max-w-xs">
				<span class="label-text">Prepend zeros</span>
			</label>
			<input
				type="text"
				v-maska="'#*'"
				v-model="entity.number.padZeros"
				placeholder=""
				required
				class="input input-bordered input-sm w-full max-w-xs" />
		</div>
		<div>
			<label class="label w-full max-w-xs">
				<span class="label-text">Format</span>
			</label>
			<input
				type="text"
				placeholder="VAT-Number"
				v-model="entity.number.format"
				required
				class="input input-bordered input-sm w-full max-w-xs" />
			<div class="text-xs mt-3">
				Placeholders:
				<span class="text-info">{number} {date:#FORMAT#}<br /> </span>

				<a href="https://date-fns.org/v2.29.3/docs/format" target="_blank">See format options here</a>
			</div>
		</div>

		<div class="prose">
			<span class="label w-full max-w-xs">Number preview</span>
			<h2 class="!text-success m-0 p-0">
				{{ useSettings().settings.numberFormat(props.entity) }}
			</h2>
		</div>
	</div>
</template>
