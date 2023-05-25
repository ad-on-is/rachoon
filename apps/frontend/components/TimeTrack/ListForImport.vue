<script setup lang="ts">
	const emit = defineEmits(['selected'])
	const allSelected = ref(false)
	const units = useProfile().me.organization.settings.units
	const taxRates = useProfile().me.organization.settings.taxes.rates
	const tax = ref(taxRates.filter((r) => r.default)[0].rate)
	const unit = ref(units.filter((u) => u.default)[0].title)
	const type = ref('group-by-project')

	const disabled = () => useTimeTrack().timeTracks.filter((t) => t.selected === true).length === 0

	onMounted(async () => {
		useTimeTrack().view = 'list'
		await useTimeTrack().getForImport()
	})

	function select() {
		useInvoiceOrOffer().importFromTimeTrack(
			useTimeTrack().timeTracks.filter((t) => t.selected),
			unit.value,
			tax.value,
			type.value,
			useTimeTrack().listDate
		)
		emit('selected')
	}

	const listMinutes = () => computed(() => useTimeTrack().timeTracks.reduce((a, b) => a + b.data.minutes, 0))
</script>

<template>
	<div v-if="useTimeTrack().loading">Loading</div>
	<div v-else>
		<div class="prose mb-5">
			<h2 class="!text-info mb-0">Import from TimeTrack</h2>
			<h4 class="!text-info !text-opacity-50" v-if="useInvoiceOrOffer().invoiceOrOffer.client">
				{{ useInvoiceOrOffer().invoiceOrOffer.client.name }} ({{ useInvoiceOrOffer().invoiceOrOffer.client.number }})
			</h4>
		</div>
		<table class="table table-compact w-full table-info">
			<thead>
				<tr>
					<th width="150">Map to unit</th>
					<th width="150">Apply tax</th>
					<th width="250">Date range</th>
					<th>Type</th>
					<th width="100"></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<select class="select select-bordered select-sm bg-base-300" v-model="unit">
							<option v-for="u in units" :value="u.title" :key="u.title">
								{{ u.title }}
							</option>
						</select>
					</td>
					<td>
						<select class="select select-bordered select-sm" v-model="tax">
							<option v-for="r in taxRates" :value="r.rate" :key="r.rate">{{ r.rate }}%</option>
						</select>
					</td>
					<td><DatePicker v-model="useTimeTrack().listDate" range /></td>
					<td>
						<select class="select select-bordered select-sm bg-base-300" v-model="type">
							<option value="group-by-project">Group entries by project</option>
							<option value="separate-entries">Each entry as position</option>
							<option value="single-entry">Merge entries into single position</option>
						</select>
					</td>
					<td class="text-right">
						<button class="btn btn-sm btn-info" @click="select" :disabled="disabled()">
							{{ disabled() ? 'Please select entries' : 'Import selected entries' }}
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="divider mt-0"></div>
		<table class="table table-zebra table-compact w-full table-primary">
			<thead>
				<tr>
					<th width="10">
						<input type="checkbox" class="checkbox checkbox-primary checkbox-sm" v-model="allSelected" @change="useTimeTrack().toggleAll(allSelected)" />
					</th>
					<th width="200">Project</th>
					<th>Summary</th>
					<th width="150">Date</th>
					<th width="120">Duration</th>
					<th width="200">User</th>
				</tr>
			</thead>
			<tbody>
				<tr class="hover" v-for="(t, i) in useTimeTrack().timeTracks">
					<td><input type="checkbox" class="checkbox checkbox-primary checkbox-sm" v-model="t.selected" /></td>
					<td>
						<span class="text-info">{{ t.project.data.title }}</span
						><br /><span class="text-xs opacity-50">{{ t.project.number }} - {{ t.project.client.name }}</span
						><br /><span class="text-xs text-info opacity-50">{{ useFormat.toCurrency(t.project.data.rate) }}/h</span>
					</td>
					<td>
						<input v-if="t.focused" type="text" required placeholder="Add a short summary ..." class="input input-bordered input-sm w-full" v-model="t.data.title" />
						<span v-else
							>{{ t.data.title }}<br /><span class="text-xs opacity-50">
								<div v-html="t.data.description || '<p>&nbsp;</p>'" class="simple-html"></div>
								&nbsp;</span
							></span
						>
					</td>
					<td>
						<DatePicker v-model="t.date" v-if="t.focused" /><span v-else>{{ useFormat.date(t.date) }}<br />&nbsp;</span>
					</td>
					<td>
						<input
							v-if="t.focused"
							type="text"
							v-maska="{
								mask: '#*:#*',
								preprocessor: (val) => useFormat.timeTrackDuration(val),
							}"
							placeholder="hours:mins"
							class="input input-bordered input-sm w-full"
							required
							v-model="t.duration"
						/>
						<span class="text-info" v-else>{{ t.duration }}<br /></span>
					</td>
					<td>
						<span>{{ t.user.data.fullName }}<br />&nbsp;</span>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="4" class="text-primary">Total</td>
					<td colspan="2" class="text-info">{{ useFormat.minutesToHM(listMinutes().value) }}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<style scoped>
	.collapse-title:after {
		top: 15px;
	}

	table tbody td {
		@apply align-top;
	}

	table tr td {
		transition: all 0.3s;
	}

	table tr.active td,
	table tr.hover.active td {
		@apply bg-accent bg-opacity-5;
	}
</style>
