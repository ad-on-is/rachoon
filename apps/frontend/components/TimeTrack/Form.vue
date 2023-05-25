<script setup lang="ts">
	import * as dateFns from 'date-fns'
	const monthDate = ref(useTimeTrack().monthDate)
	function save(e: Event) {
		e.preventDefault()
		useTimeTrack().save()
	}
	const day = useTimeTrack().day
	const days = computed(() => dateFns.getDaysInMonth(monthDate.value))
	const dayClass = (d: number) => (day === d ? 'bg-success bg-opacity-50 text-white' : 'bg-base-200 text-white text-opacity-30')
	const hasEntriesClass = (d: number) => (dayMinutes(d) > 0 ? 'bg-warning bg-opacity-30' : 'bg-secondary bg-opacity-10')
	const dayMinutes = (d: number) =>
		useTimeTrack()
			.timeTracks.filter((t) => t.day === d)
			.reduce((a, b) => a + b.data.minutes, 0)

	const weekDay = (d: number) => dateFns.format(dateFns.setDate(monthDate.value, d), 'EEE')

	const todayClass = (d: number) => (dateFns.isToday(dateFns.setDate(monthDate.value, d)) ? 'bg-error bg-opacity-20' : '')
</script>

<template>
	<div class="flex flex-wrap gap-1 mb-10">
		<div v-for="d of days" class="text-xs cursor-pointer !border-none" :class="weekDay(d) === 'Sun' ? 'mr-3' : ''" @click="useTimeTrack().setDay(d)">
			<Popper arrow hover>
				<div :class="todayClass(d)">
					<div class="text-center text-xs" :class="`${dayClass(d)}`">{{ weekDay(d).slice(0, -2) }}</div>
					<div class="w-8 py-2 text-center" :class="`${hasEntriesClass(d)}`">{{ d }}</div>
				</div>
				<template #content>
					<div class="text-xs">{{ useFormat.minutesToHM(dayMinutes(d)) }}</div>
				</template>
			</Popper>
		</div>
	</div>
	<div v-if="useTimeTrack().projects.length === 0" class="alert alert-warning">You have no projects assigned yet. Please ask the admin to assign you to a project.</div>
	<form v-else @submit="save">
		<table class="table w-full table-compact table-info-body">
			<tbody>
				<tr>
					<td width="250">
						<ProjectAutoComplete
							required
							:items="useTimeTrack().projects"
							:selectItem="
								(i) => {
									useTimeTrack().setProject(i)
								}
							"
						/>
					</td>
					<td>
						<input type="text" required placeholder="Add a short summary ..." class="input input-bordered input-sm w-full" v-model="useTimeTrack().timeTrack.data.title" />
					</td>
					<td width="200" class="text-right">
						<input
							type="text"
							v-maska="{
								mask: '#*:##',
								preprocessor: (val) => useFormat.timeTrackDuration(val),
							}"
							placeholder="00:00"
							class="input input-bordered input-sm w-full"
							required
							v-model="useTimeTrack().timeTrack.duration"
						/>
					</td>
					<td width="100" class="text-right">
						<button type="submit" class="btn btn-sm btn-info">Save</button>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<div class="collapse collapse-arrow rounded-box">
							<input type="checkbox" class="mt-0 pt-0" />
							<h3 class="collapse-title text-lg text-warning w-60 p-0">Detailed description</h3>
							<div class="collapse-content p-0">
								<Editor v-model="useTimeTrack().timeTrack.data.description" />
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</template>

<style scoped>
	.collapse-title:after {
		top: 15px;
	}

	.collapse-title,
	:where(.collapse > input[type='checkbox']) {
		min-height: 2rem;
	}
</style>
