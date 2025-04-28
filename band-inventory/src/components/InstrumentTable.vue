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
                <tr v-for="instrument in instruments" :key="instrument.id">
                    <td>{{ instrument.category }}</td>
                    <td>{{ instrument.section }}</td>
                    <td>{{ instrument.serial_model }}</td>
                    <td>{{ instrument.case_number }}</td>
                    <td>{{ instrument.manufacturer }}</td>
                    <td>{{ instrument.sitech_hs_id }}</td>
                    <td>{{ instrument.assigned_to }}</td>
                    <td>{{ instrument.condition }}</td>
                    <td>{{ instrument.year_of_purchase }}</td>
                    <td>{{ instrument.barcode }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const instruments = ref([])

async function getInstruments() {
    const { data } = await supabase.from('instruments').select()
    instruments.value = data
}

onMounted(() => {
    getInstruments()
})
</script>