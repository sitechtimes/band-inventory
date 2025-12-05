<template>
  <div class="inputContainer flex flex-col">
    <div class="inputFields flex flex-wrap gap-y-3 gap-x-3 p-4">
       <filterCategories
        :title="'category'"
        :id="'category'"
        :placeholder="'category (ex: Violin)'"
        v-model="category"
      />

      <filterCategories
        :title="'section'"
        :id="'section'"
        :placeholder="'section (ex: Strings)'"
        v-model="section"
      />

      <filterCategories
        :title="'serial model'"
        :id="'serial_model'"
        :placeholder="'serial model'"
        v-model="serial_model"
      />

      <filterCategories
        :title="'case number'"
        :id="'case_number'"
        :placeholder="'case number'"
        v-model="case_number"
      />

      <filterCategories
        :title="'manufacturer'"
        :id="'manufacturer'"
        :placeholder="'manufacturer'"
        v-model="manufacturer"
      />

      <filterCategories
        :title="'siths id'"
        :id="'siths_id'"
        :placeholder="'siths id'"
        v-model="siths_id"
      />

      <filterCategories
        :title="'assigned to'"
        :id="'assigned_to'"
        :placeholder="'assigned to'"
        v-model="assigned_to"
      />

      <filterCategories
        :title="'condition'"
        :id="'condition'"
        :placeholder="'condition'"
        v-model="condition"
      />

      <filterCategories
        :title="'year purchased'"
        :id="'year_purchased'"
        :placeholder="'year purchased'"
        v-model="year_purchased"
      />

      <filterCategories
        :title="'barcode'"
        :id="'barcode'"
        :placeholder="'barcode'"
        v-model="barcode"
      />
    </div>
    <div class="p-4 flex flex-wrap gap-x-4 border-t border-gray-200 bg-gray-50">
      <button class="btn bg-deep-green hover:bg-emerald-900 text-white px-6 py-2 rounded-md" @click="filter">Apply Filter</button>
      <button class="btn bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useInstrumentStore } from "@/stores/instrumentStore";
import filterCategories from "./filterCategories.vue";
import type { Ref } from "vue";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
  close: []
}>()

const instrumentStore = useInstrumentStore()
const { allInstruments, showedInstruments } = storeToRefs(instrumentStore)

const category: Ref<string> = ref("");
const section: Ref<string> = ref("");
const serial_model: Ref<number | undefined> = ref();
const case_number: Ref<number | undefined> = ref();
const manufacturer: Ref<string> = ref("");
const siths_id: Ref<number | undefined> = ref();
const assigned_to: Ref<string> = ref("");
const condition: Ref<string> = ref("");
const year_purchased: Ref<number | undefined> = ref();
const barcode: Ref<number | undefined> = ref();

async function filter() {
  const filteredInstruments = allInstruments.value.filter(
    (instrument) =>
      instrument.category ===
        category.value.charAt(0).toUpperCase() + category.value.slice(1) ||
      instrument.section ===
        section.value.charAt(0).toUpperCase() + section.value.slice(1) ||
      instrument.serial_model === Number(serial_model.value) ||
      instrument.case_number === Number(case_number.value) ||
      instrument.manufacturer ===
        manufacturer.value.charAt(0).toUpperCase() +
          manufacturer.value.slice(1) ||
      instrument.siths_id === Number(siths_id.value) ||
      (instrument.assigned_to && instrument.assigned_to.toLowerCase() == assigned_to.value.toLowerCase()) ||
      instrument.condition ===
        condition.value.charAt(0).toUpperCase() + condition.value.slice(1) ||
      instrument.year_purchased == Number(year_purchased.value) ||
      instrument.barcode == Number(barcode.value),
  );
  showedInstruments.value = [];
  if (assigned_to.value != "") {
    allInstruments.value.forEach((instrument) => {
      if (instrument.assigned_to && instrument.assigned_to.includes(assigned_to.value)) {
        showedInstruments.value.push(instrument);
      }
  })
    }
  filteredInstruments.forEach((instrument) => showedInstruments.value.push(instrument))
  emit('close')
}

async function reset() {
  showedInstruments.value = [];
  allInstruments.value.forEach((instrument) =>
    showedInstruments.value.push(instrument),
  );
  category.value =
    section.value =
    manufacturer.value =
    assigned_to.value =
    condition.value =
      "";
  serial_model.value =
    case_number.value =
    siths_id.value =
    year_purchased.value =
    barcode.value =
      undefined;
}
</script>

<style></style>
