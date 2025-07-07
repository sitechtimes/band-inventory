<template>
   <div class="inputContainer w-12/8 items-center">
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

        <!-- <label for="manufacturer" class="sr-only">manufacturer</label>
        <input
          class="input"
          placeholder="manufacturer"
          type="manufacturer"
          id="manufacturer"
          v-model="manufacturer"
        /> -->
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

const condition: Ref<string> = ref("")
const manufacturer: Ref<string> = ref("")

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