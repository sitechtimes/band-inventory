<template>
  <div class="inputContainer flex flex-col">
    <div class="inputFields flex flex-wrap gap-y-3 gap-x-3 p-4">
      <filterCategories
        :title="'category'"
        :id="'category'"
        :placeholder="'Category (ex: Violin)'"
        v-model="category"
      />

      <filterCategories
        :title="'section'"
        :id="'section'"
        :placeholder="'Section (ex: Strings)'"
        v-model="section"
      />

      <filterCategories
        :title="'serial model'"
        :id="'serial_model'"
        :placeholder="'Serial model'"
        v-model="serial_model"
      />

      <filterCategories
        :title="'case number'"
        :id="'case_number'"
        :placeholder="'Case number'"
        v-model="case_number"
      />

      <filterCategories
        :title="'manufacturer'"
        :id="'manufacturer'"
        :placeholder="'Manufacturer'"
        v-model="manufacturer"
      />

      <filterCategories
        :title="'siths id'"
        :id="'siths_id'"
        :placeholder="'SITHS ID'"
        v-model="siths_id"
      />

      <filterCategories
        :title="'condition'"
        :id="'condition'"
        :placeholder="'Condition'"
        v-model="condition"
      />

      <filterCategories
        :title="'year purchased'"
        :id="'year_purchased'"
        :placeholder="'Year purchased'"
        v-model="year_purchased"
      />

      <filterCategories
        :title="'barcode'"
        :id="'barcode'"
        :placeholder="'Barcode'"
        v-model="barcode"
      />
    </div>
    <div class="p-4 flex flex-wrap gap-x-4 border-t border-gray-200 bg-gray-50">
      <button
        class="btn bg-deep-green hover:bg-emerald-900 text-white px-6 py-2 rounded-md"
        @click="filter"
      >
        Apply Filter
      </button>
      <button
        class="btn bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
        @click="reset"
      >
        Reset
      </button>
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
  close: [];
}>();

const instrumentStore = useInstrumentStore();
const { allInstruments, showedInstruments } = storeToRefs(instrumentStore);

const category: Ref<string> = ref("");
const section: Ref<string> = ref("");
const serial_model: Ref<number | undefined> = ref();
const case_number: Ref<number | undefined> = ref();
const manufacturer: Ref<string> = ref("");
const siths_id: Ref<number | undefined> = ref();
const condition: Ref<string> = ref("");
const year_purchased: Ref<number | undefined> = ref();
const barcode: Ref<number | undefined> = ref();

async function filter() {
  const filteredInstruments = allInstruments.value.filter(
    (instrument) =>
      (category.value === "" ||
        (instrument.category &&
          instrument.category
            .toLowerCase()
            .includes(category.value.toLowerCase()))) &&
      (section.value === "" ||
        (instrument.section &&
          instrument.section
            .toLowerCase()
            .includes(instrument.section.toLowerCase()))) &&
      (serial_model.value === undefined ||
        instrument.serial_model === Number(serial_model.value)) &&
      (case_number.value === undefined ||
        instrument.case_number === Number(case_number.value)) &&
      (manufacturer.value === "" ||
        (instrument.manufacturer &&
          instrument.manufacturer
            .toLowerCase()
            .includes(manufacturer.value.toLowerCase()))) &&
      (siths_id.value === undefined ||
        instrument.siths_id === Number(siths_id.value)) &&
      (condition.value === "" ||
        (instrument.condition &&
          instrument.condition
            .toLowerCase()
            .includes(condition.value.toLowerCase()))) &&
      (year_purchased.value === undefined ||
        instrument.year_purchased === Number(year_purchased.value)) &&
      (barcode.value === undefined ||
        instrument.barcode === Number(barcode.value)),
  );
  showedInstruments.value = [];
  filteredInstruments.forEach((instrument) =>
    showedInstruments.value.push(instrument),
  );
  emit("close");
}

async function reset() {
  showedInstruments.value = [];
  allInstruments.value.forEach((instrument) =>
    showedInstruments.value.push(instrument),
  );
  category.value = section.value = manufacturer.value = condition.value = "";
  serial_model.value =
    case_number.value =
    siths_id.value =
    year_purchased.value =
    barcode.value =
      undefined;
}
</script>

<style></style>
