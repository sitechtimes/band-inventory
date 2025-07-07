<template>
    <div v-if="instrument" class="text-center mt-6">
        <h1 class="font-bold">{{ instrument.category }}</h1>
        <h2>{{ instrument.assigned_to }}</h2>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '/src/lib/supabaseClient'

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

const instrument = ref<Instrument[]>([])
const errorMessage = ref("")
const route = useRoute()

const getInstrument = async (id: string) => {
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
    const id = route.params.id as string
    getInstrument(id)
})
</script>