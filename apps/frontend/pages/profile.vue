<script lang="ts" setup>
	definePageMeta({
		layout: 'core',
	})
	const profile = useProfile().me
	function save() {}
</script>
<template>
	<div>
		<div class="grid grid-cols-2 gap-5">
			<div>
				<form @submit="useProfile().save">
					<div class="prose">
						<h2>Hi, {{ profile.data.fullName }}</h2>
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Username <span class="text-red-700">*</span></span>
						</label>
						<input
							type="text"
							v-model="profile.data.username"
							placeholder="username"
							required
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Full name <span class="text-red-700">*</span></span>
						</label>
						<input type="text" v-model="profile.data.fullName" placeholder="" required class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">E-mail <span class="text-red-700">*</span></span>
						</label>
						<input
							type="text"
							placeholder="mail@example.com"
							v-model="profile.email"
							required
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<button type="submit" class="btn btn-sm btn-primary gap-2 mt-5" @click="save"><FaIcon icon="fa-solid fa-user " /> Save</button>
				</form>
				<form @submit="useProfile().savePassword" class="mt-10">
					<div class="prose">
						<h2>Set password</h2>
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Password <span class="text-red-700">*</span></span>
						</label>
						<input
							type="password"
							placeholder="************"
							required
							autocomplete="new-password"
							v-model="useProfile().newPassword"
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
							required
							class="input input-bordered input-sm w-full max-w-xs"
							v-model="useProfile().newPasswordRepeat" />
					</div>
					<div class="alert alert-error max-w-xs mt-5" v-if="useProfile().newPassword !== useProfile().newPasswordRepeat">
						Passwords don't match
					</div>
					<button type="submit" class="btn btn-warning btn-sm mt-5 gap-2"><FaIcon icon="fa-solid fa-key " /> Save new password</button>
				</form>
			</div>
			<div>
				<div class="bg-base-200 bg-opacity-70 p-10 rounded-xl">
					<div class="prose max-w-full p-0 m-0 mb-5 text-center">
						<h3>Upload your avatar</h3>
						<p>Add an avatar</p>
						<img v-if="useProfile().me.data.avatar !== ''" :src="useProfile().me.data.avatar" class="h-32 w-auto inline-block" />
						<div class="form-control">
							<label class="label">
								<span class="label-text">Pick a file</span>
							</label>
							<input
								type="file"
								class="file-input file-input-bordered"
								accept=".jpeg,.jpg,.png,image/jpeg,image/png"
								aria-label="upload image button"
								@change="useProfile().selectFile" />
							<label class="label">
								<span class="label-text-alt">image/jpeg, image/png</span>
								<span class="label-text-alt">max 5kb</span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
