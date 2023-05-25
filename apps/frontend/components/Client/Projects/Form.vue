<script setup lang="ts">
	import { Project } from '~~/models/project'

	const emit = defineEmits(['add'])
	const props = defineProps({
		project: Object,
	})

	const project = ref(
		props.project
			? (props.project as Project)
			: {
					number: '',
					data: {
						title: '',
						description: '',
						rate: ref(useClient().client.data.conditions.rate || 0),
						discount: null,
					},
					client: useClient().client,
					id: '',
			  }
	)

	watch(
		computed(() => JSON.stringify(project.value.data.title)),
		() => {
			project.value.number = useClient().projectNumber(project.value)
		}
	)

	function save(e: Event) {
		e.preventDefault()
		useClient().saveProject(project.value)
		emit('add')
	}
</script>

<template>
	<form class="prose" @submit="save">
		<h2 class="!text-info mb-0">New project</h2>
		<h3 class="!text-warning mt-0">#{{ project.number }}</h3>
		<div>
			<label class="label w-full">
				<span class="label-text">Title <span class="text-error">*</span></span>
			</label>
			<input type="text" placeholder="Project title" required class="input input-bordered input-sm w-full" v-model="project.data.title" />
		</div>

		<div>
			<label class="label w-full">
				<span class="label-text">Description</span>
			</label>
			<input type="text" placeholder="Add a description ..." class="input input-bordered input-sm w-full" v-model="project.data.description" />
		</div>
		<div>
			<label class="label w-full">
				<span class="label-text">Rate <span class="text-error">*</span></span>
			</label>
			<label class="input-group">
				<input type="text" placeholder="0" class="input input-bordered input-sm w-full" required v-model="project.data.rate" />
				<span class="text-sm text-info">{{ useCountries.mySymbol() }}/h</span>
			</label>
		</div>
		<div>
			<label class="label w-full">
				<span class="label-text">Discount</span>
			</label>
			<label class="input-group">
				<input type="text" placeholder="0" class="input input-bordered input-sm w-full" v-model="project.data.discount" />
				<span class="text-sm text-info">%</span>
			</label>
		</div>
		<div class="text-center">
			<button type="submit" class="btn btn-sm mt-10 btn-info gap-2">Add project</button>
		</div>
	</form>
</template>
