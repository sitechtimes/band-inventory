<template>
    <div v-if="instrument" class="mx-6 mt-6">
        <RouterLink to="/home" class="text-emerald-600 font-bold"> 🡨 Back to Instruments</RouterLink>
        <h1 class="text-2xl font-bold mt-4">Instrument Details</h1>
        <div class="mt-12 border border-gray-300 p-4">
            <h2 class="text-3xl">{{ instrument.category }}</h2>
            <h3 class="mt-2 italic">Details</h3>
        </div>
        <div class="flex">
            <div class="border border-gray-300 p-4 grid grid-cols-2 gap-6 w-1/3">
                <div>
                    <h4 class="font-bold text-gray-400">Section</h4>
                    <p>{{ instrument.section }}</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-400">Manufacturer</h4>
                    <p>{{ instrument.manufacturer }}</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-400">Location</h4>
                    <p>{{ instrument.location }}</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-400">Notes</h4>
                    <p>{{ instrument.notes }}</p>
                </div>
            </div>
            <div class="border border-gray-300 p-4 grid grid-cols-2 gap-6 w-1/3">
                <div>
                    <h4 class="font-bold text-gray-400">Serial Model</h4>
                    <p>{{ instrument.serial_model }}</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-400">Case Number</h4>
                    <p>{{ instrument.case_number }}</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-400">Barcode</h4>
                    <p>{{ instrument.barcode }}</p>
                </div>
            </div>
            <div class="border border-gray-300 p-4 grid grid-cols-2 gap-6 w-1/3">
                <div>
                    <h4 class="font-bold text-gray-400">Year Purchased</h4>
                    <p>{{ instrument.year_purchased }}</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-400">Price</h4>
                    <p>{{ instrument.price }}</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-400">Condition</h4>
                    <p>{{ instrument.condition }}</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-400">Retired</h4>
                    <p>{{ instrument.retired }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

interface Instrument extends RepairInfo, AssignmentInfo, PurchaseInfo {
    id: number;
    category: string;
    section: string;
    serial_model: string;
    case_number: string;
    manufacturer: string;
    location: string;
    barcode: number;
    notes: string;
    description: string;
}

type RepairInfo = {
    repair_needed: string;
    repair_date: Date;
    repair_notes: string;
    requested_by: string;
};

type AssignmentInfo = {
    siths_id: number;
    assigned_to: string;
    assign_date: Date;
    return_date: Date;
};

type PurchaseInfo = {
    year_purchased: number;
    price: number;
    condition: string;
    retired: boolean;
};

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