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

const assigned_to: Ref<string> = ref("")
    
async function updateAssigned(){
    console.log('hi')
    const { error } = await supabase
        .from('instruments') 
        .update({ assigned_to: `${assigned_to.value}` }) //update needs a where clause add tmrw

  if (error) {
    console.error('Error updating record:', error.message);
  } else {
    console.log('hi');
  }
}

</script>

<style scoped>

</style>