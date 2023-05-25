<script setup lang="ts">
	useClient().list()
</script>

<template>
	<progress class="progress w-full progress-primary" v-if="useClient().loading"></progress>
	<div v-else>
		<div class="text-center mt-20" v-if="useClient().clients.length === 0">
			<div class="prose">
				<FaIcon icon="fa-users" class="text-5xl text-accent" />
				<h1 class="!text-accent mt-5">No clients</h1>
				<p>It appears you have <strong class="text-accent">no clients</strong> created. Go ahead and create one.</p>
			</div>
			<NuxtLink class="btn btn-sm btn-primary mt-10 gap-2" href="/clients/new">
				<FaIcon icon="fa-solid fa-plus-circle gap-2 " /> New client
			</NuxtLink>
		</div>

		<div v-else>
			<NuxtLink class="btn btn-sm btn-primary gap-2" href="/clients/new"> <FaIcon icon="fa-solid fa-plus-circle " /> New client </NuxtLink>

			<div class="divider"></div>

			<div class="overflow-x-auto">
				<table class="table table-zebra table-compact w-full table-primary">
					<!-- head -->
					<thead>
						<tr>
							<th width="200">#</th>
							<th>Name</th>
							<th width="100">Offers</th>
							<th width="100">Invoices</th>
							<th width="100">Projects</th>
							<th width="200" class="text-right">Time tracks</th>
						</tr>
					</thead>
					<tbody>
						<tr class="hover" v-for="c in useClient().clients" :key="c.id">
							<td>
								<NuxtLink :href="`/clients/${c.id}`" class="link"> {{ c.number }}</NuxtLink
								><br /><small class="opacity-50">last modified {{ useFormat.date(c.updatedAt) }}</small>
							</td>
							<td>
								{{ c.name }}<br /><small class="opacity-50">{{ c.data.info.vat }}</small>
							</td>
							<td>
								{{ c.totalOffers }}<br />
								<span v-if="c.pendingOffers > 0" class="text-error text-opacity-50">{{ c.pendingOffers }}</span
								>&nbsp;
							</td>
							<td>
								{{ c.totalInvoices }}<br />
								<small v-if="c.pendingInvoices > 0" class="text-error text-opacity-50">pending {{ c.pendingInvoices }}</small
								>&nbsp;
							</td>
							<td>{{ c.totalProjects }}<br />&nbsp;</td>
							<td class="text-right">
								<span class="text-info">{{ c.duration }}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
