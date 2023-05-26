<script setup>
	const active = useRoute().fullPath
</script>

<template>
	<div>
		<div class="navbar bg-base-300 fixed z-50 shadow-lg">
			<div class="container mx-auto">
				<div class="flex-1">
					<NuxtLink href="/" class="logo">
						<img src="@/assets/logo.png" class="h-12 w-auto inline-block align-middle" />
						<h2 class="ml-2 inline-block align-middle">rachoon</h2>
					</NuxtLink>
				</div>
				<div class="flex-none">
					<ul class="menu menu-horizontal p-0 gap-2">
						<li>
							<NuxtLink href="/timetracks" class="h-8 p-5 rounded-lg" :class="useRoute().fullPath.includes('/timetrack') ? 'active' : ''"
								><FaIcon icon="fa-solid fa-clock" /> TimeTrack
							</NuxtLink>
						</li>
						<li>
							<NuxtLink href="/clients" class="h-8 p-5 rounded-lg" :class="useRoute().fullPath.includes('/clients') ? 'active' : ''"
								><FaIcon icon="fa-solid fa-users" /> Clients
							</NuxtLink>
						</li>
						<li>
							<NuxtLink href="/offers" class="h-8 p-5 rounded-lg" :class="useRoute().fullPath.includes('/offers') ? 'active' : ''">
								<FaIcon icon="fa-solid fa-file-invoice" /> Offers
							</NuxtLink>
						</li>
						<li>
							<NuxtLink href="/invoices" class="h-8 p-5 rounded-lg" :class="useRoute().fullPath.includes('/invoices') ? 'active' : ''">
								<FaIcon icon="fa-solid fa-file-invoice-dollar" /> Invoices
							</NuxtLink>
						</li>
						<li>
							<NuxtLink href="/users" class="h-8 p-5 rounded-lg" :class="useRoute().fullPath.includes('/users') ? 'active' : ''">
								<FaIcon icon="fa-solid fa-user" /> Users
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div class="dropdown dropdown-hover dropdown-end">
					<label tabindex="0" class="btn rounded-full bg-transparent hover:bg-transparent border-none">
						<div class="avatar placeholder">
							<div class="bg-success text-black rounded-full w-10">
								<img v-if="useProfile().me.data.avatar !== ''" :src="useProfile().me.data.avatar" />
								<span v-else>{{ useProfile().me.initials() }}</span>
							</div>
						</div>
						<span class="ml-3 text-success">Hi, {{ useProfile().me?.data.username }}</span>
					</label>

					<ul tabindex="0" class="dropdown-content menu menu-compact p-2 shadow bg-base-300 border-error rounded-box w-52">
						<li>
							<NuxtLink href="/profile" :class="useRoute().fullPath.includes('/profile') ? 'active' : ''"><FaIcon icon="fa-regular fa-user" /> Your profile</NuxtLink>
						</li>

						<li>
							<NuxtLink href="/settings" :class="useRoute().fullPath.includes('/settings') ? 'active' : ''"> <FaIcon icon="fa-solid fa-gears" /> Settings </NuxtLink>
						</li>
						<li>
							<NuxtLink href="/logout" class="text-error"><FaIcon icon="fa-solid fa-right-from-bracket" /> Logout</NuxtLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="container mx-auto md:pl-2 md:pr-2 pt-28 pb-20"><slot /></div>
	</div>
</template>

<style scoped>
	.menu .router-link-active,
	.menu .active {
		@apply text-primary bg-opacity-10;
	}
</style>
