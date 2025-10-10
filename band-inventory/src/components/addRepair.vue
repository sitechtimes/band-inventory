<template>
    <div class="mx-8 mt-8">
        <div class="p-6 mt-6 mr-4">
            <h2 class="text-2xl font-bold">Repairs</h2>
            <form @submit.prevent="addRepair" class="mt-16 grid grid-cols-2 gap-22 w-1/2">
                <label class="input">
                    <span class="label">Repair date</span>
                    <input type="date" v-model="repairData.repair_date" required />
                </label>
                <label class="input">
                    <span class="label">Repair needed</span>
                    <input type="text" v-model="repairData.repair_needed" placeholder="What type of repair?" required />
                </label>
                <label class="input">
                    <span class="label">Requested by</span>
                    <input type="text" v-model="repairData.requested_by" placeholder="Who requested the repair?" required />
                </label>
                <label class="input">
                    <span class="label">Repair notes</span>
                    <input type="text" v-model="repairData.repair_notes" placeholder="Description" />
                </label>
                <label class="input">
                    <span class="label">Completion Status</span>
                    <select v-model="repairData.completed" required class="w-full p-2 border border-gray-300 rounded">
                        <option :value="false">Not Completed</option>
                        <option :value="true">Completed</option>
                    </select>
                </label>
            </form>
            <div class="w-1/2">
                <button @click="addRepair" class="btn btn-outline bg-emerald-400 w-1/5 mt-20">Add Repair</button>
                <a @click="$router.back()" class="self-end inline-block align-bottom ml-20 hover:underline hover:cursor-pointer"> Go back? </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useDetailStore } from '@/stores/detailStore'

const props = defineProps<{
    instrumentId: string | number
}>()

const detailStore = useDetailStore()

const repairData = reactive({
    repair_date: '',
    repair_needed: '',
    requested_by: '',
    repair_notes: '',
    instrument_id: 0,
    completed: false
})

const addRepair = async () => {
    try {
        repairData.instrument_id = typeof props.instrumentId === 'string' 
            ? parseInt(props.instrumentId) 
            : props.instrumentId
        
        await detailStore.addRepair(repairData)
        
        repairData.repair_date = ''
        repairData.repair_needed = ''
        repairData.requested_by = ''
        repairData.repair_notes = ''
        repairData.completed = false
        
        window.history.back()
    } catch (error) {
        console.error('Error adding repair:', error)
        alert('Failed to add repair. Please try again.')
    }
}
</script>

<style></style>
