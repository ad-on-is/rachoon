<script setup lang="ts">
	import * as dateFns from 'date-fns'
	import _ from 'lodash'
	useTimeTrack().init()
	const monthDate = computed(() => useTimeTrack().monthDate)
	const listDate = computed(() => useTimeTrack().listDate)
	const view = computed(() => useTimeTrack().view)
	const clientId = ref('')
	const userId = ref('')
	const projectId = ref('')
	const timeTracks = computed(() => {
		let ts = view.value === 'month' ? useTimeTrack().timeTracks.filter((t) => t.day === useTimeTrack().day) : useTimeTrack().timeTracks
		if (clientId.value !== '') {
			ts = ts.filter((t) => t.project.client.id === clientId.value)
		}
		if (projectId.value !== '') {
			ts = ts.filter((t) => t.project.id === projectId.value)
		}
		if (userId.value !== '') {
			ts = ts.filter((t) => t.user.id === userId.value)
		}
		return ts
	})
	watch(
		computed(() => useTimeTrack().timeTrack.duration),
		() => {
			useTimeTrack().timeTrack.recalc()
		}
	)

	const clients = () =>
		computed(() =>
			_.uniqBy(
				useTimeTrack().timeTracks.map((t) => t.project.client),
				'id'
			)
		)

	const users = () =>
		computed(() =>
			_.uniqBy(
				useTimeTrack().timeTracks.map((t) => t.user),
				'id'
			)
		)

	const projects = () =>
		computed(() =>
			_.uniqBy(
				useTimeTrack().timeTracks.map((t) => t.project),
				'id'
			)
		)

	const previouseMonth = () => (useTimeTrack().monthDate = dateFns.setDate(dateFns.subMonths(useTimeTrack().monthDate, 1), 1))
	const nextMonth = () => (useTimeTrack().monthDate = dateFns.setDate(dateFns.addMonths(useTimeTrack().monthDate, 1), 1))

	const dayMinutes = (d: number) => timeTracks.value.filter((t) => t.day === d).reduce((a, b) => a + b.data.minutes, 0)

	const dayNet = (d: number) => timeTracks.value.reduce((a, b) => a + b.project.data.rate * (b.data.minutes / 60), 0)

	const listMinutes = () => computed(() => timeTracks.value.reduce((a, b) => a + b.data.minutes, 0))
	const listNet = () => computed(() => timeTracks.value.reduce((a, b) => a + b.project.data.rate * (b.data.minutes / 60), 0))
</script>

