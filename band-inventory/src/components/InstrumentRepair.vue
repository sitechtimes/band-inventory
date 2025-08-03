<template>
    <div class="mx-8 mt-8">
        <div class="p-6 flex justify-between mt-6 mr-4">
            <h2 class="text-xl font-bold">Repairs</h2>
            <button @click="addRepairs" class="btn btn-xs sm:btn-sm lg:btn-md">+ Add Repair</button>
        </div>
        <div v-if="repairs">
            <div v-for="repair in repairs" :key="repair.id">
                <p>{{ repair.id }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

interface Instrument {
    id: number;
    category: string;
    section: string;
    serial_model: number;
    case_number: string;
    manufacturer: string;
    location: string;
    barcode: number;
    notes: string;
    description: string;
}

interface Repair {
    id: number;
    repair_start: Date;
    repair_end: Date;
    repair_needed: string;
    repair_notes: string;
    requested_by: string;
};

const instrument = ref<Instrument>()
const repairs = ref<Repair>();
const errorMessage = ref("")
const route = useRoute()
const router = useRouter()
const { id } = route.params as { id: number }

// const getInstrument = async (id: number) => {
//     try {
//         const { data, error } = await supabase
//             .from('instruments')
//             .select('*')
//             .eq('id', id)
//             .single()
//         if (error) {
//             throw new Error(error.message)
//         }
//         instrument.value = data
//     } catch (err) {
//         const error = err as Error
//         errorMessage.value = error.message || "Error loading instrument"
//     }
// }
const getRepairs = async (model: number) => {
    try {
        const { data, error } = await supabase
            .from('repairs')
            .select('*')
            .eq('serial_model', model)
            .single()
        if (error) {
            throw new Error(error.message)
        }
        repairs.value = data
        console.log(repairs.value)
    } catch (err) {
        const error = err as Error
        errorMessage.value = error.message || "Error loading repairs"
    }
}
function addRepairs() {
    router.push({ path: `/instruments/${id}/management/repair` });
}
onMounted(async () => {
    // await getInstrument(id)
    // if (instrument.value?.serial_model) {
    //     await getRepairs(instrument.value.serial_model)
    // }
})
</script>

<style></style>