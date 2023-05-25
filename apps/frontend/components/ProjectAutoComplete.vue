<script setup lang="ts">
	import TypeAhead from 'vue3-simple-typeahead'
	import { Project } from '~~/models/project'
	const props = defineProps({
		items: Array,
		selectItem: Function,
	})
	const val = ref('')
</script>
<template>
	<TypeAhead
		class="input input-bordered input-sm w-full max-w-xs"
		placeholder="Type to select project..."
		:value="val"
		@onInput="(i) => (val = i.input)"
		@selectItem="
			(i) => {
				val = `${i.data.title} (${i.number})`
				props.selectItem(i)
			}
		"
		:items="props.items"
		:minInputLength="1"
		:itemProjection="
			(item: Project) => `${item.number}${item.data.title}${item.client.name}`
		">
		<template #list-item-text="slot"
			><span
				v-html="
					slot.boldMatchText(slot.item.data.title) +
					'<br /><small>' +
					slot.boldMatchText(slot.item.number) +
					'<br />' +
					slot.boldMatchText(slot.item.client.name) +
					'</small>'
				"></span
		></template>
	</TypeAhead>
</template>
