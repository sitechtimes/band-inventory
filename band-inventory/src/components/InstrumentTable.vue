<template>
    <div class="px-4">
        <div class="flex justify-between items-center my-8">
            <h1 class="font-bold text-2xl">Instrument Listing</h1>
            <button 
                @click="showFilterPopup = true" 
                class="btn bg-green hover:bg-emerald-700 text-white px-7 py-2 rounded-md flex items-center gap-2"
            >
                Filter
            </button>
        </div>
        <div class="overflow-x-auto">
            <table class="table text-center text-base">
                <thead>
                    <tr class="bg-sky-50">
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
                    <tr v-for="instrument in instrumentStore.showedInstruments" :key="instrument.id" class="cursor-pointer">
                        <td>{{ instrument.category }}</td>
                        <td>{{ instrument.section }}</td>
                        <td>{{ instrument.serial_model }}</td>
                        <td>{{ instrument.case_number }}</td>
                        <td>{{ instrument.manufacturer }}</td>
                        <td>{{ instrument.siths_id }}</td>
                        <td>{{ instrument.assigned_to }}</td>
                        <td>{{ instrument.condition }}</td>
                        <td>{{ instrument.year_purchased }}</td>
                        <td>{{ instrument.barcode }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showFilterPopup" class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50" @click="closePopup">
            <div class="border-2 border-gray-200 bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">Filter Instruments</h2>
                    <button @click="showFilterPopup = false" class="text-gray-600 hover:text-gray-800">
                        Close
                    </button>
                </div>
                <instrumentFilter @close="showFilterPopup = false" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useInstrumentStore } from '@/stores/instrumentStore'
import instrumentFilter from './instrumentFilter.vue'


const instrumentStore = useInstrumentStore()
const errorMessage = ref("")
const showFilterPopup = ref(false)

const closePopup = (event: Event) => {
    if (event.target === event.currentTarget) {
        showFilterPopup.value = false
    }
}

const getInstruments = async () => {
    try {
        instrumentStore.getInstruments()
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