<script setup lang="ts"></script>
<template>
	<div class="grid h-screen place-items-center bg-base-300">
		<div class="card card-compact w-96 bg-base-100 shadow-xl p-10">
			<div class="logo text-center">
				<img src="@/assets/logo.png" class="w-24 h-auto mx-auto" />
				<h2 class="m-0">rachoon</h2>
			</div>
			<div class="card-body prose text-center">
				<p class="m-0 text-success">Your easy invoicing system.</p>
				<div class="divider"></div>
				<h1 class="mt-0 mb-0 text-info">Sign up</h1>

				<form v-on:submit="useSignup().signUp">
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">E-mail <span class="text-red-700">*</span></span>
						</label>
						<input
							type="email"
							pattern=".+@.+\..+"
							placeholder="you@example.com"
							required
							v-model="useSignup().user.email"
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Full name <span class="text-red-700">*</span></span>
						</label>
						<input
							type="text"
							placeholder="Your name"
							v-model="useSignup().user.data.fullName"
							required
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>

					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Password <span class="text-red-700">*</span></span>
						</label>
						<input
							type="password"
							placeholder="**********"
							required
							v-model="useSignup().user.password"
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Password repeat <span class="text-red-700">*</span></span>
						</label>
						<input
							type="password"
							placeholder="**********"
							required
							v-model="useSignup().user.passwordRepeat"
							class="input input-bordered input-sm w-full max-w-xs" />
					</div>
					<div v-if="useSignup().user.password !== '' && useSignup().user.password !== useSignup().user.passwordRepeat" class="text-error mt-2">
						Passwords don't match.
					</div>
					<div class="divider"></div>
					<div>
						<label class="label w-full max-w-xs">
							<span class="label-text">Company name <span class="text-red-700">*</span></span>
						</label>
						<input
							type="text"
							placeholder="Your company"
							required
							v-model="useSignup().organization.name"
							class="input input-bordered input-sm w-full max-w-xs" />
						<label class="label w-full max-w-xs">
							<span class="label-text">Slug</span>
						</label>
						<input
							type="text"
							placeholder="company-slug"
							v-model="useSignup().organization.slug"
							class="input input-bordered input-sm w-full max-w-xs" />
						<h3>https://{{ useSignup().slug }}.rachoon.work</h3>
					</div>
					<div class="center">
						<button class="btn btn-info mt-5" type="submit">Sign up now</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
