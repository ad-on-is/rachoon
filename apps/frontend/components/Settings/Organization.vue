<template>
  <div>
    <FormSection title="Organization" description="Organization name and VAT number">
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div class="">
          <label class="label w-full max-w-xs">
            <span class="label-text">
              Organization name
              <span class="text-red-700">*</span>
            </span>
          </label>
          <input
            type="text"
            v-model="useProfile().me.organization.name"
            placeholder="Organization name"
            required
            class="input input-bordered input-sm w-full max-w-xs"
          />
          <label class="label w-full max-w-xs">
            <span class="label-text">Name addition</span>
          </label>
          <input
            type="text"
            v-model="useProfile().me.organization.data.info.addition"
            placeholder=""
            class="input input-bordered input-sm w-full max-w-xs"
          />
          <label class="label w-full max-w-xs">
            <span class="label-text">VAT-Number</span>
          </label>
          <input
            type="text"
            placeholder="VAT-Number"
            v-model="useProfile().me.organization.data.info.vat"
            class="input input-bordered input-sm w-full max-w-xs"
          />
        </div>
        <div class="">
          <img
            v-if="useProfile().me.organization.data.logo !== ''"
            :src="useProfile().me.organization.data.logo"
            class="h-16 w-auto inline-block m-0 mt-5"
          />
          <div class="form-control">
            <label class="label">
              <span class="label-text">Pick a file</span>
            </label>
            <input
              type="file"
              class="file-input file-input-bordered file-input-xs"
              accept=".jpeg,.jpg,.png,image/jpeg,image/png"
              aria-label="upload image button"
              @change="useSettings().selectFile"
            />
            <label class="label opacity-50">
              <span class="label-text-alt">image/jpeg, image/png</span>
              <span class="label-text-alt">max 15kb</span>
            </label>
          </div>
        </div>
      </div>
    </FormSection>
    <FormSection title="Address" description="Contact Information">
      <div>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div>
            <label class="label w-full max-w-xs">
              <span class="label-text">
                Street
                <span class="text-red-700">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Street"
              v-model="useProfile().me.organization.data.address.street"
              required
              class="input input-bordered input-sm w-full max-w-xs"
            />
          </div>
          <div>
            <label class="label w-full max-w-xs">
              <span class="label-text">
                ZIP
                <span class="text-red-700">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="ZIP"
              v-model="useProfile().me.organization.data.address.zip"
              required
              class="input input-bordered input-sm w-full max-w-xs"
            />
          </div>
          <div>
            <label class="label w-full max-w-xs">
              <span class="label-text">
                City
                <span class="text-red-700">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="City"
              v-model="useProfile().me.organization.data.address.city"
              required
              class="input input-bordered input-sm w-full max-w-xs"
            />
          </div>
          <div>
            <label class="label w-full max-w-xs">
              <span class="label-text">
                Country
                <span class="text-red-700">*</span>
              </span>
            </label>
            <select
              class="select select-bordered select-sm bg-base-300 w-full max-w-xs"
              v-model="useProfile().me.organization.data.address.country"
            >
              <option v-for="c in useCountries.countries" :value="c.abbreviation">
                {{ c.country }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </FormSection>
    <FormSection title="Primary Contact" description="Provide main contact person and email address.">
      <div class="grid grid-cols-2 gap-5">
        <div>
          <label class="label w-full max-w-xs">
            <span class="label-text">
              Full name
              <span class="text-red-700">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Full name"
            v-model="useProfile().me.organization.data.contactPerson.fullName"
            required
            class="input input-bordered input-sm w-full max-w-xs"
          />
        </div>
        <div>
          <label class="label w-full max-w-xs">
            <span class="label-text">
              E-mail
              <span class="text-red-700">*</span>
            </span>
          </label>
          <input
            type="email"
            pattern=".+@.+\..+"
            required
            placeholder="mail@example.com"
            v-model="useProfile().me.organization.data.contactPerson.email"
            class="input input-bordered input-sm w-full max-w-xs"
          />
        </div>
      </div>
    </FormSection>
    <FormSection title="Payment details" description="Payment details for your invoices">
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div class="">
          <label class="label w-full max-w-xs">
            <span class="label-text">Account holder</span>
          </label>
          <input
            type="text"
            v-model="useProfile().me.organization.data.payment.accountHolder"
            placeholder="Account holder"
            class="input input-bordered input-sm w-full max-w-xs"
          />
          <label class="label w-full max-w-xs">
            <span class="label-text">IBAN</span>
          </label>
          <input
            type="text"
            v-model="useProfile().me.organization.data.payment.iban"
            placeholder="XX00 0000 0000 0000 0000 00"
            class="input input-bordered input-sm w-full max-w-xs"
          />
          <label class="label w-full max-w-xs">
            <span class="label-text">SWIFT/BIC</span>
          </label>
          <input
            type="text"
            placeholder="AABBXY123"
            v-model="useProfile().me.organization.data.payment.bic"
            class="input input-bordered input-sm w-full max-w-xs"
          />
        </div>
      </div>
    </FormSection>
  </div>
</template>
