<template>
    <div v-if="instrument" class="mx-6 mt-6 flex flex-col items-center">
        <h1 class="font-bold text-2xl">Update Inventory Item Location</h1>
        <h2 class="mt-6 text-lg">Current location is: {{ instrument.location }}</h2>
        <div class="flex mt-12 items-center">
            <h3>Location:</h3>
            <select v-model="updatedLocation" class="select ml-8 w-60">
                <option disabled value="">Select a new location here</option>
                <option>Orchestra Room</option>
                <option>Auditorium</option>
                <option>Storage</option>
                <option>Other place</option>
                <option>(˶ᵔ ᵕ ᵔ˶)</option>
            </select>
        </div>
        <div class="mt-12"> 
            <button @click="updateLocation(instrument.id, updatedLocation)" class="btn btn-accent bg-emerald-500">Update location</button>
            <a @click="$router.back()" class="hover:underline ml-6 hover:cursor-pointer"> Go back? </a>
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
const updatedLocation = ref<string>("")

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
async function updateLocation(id: number, newLocation: string) {
    try {
        const { data, error } = await supabase
            .from('instruments')
            .update({ location: newLocation })
            .eq('id', id)
        if (error) {
            throw new Error(error.message)
        }
        await getInstrument(id)

    } catch (err) {
        const error = err as Error
        errorMessage.value = error.message || "Error updating location"
    }
}
onMounted(() => {
    const { id } = route.params as { id: number }
    getInstrument(id)
})
</script>