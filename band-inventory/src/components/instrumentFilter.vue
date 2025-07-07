<template>
   <div class="inputContainer w-12/8 items-center">
        <label for="type" class="sr-only">condition</label>
        <input
          class="input"
          placeholder="type"
          type="type"
          id="type"
          v-model="type"
        />
   
        <label for="condition" class="sr-only">condition</label>
        <input
          class="input"
          placeholder="condition"
          type="condition"
          id="condition"
          v-model="condition"
        />

        <label for="manufacturer" class="sr-only">manufacturer</label>
        <input
          class="input"
          placeholder="manufacturer"
          type="manufacturer"
          id="manufacturer"
          v-model="manufacturer"
        />

      </div>
      <button class="btn" @click="filter">filter</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useInstrumentStore } from '@/stores/instrumentStore'
import type { Ref } from 'vue'

const instrumentStore = useInstrumentStore()
const allInstruments = instrumentStore.allInstruments
const showInstruments = instrumentStore.showedInstruments

const type: Ref<string> = ref("")
const model: Ref<string> = ref("")
const serial: Ref<string> = ref("")
const owner_id: Ref<string> = ref("")
const barcode: Ref<string> = ref("")
const caseId: Ref<string> = ref("")
const location: Ref<string> = ref("")
const repair: Ref<string> = ref("")
const condition: Ref<string> = ref("")
const manufacturer: Ref<string> = ref("")
const assigned_to: Ref<string> = ref("")

async function filter(){
    const filteredInstruments = allInstruments!.filter((instrument) => 
        instrument.condition === condition.value &&
        instrument.manufacturer === manufacturer.value
    )
    console.log(filteredInstruments)
  showInstruments?.splice(0, showInstruments.length);
  filteredInstruments.forEach((instrument) => showInstruments?.push(instrument))
}



</script>

<style>

</style>