<script setup lang="ts">
	useUser().list()
</script>

<template>
	<progress class="progress w-full progress-primary" v-if="useUser().loading"></progress>
	<div v-else>
		<div class="text-center mt-20" v-if="useUser().users.length === 0">
			<div class="prose">
				<FaIcon icon="fa-users" class="text-5xl text-accent" />
				<h1 class="!text-accent mt-5">No Users</h1>
				<p>It appears you have <strong class="text-accent">no users</strong> created. Go ahead and create one.</p>
			</div>
			<NuxtLink class="btn btn-sm btn-primary mt-10 gap-2" href="/users/new">
				<FaIcon icon="fa-solid fa-plus-circle gap-2 " /> New user
			</NuxtLink>
		</div>

		<div v-else>
			<NuxtLink class="btn btn-sm btn-primary gap-2" href="/users/new"> <FaIcon icon="fa-solid fa-plus-circle " /> New user </NuxtLink>

			<div class="divider"></div>

			<div class="overflow-x-auto">
				<table class="table table-zebra table-compact w-full table-primary">
					<!-- head -->
					<thead>
						<tr>
							<th width="60"></th>
							<th>Name</th>
							<th>Time</th>
							<th width="100">Net</th>
						</tr>
					</thead>
					<tbody>
						<tr class="hover" v-for="u in useUser().users" :key="u.id">
							<td>
								<div class="avatar placeholder">
									<div class="bg-success text-black rounded-full w-10">
										<img v-if="u.data.avatar !== ''" :src="u.data.avatar" />
										<span v-else>{{ u.initials() }}</span>
									</div>
								</div>
							</td>
							<td>
								<NuxtLink :href="`/users/${u.id}`" class="link"> {{ u.data.fullName }}</NuxtLink
								><br /><small class="opacity-50">last modified {{ useFormat.date(u.updatedAt) }}</small>
							</td>
							<td class="text-info">{{ u.duration }}</td>
							<td class="text-warning">
								{{ useFormat.toCurrency(u.net) }}<br /><small class="opacity-50">rate {{ useFormat.toCurrency(u.data.rate) }}/h</small>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
