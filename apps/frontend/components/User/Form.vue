<script setup lang="ts">
	useUser().form()
	const roles = ['admin', 'user']
</script>

<template>
	<progress class="progress w-full progress-primary" v-if="useUser().loading"></progress>
	<form @submit="useUser().save" v-else>
		<div class="prose mb-5">
			<h1><FaIcon icon="fa-solid fa-user" /> {{ useUser().title }}</h1>
		</div>
		<div class="flex gap-2">
			<button class="btn btn-sm btn-primary gap-2" type="submit"><FaIcon icon="fa-solid fa-plus-circle " /> Save</button>
			<button v-if="useUser().user.id !== null" class="btn btn-sm btn-error gap-2 btn-outline">
				<FaIcon icon="fa-solid fa-close" /> Delete
			</button>
		</div>

		<div class="divider"></div>
		<div>
			<div class="grid grid-cols-2 gap-5">
				<div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Username <span class="text-red-700">*</span></span>
						</label>
						<input
							type="text"
							v-model="useUser().user.data.username"
							placeholder="username"
							required
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Full name <span class="text-red-700">*</span></span>
						</label>
						<input
							type="text"
							v-model="useUser().user.data.fullName"
							placeholder=""
							required
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">E-mail <span class="text-red-700">*</span></span>
						</label>
						<input
							type="text"
							placeholder="mail@example.com"
							v-model="useUser().user.email"
							required
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Role <span class="text-red-700">*</span></span>
						</label>
						<select class="select select-bordered select-sm" v-model="useUser().user.role" required>
							<option v-for="r in roles" :value="r">{{ r }}</option>
						</select>
					</div>
				</div>
				<div>
					<div class="prose">
						<h2>Password</h2>
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Password <span class="text-red-700">*</span></span>
						</label>
						<input
							type="password"
							placeholder="************"
							:required="useUser().user.id === null ? true : null"
							autocomplete="new-password"
							v-model="useUser().password"
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Password repeat <span class="text-red-700">*</span></span>
						</label>
						<input
							type="password"
							autocomplete="new-password"
							placeholder="************"
							:required="useUser().user.id === null ? true : null"
							class="input input-bordered input-sm w-full max-w-xs"
							v-model="useUser().passwordRepeat" />
					</div>
					<div class="alert alert-error max-w-xs mt-5" v-if="useUser().password !== useUser().passwordRepeat">Passwords don't match</div>
				</div>
			</div>
		</div>
	</form>
</template>
