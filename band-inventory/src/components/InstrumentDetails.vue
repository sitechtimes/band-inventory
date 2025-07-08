<template>
    <div v-if="instrument" class="mx-6 mt-6">
        <RouterLink to="/home" class="text-emerald-600 font-bold"> 🡨 Back to Instruments</RouterLink>
        <h1 class="text-2xl font-bold mt-4">Instrument Details</h1>
        <div class="mt-12 border border-gray-300 p-4">
            <h2 class="text-3xl">{{ instrument.category }}</h2>
            <h3 class="mt-2 italics">Details</h3>
        </div>
        <div class="border border-gray-300 p-4">
            <h4 class=" text-gray-600">Section</h4>
            <p>{{ instrument.section }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

interface Instrument {
    id: number;
    siths_id: number;
    category: string;
    section: string;
    serial_model: string;
    case_number: string;
    manufacturer: string;
    assigned_to: string;
    assign_date: Date;
    return_date: Date;
    location: string;
    year_purchased: number;
    price: number;
    condition: string;
    retired: boolean;
    barcode: number;
    notes: string;
    description: string;
    repair_needed: string;
    repair_date: Date;
    requested_by: string;
    repair_notes: string;
}
const instrument = ref<Instrument>()
const errorMessage = ref("")
const route = useRoute()

const getInstrument = async (id: number) => {
    try {
        const { data, error } = await supabase
            .from('instruments')
            .select('*')
            .eq('id', id)
            .single()
        if (error) {
            throw new Error(error.message)
        }
        instrument.value = data
    } catch (err) {
        const error = err as Error
        errorMessage.value = error.message || "Error loading instrument"
    }
}

onMounted(() => {
    const { id } = route.params as { id: number }
    getInstrument(id)
})
</script>