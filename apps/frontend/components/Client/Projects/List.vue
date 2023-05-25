<script setup>
	const modal = ref(false)
</script>

<template>
	<div>
		<div v-if="modal">
			<input type="checkbox" id="project-modal" class="modal-toggle" />
			<label for="project-modal" class="modal cursor-pointer">
				<label class="modal-box relative" for="project-modal">
					<ClientProjectsForm @add="modal = false" />
				</label>
			</label>
		</div>
		<div class="divider"></div>
		<div v-if="useClient().projects.length === 0" class="text-center mt-20">
			<div class="prose">
				<FaIcon icon="fa-solid fa-cubes" class="text-5xl text-info" />
				<h1 class="!text-info mt-5">No projects</h1>
				<p>
					It appears you have
					<strong class="text-info">no projects</strong> created. Go ahead and create one.
				</p>
				<label class="btn btn-sm btn-info gap-2" for="project-modal" @click="modal = true">
					<FaIcon icon="fa-solid fa-plus-circle " /> New project
				</label>
			</div>
		</div>
		<div v-else>
			<div class="prose mt-10 mb-5">
				<h1 class="!text-info"><FaIcon icon="fa-solid fa-cubes " /> Projects</h1>
			</div>
			<div class="mb-5">
				<label class="btn btn-sm btn-info gap-2" for="project-modal" @click="modal = true">
					<FaIcon icon="fa-solid fa-plus-circle " /> New project
				</label>
			</div>
			<div class="divider"></div>
			<table class="table table-zebra table-compact w-full table-info">
				<thead>
					<tr>
						<th width="100">#</th>
						<th width="400">Name</th>
						<th>Description</th>
						<th width="100">Rate {{ useCountries.mySymbol() }}/h</th>
						<th width="100" class="">Time</th>
						<th width="100" class="text-right">Net</th>
						<th width="50"></th>
					</tr>
				</thead>
				<tbody>
					<tr class="hover" v-for="p in useClient().projects">
						<td class="text-info">{{ p.number }}</td>
						<td>{{ p.data.title }}</td>
						<td>{{ p.data.description }}</td>
						<td class="text-accent">{{ useFormat.toCurrency(p.data.rate) }}</td>
						<td class="text-info">{{ p.duration }}</td>
						<td class="text-right">{{ useFormat.toCurrency((Math.round(p.minutes * 100) / 100 / 60) * p.data.rate) }}</td>
						<td>
							<button class="btn btn-square btn-sm mr-2 text-error" @click="useClient().deleteProject(p)">
								<FaIcon icon="fa-trash-can" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
