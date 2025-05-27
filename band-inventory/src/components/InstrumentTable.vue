<template>
    <div class="p-4">
        <h1 class="font-bold my-8 text-xl">Instrument Listing</h1>
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Section</th>
                        <th>Serial Model</th>
                        <th>Case Number</th>
                        <th>Manufacturer</th>
                        <th>SI Tech HS ID</th>
                        <th>Assigned to</th>
                        <th>Condition</th>
                        <th>Year of Purchase</th>
                        <th>Barcode</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="instrument in instruments" :key="instrument.id" class="cursor-pointer">
                        <td>{{ instrument.category }}</td>
                        <td>{{ instrument.section }}</td>
                        <td>{{ instrument.serial_model }}</td>
                        <td>{{ instrument.manufacturer }}</td>
                        <td>{{ instrument.case_number }}</td>
                        <td>{{ instrument.siths_id }}</td>
                        <td>{{ instrument.assigned_to }}</td>
                        <td>{{ instrument.condition }}</td>
                        <td>{{ instrument.year_purchased }}</td>
                        <td>{{ instrument.barcode }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

interface Instrument {
    id: number;
    category: string;
    section: string;
    serial_model: string;
    case_number: string;
    manufacturer: string;
    siths_id: string;
    assigned_to: string;
    condition: string;
    year_purchased: number;
    barcode: string;
}

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
</script>