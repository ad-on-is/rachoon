<script setup lang="ts">
const props = defineProps({
  index: { type: Number, required: true },
});
const document = useDocument().item;
const position = () => document.data.positions[props.index];
const taxRates = useProfile().me.organization.settings.taxes.rates;
const units = useProfile().me.organization.settings.units;

position().tax = position().tax || taxRates.filter((r) => r.default)[0].rate;
position().unit = position().unit || units.filter((u) => u.default)[0].title;
</script>

<template>
  <tr>
    <td colspan="8">
      <div class="collapse" :class="{ 'collapse-open': position().focused }">
        <table class="table overflow-x-scroll document-line">
          <tbody>
            <tr>
              <td class="handle" width="20">
                <FaIcon icon="fa-grip-vertical" class="cursor-pointer opacity-30" />
              </td>
              <td>
                <input
                  type="text"
                  :disabled="document.disabled()"
                  placeholder="Add a short summary ..."
                  v-model="position().title"
                  @focus="document.focusPosition(index)"
                  class="input input-bordered input-sm w-full"
                />
              </td>
              <td width="200">
                <div class="input-group" v-if="document.type !== 'reminder'">
                  <input
                    :disabled="document.disabled()"
                    type="text"
                    placeholder="0"
                    v-maska="'#*.#*'"
                    v-model="position().quantity"
                    class="input input-bordered input-sm w-full"
                  />
                  <select class="select select-bordered select-sm bg-base-300" v-model="position().unit" :disabled="document.disabled()">
                    <option v-for="u in units" :value="u.title" :key="u.title">
                      {{ u.title }}
                    </option>
                  </select>
                </div>
              </td>
              <td width="150">
                <label class="input-group">
                  <input
                    type="text"
                    placeholder="0"
                    v-model.number="position().price"
                    v-maska="'#*.##'"
                    class="input input-bordered input-sm w-full"
                    :disabled="document.disabled()"
                  />
                  <span>€</span>
                </label>
              </td>
              <td width="120">
                <label class="input-group" v-if="document.type !== 'reminder'">
                  <select class="select select-bordered select-sm" v-model="position().tax" :disabled="document.disabled()">
                    <option v-for="r in taxRates" :value="r.rate" :key="r.rate">{{ r.rate }}</option>
                  </select>
                  <span>%</span>
                </label>
              </td>
              <td width="110">
                <label class="input-group" v-if="document.type !== 'reminder'">
                  <input
                    type="text"
                    placeholder="0"
                    class="input input-bordered input-sm w-full"
                    v-model.number="position().discount"
                    v-maska="{ mask: '#*.##', preprocessor: (val) => useFormat.max100(val) }"
                    :disabled="document.disabled()"
                  />
                  <span>%</span>
                </label>
              </td>
              <td width="200" class="text-right">
                <strong>{{ useFormat.toCurrency(position().net) }}</strong>
                <!--   <Popper arrow hover> -->
                <!--     <span class="text-info">{{ useFormat.toCurrency(position.net) }}</span> -->
                <!--     <template #content> -->
                <!--       <div class="text-xs"> -->
                <!--         {{ useFormat.toCurrency(position.netNoDiscount) }} -->
                <!--         <br /> -->
                <!--         {{ position.net - position.netNoDiscount === 0 ? "" : useFormat.toCurrency(position.net - position.netNoDiscount) }} -->
                <!--         <br /> -->
                <!--         ----------- -->
                <!--         <br /> -->
                <!--         {{ useFormat.toCurrency(position.net) }} -->
                <!--         <br /> -->
                <!--         tax: {{ useFormat.toCurrency(position.total - position.net) }} -->
                <!--         <br /> -->
                <!--         ----------- -->
                <!--         <br /> -->
                <!--         {{ useFormat.toCurrency(position.total) }} -->
                <!--         <br /> -->
                <!--       </div> -->
                <!--     </template> -->
                <!--   </Popper> -->
                <!-- </td> -->
              </td>

              <td width="50">
                <label
                  class="btn btn-circle btn-xs mr-2 text-error"
                  :class="document.disabled() ? 'btn-disabled' : ''"
                  @click="document.removePosition(index)"
                >
                  <FaIcon icon="fa-xmark" />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="collapse-content p-0 mx-10">
          <Editor v-model="position().text" placeholder="Add a description ..." />
        </div>
      </div>
    </td>
  </tr>
</template>
