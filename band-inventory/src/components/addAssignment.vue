<template>
    <div class="bg-blue-600 gap-x-4">
        <div class="flex flex-col">
            <label>Assign to</label>
            <input type="text" placeholder="Type here" class="input" v-model="assigned_to"/>
        </div>
        <div class="flex flex-col">
            <label>Return Date (optional)</label>
            <input type="date" class="input" />
        </div>
        <div>
            <button class="btn" @click="updateAssigned">Default</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient';
import { useInstrumentStore } from '@/stores/instrumentStore';

const assigned_to: Ref<string> = ref("")

const instrumentStore = useInstrumentStore()
    
async function updateAssigned(){
    try {
       await instrumentStore.add('maamamam')

    } catch (error) {
        alert(error)
    }
}

</script>

<style scoped>

</style>