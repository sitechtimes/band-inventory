<template>
  <div class="inputContainer flex flex-col bg-deep-blue rounded-lg m-2 border-1">
   <div class="inputFields flex flex-wrap gap-y-1.5 gap-x-1.5 bg-light-blue rounded-lg p-2 md:pb-8 border-1">
        <label for="category" class="sr-only">category</label>
        <input
          class="input md:w-1/5"
          placeholder="category (ex: Violin)"
          type="category"
          id="category"
          v-model="category"
        />
   
        <label for="section" class="sr-only">section</label>
        <input
          class="input md:w-1/5"
          placeholder="section (ex: Strings)"
          type="section"
          id="section"
          v-model="section"
        />


        <label for="serial_model" class="sr-only">serial model</label>
        <input
          class="input md:w-1/5"
          placeholder="serial model"
          type="serial_model"
          id="serial_model"
          v-model="serial_model"
        />

        <label for="case_number" class="sr-only">case number</label>
        <input
          class="input md:w-1/5"
          placeholder="case number"
          type="case_number"
          id="case_number"
          v-model="case_number"
        />

        <label for="manufacturer" class="sr-only">manufacturer</label>
        <input
          class="input md:w-1/5"
          placeholder="manufacturer"
          type="manufacturer"
          id="manufacturer"
          v-model="manufacturer"
        />

        <label for="siths_id" class="sr-only">siths id</label>
        <input
          class="input md:w-1/5"
          placeholder="siths id"
          type="siths_id"
          id="siths_id"
          v-model="siths_id"
        />

        <label for="assigned_to" class="sr-only">assigned to</label>
        <input
          class="input md:w-1/5"
          placeholder="assigned to"
          type="assigned_to"
          id="assigned_to"
          v-model="assigned_to"
        />

        <label for="condition" class="sr-only">condition</label>
        <input
          class="input md:w-1/5"
          placeholder="condition"
          type="condition"
          id="condition"
          v-model="condition"
        />

        <label for="year_purchased" class="sr-only">year purchased</label>
        <input
          class="input md:w-1/5"
          placeholder="year purchased"
          type="year_purchased"
          id="year_purchased"
          v-model="year_purchased"
        />

        <label for="barcode" class="sr-only">barcode</label>
        <input
          class="input md:w-1/5"
          placeholder="barcode"
          type="barcode"
          id="barcode"
          v-model="barcode"
        />

    </div>
    <div class="p-2 flex flex-wrap gap-x-2">
    <button class="btn shadow-none" @click="filter">filter</button>
    <button class="btn shadow-none" @click="reset">reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useInstrumentStore } from '@/stores/instrumentStore'
import type { Ref } from 'vue'

const instrumentStore = useInstrumentStore()
const allInstruments = instrumentStore.allInstruments
const showInstruments = instrumentStore.showedInstruments

const category: Ref<string> = ref("")
const section: Ref<string> = ref("")
const serial_model: Ref<number | undefined> = ref()
const case_number: Ref<number | undefined> = ref()
const manufacturer: Ref<string> = ref("")
const siths_id: Ref<number | undefined> = ref()
const assigned_to: Ref<string> = ref("")
const condition: Ref<string> = ref("")
const year_purchased: Ref<number | undefined> = ref()
const barcode: Ref<number | undefined> = ref()


async function filter(){
    const filteredInstruments = allInstruments.filter((instrument) => 
        instrument.category === category.value ||
        instrument.section === section.value ||
        instrument.serial_model == serial_model.value ||
        instrument.case_number === case_number.value ||
        instrument.manufacturer === manufacturer.value ||
        instrument.siths_id == siths_id.value ||
        instrument.assigned_to === assigned_to.value ||
        instrument.condition === condition.value ||
        instrument.year_purchased == year_purchased.value ||
        instrument.barcode == barcode.value
    )
    console.log(filteredInstruments)
  showInstruments?.splice(0, showInstruments.length);
  filteredInstruments.forEach((instrument) => showInstruments?.push(instrument))
}

async function reset() {
  showInstruments?.splice(0, showInstruments.length);
  allInstruments.forEach((instrument) => showInstruments.push(instrument))
  category.value = section.value = manufacturer.value = assigned_to.value = condition.value = ""
  serial_model.value = case_number.value = siths_id.value = year_purchased.value = barcode.value = undefined
}


</script>

<style>

</style>