<template>
	<progress class="progress w-full progress-primary" v-if="useTimeTrack().loading"></progress>
	<div v-else>
		<div class="prose mb-0 flex justify-between">
			<div class="flex w-1/3">
				<h2 class="mt-1 mr-5 mb-3 flex gap-7">
					<button class="btn btn-xs mt-1 text-info cursor-pointer" @click="previouseMonth" :disabled="view === 'list'"><FaIcon icon="fa-chevron-left" /></button>
					<span>
						<DatePicker v-if="view === 'month'" v-model="useTimeTrack().monthDate" iconOnly class="!w-3 mr-2" />
						<DatePicker v-else v-model="useTimeTrack().listDate" range iconOnly class="!w-3 mr-2" />
					</span>
					<button class="btn btn-xs mt-1 text-info cursor-pointer" @click="nextMonth" :disabled="view === 'list'"><FaIcon icon="fa-chevron-right" /></button>
				</h2>
				<h2 v-if="view === 'month'" class="!text-info mb-3 mt-1">{{ dateFns.format(monthDate, 'EEE') }}, {{ dateFns.format(monthDate, 'PPP') }}</h2>
				<h2 v-else class="!text-info mb-3 mt-1">{{ dateFns.format(listDate[0], 'PP') }} - {{ dateFns.format(useTimeTrack().listDate[1], 'PP') }}</h2>
			</div>
			<div class="flex gap-2">
				<div>
					<select class="select select-bordered select-sm bg-base-300" v-model="clientId">
						<option value="">All clients</option>
						<option v-for="c in clients().value" :value="c.id" :key="c.id">
							{{ c.name }}
						</option>
					</select>
				</div>
				<div>
					<select class="select select-bordered select-sm bg-base-300" v-model="projectId">
						<option value="">All projects</option>
						<option v-for="p in projects().value" :value="p.id" :key="p.id">
							{{ p.data.title }}
						</option>
					</select>
				</div>
				<div>
					<select class="select select-bordered select-sm bg-base-300" v-model="userId">
						<option value="">All users</option>
						<option v-for="u in users().value" :value="u.id" :key="u.id">
							{{ u.data.fullName }}
						</option>
					</select>
				</div>
			</div>
			<div class="gap-2 flex mt-1">
				<button class="btn btn-xs" :class="view === 'month' ? 'btn-secondary' : 'btn-outline'" @click="useTimeTrack().view = 'month'">Month</button>
				<button class="btn btn-xs" :class="view === 'list' ? 'btn-secondary' : 'btn-outline'" @click="useTimeTrack().view = 'list'">List</button>
			</div>
			<div class="mt-1">
				<button class="btn btn-xs btn-primary btn-outline gap-1 no-underline" @click="useTimeTrack().download(timeTracks)"><FaIcon icon="fa-file-export" /> Export</button>
			</div>
		</div>
		<TimeTrackForm v-if="view === 'month'" />
		<div class="divider mt-0"></div>
		<div class="text-center mt-20" v-if="timeTracks.length === 0">
			<div class="prose">
				<FaIcon icon="fa-clock" class="text-5xl text-accent" />
				<h1 class="!text-accent mt-5">No timetracks</h1>
				<p>It appears you have <strong class="text-accent">no timetracks</strong> for this day. Go ahead and create one.</p>
			</div>
		</div>
		<table v-else class="table table-zebra table-compact w-full table-primary">
			<thead>
				<tr>
					<th width="200">Project</th>
					<th>Summary</th>
					<th width="150">Date</th>
					<th width="120">Duration</th>
					<th width="200">User</th>
					<th width="100" class="text-right">Net</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="6" class="p-0">
						<form
							v-for="(t, i) in timeTracks"
							@submit="
								(e) => {
									e.preventDefault()
									useTimeTrack().update(t)
								}
							"
						>
							<table class="table w-full table-compact table-zebra">
								<tbody>
									<tr class="hover" :class="t.focused ? 'active' : ''" @click="useTimeTrack().focus(t.id)">
										<td width="200">
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
										<td width="150">
											<DatePicker v-model="t.date" v-if="t.focused" /><span v-else>{{ useFormat.date(t.date) }}<br />&nbsp;</span>
										</td>
										<td width="120">
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
											<span class="text-info" v-else>{{ useFormat.durationToHM(t.duration) }}<br /></span>
										</td>
										<td width="200">
											<span>{{ t.user.data.fullName }}<br />&nbsp;</span>
										</td>
										<td width="100" class="text-right text-success">
											<button type="submit" class="btn btn-sm btn-primary" v-if="t.focused">Save</button
											><span v-else
												>{{ useFormat.toCurrency(t.net()) }}<br />&nbsp;<span class="text-xs opacity-50" v-if="t.project.data.discount > 0"
													>{{ t.project.data.discount }}% discount</span
												></span
											>
										</td>
									</tr>
								</tbody>
							</table>
						</form>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3" class="text-primary">Total</td>
					<td class="text-info">{{ useFormat.minutesToHM(view === 'month' ? dayMinutes(useTimeTrack().day) : listMinutes().value) }}</td>
					<td></td>
					<td class="text-success text-right">{{ useFormat.toCurrency(view === 'month' ? dayNet(useTimeTrack().day) : listNet().value) }}</td>
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
