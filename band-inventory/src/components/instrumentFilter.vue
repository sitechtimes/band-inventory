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
      </div>
      <button class="btn" @click="filter">filter</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
//import { useInstrumentStore } from '@/stores/instrumentStore'
import type { Instrument } from '@/stores/instrumentStore'
import type { Ref } from 'vue'

const instruments = ref<Instrument[]>([])
const errorMessage = ref("")

const getInstruments = async () => {
    try {
        const { data, error } = await supabase
            .from('instruments')
            .select()
        if (error) {
            throw new Error(error.message);
        }
        instruments.value = data
    }
    catch (err) {
        const error = err as Error;
        errorMessage.value = error.message || "An error occurred while fetching instruments"; 
    }
}

onMounted(() => {
    getInstruments()
})

const condition: Ref<string> = ref("")
async function filter(){
    const thing = instruments.value.filter((instrument) => instrument.condition != condition.value)
    console.log(thing)
}



</script>

<style>

</style>