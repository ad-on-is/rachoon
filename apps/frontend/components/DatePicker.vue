<script setup>
	import VueDatePicker from '@vuepic/vue-datepicker'
	import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, subYears, format } from 'date-fns'

	const props = defineProps({
		modelValue: { type: Date, default: Date.now() } | { type: Array, default: [Date.now(), Date.now()] },
		range: Boolean,
		format: String,
		iconOnly: Boolean,
	})
	const thisMonth = [startOfMonth(new Date()), endOfMonth(new Date())]
	const lastMonth = [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))]
	const oneMonthBefore = [startOfMonth(subMonths(new Date(), 2)), endOfMonth(subMonths(new Date(), 2))]
	const twoMonthsBefore = [startOfMonth(subMonths(new Date(), 3)), endOfMonth(subMonths(new Date(), 3))]
	const lastYear = [startOfYear(subYears(new Date(), 1)), endOfYear(subYears(new Date(), 1))]
	const presetRanges = ref([
		{ label: format(thisMonth[0], 'MMM Y'), range: thisMonth },
		{
			label: format(lastMonth[0], 'MMM Y'),
			range: lastMonth,
		},
		{ label: format(oneMonthBefore[0], 'MMM Y'), range: oneMonthBefore },
		{ label: format(twoMonthsBefore[0], 'MMM Y'), range: twoMonthsBefore },
		{ label: 'This year', range: [startOfYear(new Date()), endOfYear(new Date())] },
		{ label: 'Last year', range: lastYear },
	])
	const date = ref(props.modelValue)
	const emit = defineEmits(['update:modelValue'])
	function update(date) {
		emit('update:modelValue', date)
	}
</script>

<template>
	<VueDatePicker
		:dark="true"
		:clearable="false"
		:inputClassName="iconOnly ? '!bg-transparent !border-none' : '!input !input-bordered !input-sm !w-full !bg-base-200 !pl-9'"
		inputClassName=""
		calendarClassName="!bg-base-100 !text-base-content"
		calendarCellClassName="!bg-info !bg-opacity-5"
		menuClassName="!bg-info"
		:range="props.range"
		v-model="date"
		:preset-ranges="range ? presetRanges : []"
		@update:modelValue="update"
		:format="props.format || 'dd.MM.yyyy'"
		:autoApply="true"
		:enableTimePicker="false"
	>
		<template #input-icon>
			<FaIcon icon="fa-calendar-days" class="text-info" :class="iconOnly ? '' : 'text-sm ml-3'" />
		</template>
	</VueDatePicker>
</template>
