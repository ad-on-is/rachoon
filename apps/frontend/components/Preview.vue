<script setup>
	const props = defineProps({
		example: String,
	})
	const loading = ref(false)
	let images = ref([])
	onMounted(async () => {
		load()
	})
	async function load() {
		loading.value = true
		images.value = props.example ? await useExample().preview(props.example) : await useInvoiceOrOffer().preview(props.example)
		loading.value = false
	}
</script>

<template>
	<div class="">
		<progress class="progress w-full progress-primary" v-if="loading"></progress>
		<div v-else class="text-center">
			<div v-for="(image, i) in images">
				<span v-if="!example" class="badge badge-sm mb-2">Page {{ i + 1 }}</span
				><img :src="image" class="inline rounded-xl" /><br />
			</div>
			<button class="btn mt-5" @click="load" v-if="props.example">Refresh</button>
		</div>
	</div>
</template>

<style scoped>
	img {
		width: 500px;
		height: auto;
	}
</style>
