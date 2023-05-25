<script setup lang="ts">
	useClient().form()
</script>

<template>
	<progress class="progress w-full progress-primary" v-if="useClient().loading"></progress>
	<form @submit="useClient().save" v-else>
		<div class="prose mb-5">
			<h1><FaIcon icon="fa-solid fa-users" /> {{ useClient().title }}</h1>
		</div>
		<div class="flex gap-2">
			<button class="btn btn-sm btn-primary gap-2" type="submit"><FaIcon icon="fa-solid fa-plus-circle " /> Save</button>
			<button v-if="useClient().client.id !== ''" class="btn btn-sm btn-error gap-2 btn-outline">
				<FaIcon icon="fa-solid fa-close" /> Delete
			</button>
		</div>

		<div class="divider"></div>

		<ul v-if="useClient().hasErrors" class="border-2 border-warning rounded p-5 mt-5 mb-10">
			<li v-for="e in useClient().client.errors()" class="text-warning">
				{{ e }}
			</li>
		</ul>

		<div class="grid grid-cols-2 gap-5">
			<ClientFormBasic />
			<ClientFormContact />
			<ClientFormAddress />
			<ClientFormConditions />
		</div>
	</form>
	<ClientProjectsList v-if="useClient().client.id !== ''" />
</template>
