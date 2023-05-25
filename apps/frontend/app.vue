<script setup>
	useHead({
		title: 'rachoon',
	})
	await useProfile().init()

	window.addEventListener('keyup', (e) => {
		if (e.key === 'Escape') {
			useTimeTrack().esc()
		}
	})
</script>

<template>
	<div v-if="useProfile().loading === true">Loading</div>
	<div id="app" data-theme="rachoon" v-else>
		<notifications position="top center" classes="alert alert-primary mt-2 notification" width="500px" />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
