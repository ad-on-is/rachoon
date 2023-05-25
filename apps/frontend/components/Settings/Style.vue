<script setup>
	import ioTemplates from '@/templates/invoiceOrOffer'
	const variables = {
		format: {
			currency: 'use format.currency(value) to format numbers to locale',
			date: 'use format.date(value) to format dates to locale',
		},
		t: 'Use t(string) to translate strings to locale',
		object: useExample().invoice,
		organization: useProfile().me.organization,
		user: useProfile().me,
	}
</script>
<template>
	<div class="prose mt-5">
		<h2>Style</h2>
	</div>
	<div class="divider opacity-50"></div>
	<div class="grid grid-cols-2 gap-5">
		<div>
			<div class="grid grid-cols-2 gap-5">
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">primary</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.primary"
							class="input input-bordered input-sm w-24" />
						<span class="border border-white border-opacity-20" :style="'background-color:' + useSettings().settings.style.colors.primary"></span>
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">secondary</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.secondary"
							class="input input-bordered input-sm w-24" />
						<span
							class="border border-white border-opacity-20"
							:style="'background-color:' + useSettings().settings.style.colors.secondary"></span>
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">body text</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.bodyText"
							class="input input-bordered input-sm w-24" />
						<span
							class="border border-white border-opacity-20"
							:style="'background-color:' + useSettings().settings.style.colors.bodyText"></span>
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">border</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.border"
							class="input input-bordered input-sm w-24" />
						<span class="border border-white border-opacity-20" :style="'background-color:' + useSettings().settings.style.colors.border"></span>
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">header background</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.headerBackground"
							class="input input-bordered input-sm w-24" />
						<span
							class="border border-white border-opacity-20"
							:style="'background-color:' + useSettings().settings.style.colors.headerBackground"></span>
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">header text</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.headerText"
							class="input input-bordered input-sm w-24" />
						<span
							class="border border-white border-opacity-20"
							:style="'background-color:' + useSettings().settings.style.colors.headerText"></span>
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">footer background</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.footerBackground"
							class="input input-bordered input-sm w-24" />
						<span
							class="border border-white border-opacity-20"
							:style="'background-color:' + useSettings().settings.style.colors.footerBackground"></span>
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">footer text</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.footerText"
							class="input input-bordered input-sm w-24" />
						<span
							class="border border-white border-opacity-20"
							:style="'background-color:' + useSettings().settings.style.colors.footerText"></span>
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">table even background</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.tableEvenBackground"
							class="input input-bordered input-sm w-24" />
						<span
							class="border border-white border-opacity-20"
							:style="'background-color:' + useSettings().settings.style.colors.tableEvenBackground"></span>
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-sm">
						<span class="w-60">table odd background</span>
						<input
							type="text"
							placeholder="#ff00ff"
							v-maska="{ mask: '!#HHHHHH', tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } } }"
							v-model="useSettings().settings.style.colors.tableOddBackground"
							class="input input-bordered input-sm w-24" />
						<span
							class="border border-white border-opacity-20"
							:style="'background-color:' + useSettings().settings.style.colors.tableOddBackground"></span>
					</label>
				</div>
			</div>
			<div class="divider"></div>
			<div class="prose">
				<h3>Custom template</h3>
				<p class="mb-3">
					You can also provide your own HTML for invoices or offers. We use
					<a href="https://mozilla.github.io/nunjucks/" target="_blank">nunjucks</a>
					to render templates. See our <strong>reference template</strong> for a practical example.
				</p>
			</div>

			<textarea
				class="textarea bg-base-300 w-full h-64"
				v-model="useSettings().settings.style.template"
				placeholder="Your HTML here ..."></textarea>
		</div>
		<div>
			<Preview example="invoice" />
		</div>
	</div>
	<div>
		<div class="collapse collapse-arrow rounded-box">
			<input type="checkbox" />
			<h3 class="collapse-title text-lg text-warning w-72">Reference template</h3>
			<div class="collapse-content">
				<div class="mockup-code">
					<pre>{{ ioTemplates.default }}</pre>
				</div>
			</div>
		</div>

		<div class="collapse collapse-arrow rounded-box">
			<input type="checkbox" />
			<h3 class="collapse-title text-lg text-warning w-72">Variables</h3>
			<div class="collapse-content">
				<div class="mockup-code">
					<pre>{{ variables }}</pre>
				</div>
			</div>
		</div>
	</div>
</template>
