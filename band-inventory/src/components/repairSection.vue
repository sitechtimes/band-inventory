<template>
    <div class="mx-8 mt-8">
        <div class="p-6 mt-6 mr-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Repair History</h2>
                <RouterLink :to="`/instruments/${instrumentId}/management/repair`"
                    class="btn btn-md bg-deep-green text-white">
                    + Add a repair
                </RouterLink>
            </div>
            <div v-if="detailStore.repairs.length === 0"
                class="bg-sky-50 border-1 rounded-sm border-gray p-8 text-center space-y-2">
                <p>No current repairs on this instrument</p>
                <p class="font-semibold">Instruments in poor quality will need to have their repairs tracked.</p>
            </div>
            <div v-else class="space-y-4">
                <div v-for="repair in recentRepairs" :key="repair.id"
                    class="border border-gray-300 p-4 rounded-lg">
                    <div class="flex justify-between items-start mb-3">
                        <span
                            :class="repair.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                            class="px-2 py-1 rounded-full text-xs font-medium">
                            {{ repair.completed ? 'Completed' : 'In Progress' }}
                        </span>
                        <button @click="editRepair(repair)"
                            class="text-blue-500 hover:text-blue-800 text-md font-bold underline">
                            Edit Repair
                        </button>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h4 class="font-bold text-gray-400">Repair Date</h4>
                            <p>{{ formatDate(repair.repair_date) }}</p>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-400">Repair Type</h4>
                            <p>{{ repair.repair_needed }}</p>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-400">Requested By</h4>
                            <p>{{ repair.requested_by }}</p>
                        </div>
                        <div v-if="repair.repair_notes">
                            <h4 class="font-bold text-gray-400">Notes</h4>
                            <p>{{ repair.repair_notes }}</p>
                        </div>
                    </div>
                </div>
                <div v-if="detailStore.repairs.length > 3" class="text-center mt-6">
                    <button 
                        @click="viewAllRepairs"
                        class="px-6 py-2 bg-deep-green text-white rounded-sm hover:bg-emerald-900 font-semibold">
                        View All Repairs ({{ detailStore.repairs.length }})
                    </button>
                </div>
            </div>
            <div v-if="editingRepair" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                <div class="bg-white border-2 border-gray-300 p-6 rounded-lg max-w-md w-full mx-4">
                    <h3 class="text-lg font-bold mb-4">Edit Repair</h3>
                    <form @submit.prevent="saveRepairEdit">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Repair Date</label>
                                <input type="date" v-model="editForm.repair_date" required
                                    class="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Repair Type</label>
                                <input type="text" v-model="editForm.repair_needed" required
                                    class="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Requested By</label>
                                <input type="text" v-model="editForm.requested_by" required
                                    class="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Notes</label>
                                <input type="text" v-model="editForm.repair_notes"
                                    class="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Completion Status</label>
                                <select v-model="editForm.completed" required
                                    class="w-full p-2 border border-gray-300 rounded">
                                    <option :value="false">Not Completed</option>
                                    <option :value="true">Completed</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex justify-end gap-2 mt-6">
                            <button type="button" @click="cancelEdit"
                                class="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                                Cancel
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDetailStore } from '@/stores/detailStore'
import type { RepairInfo } from '@/stores/detailStore'

interface Props {
    instrumentId: string | number
}

const props = defineProps<Props>()
const detailStore = useDetailStore()
const router = useRouter()

const editingRepair = ref(false)
const editingRepairId = ref<number | null>(null)
const editForm = ref({
    repair_date: '',
    repair_needed: '',
    requested_by: '',
    repair_notes: '',
    completed: false
})

const recentRepairs = computed(() => {
    return detailStore.repairs.slice(0, 3)
})

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    date.setDate(date.getDate() + 1)
    return date.toLocaleDateString()
}

const editRepair = (repair: RepairInfo) => {
    editingRepair.value = true
    editingRepairId.value = repair.id ?? null
    editForm.value = {
        repair_date: repair.repair_date,
        repair_needed: repair.repair_needed,
        requested_by: repair.requested_by,
        repair_notes: repair.repair_notes || '',
        completed: Boolean(repair.completed)
    }
}

const saveRepairEdit = async () => {
    try {
        if (editingRepairId.value) {
            await detailStore.updateRepair(editingRepairId.value, editForm.value)
            editingRepair.value = false
            editingRepairId.value = null
        }
    } catch (error) {
        console.error('Error updating repair:', error)
        alert('Failed to update repair. Please try again.')
    }
}

const cancelEdit = () => {
    editingRepair.value = false
    editingRepairId.value = null
    editForm.value = {
        repair_date: '',
        repair_needed: '',
        requested_by: '',
        repair_notes: '',
        completed: false
    }
}

const viewAllRepairs = () => {
    router.push({ path: `/instruments/${props.instrumentId}/all-repairs` })
}
</script>

<style></style>
