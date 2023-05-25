<script setup>
	import { getActivePinia } from 'pinia'
	getActivePinia()._s.forEach((s) => s.$reset())
	useAuth().init()
	const email = ref('')
	const password = ref('')
	const login = async (e) => {
		e.preventDefault()
		return await useAuth().loginEmailPassword(email.value, password.value)
	}
</script>

<template>
	<div class="grid h-screen place-items-center bg-base-300">
		<div class="card card-compact w-96 bg-base-100 shadow-xl p-10">
			<div class="logo text-center">
				<img src="@/assets/logo.png" class="w-24 h-auto mx-auto" />
				<h2 class="m-0">rachoon</h2>
			</div>
			<div v-if="useAuth().loading" class="card-body text-center"><progress class="progress progress-primary mt-10"></progress></div>
			<div v-else class="card-body prose text-center">
				<p class="m-0 text-success">Your easy invoicing system.</p>
				<!-- <div class="divider"></div>
        <button class="btn btn-primary">
          <FaIcon :icon="['fab', 'fa-google']" class="mr-2" /> Google
        </button>
        <button class="btn btn-warning">
          <FaIcon :icon="['fab', 'fa-github']" class="mr-2" /> Github
        </button> -->

				<div class="divider mb-0 mt-10">Login to</div>

				<img :src="useAuth().org.logo" v-if="useAuth().org.logo" class="h-10 w-auto mx-auto mt-0" />
				<h3 v-else class="mt-0">{{ useAuth().org.name }}</h3>

				<form v-on:submit="login">
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">E-mail <span class="text-red-700">*</span></span>
						</label>
						<input
							type="email"
							pattern=".+@.+\..+"
							placeholder="you@example.com"
							v-model="email"
							required
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>

					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Password <span class="text-red-700">*</span></span>
						</label>
						<input type="password" v-model="password" placeholder="**********" required class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div class="center">
						<button class="btn btn-accent mt-5" type="submit">Login</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
