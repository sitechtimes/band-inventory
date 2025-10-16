<template>
  <div class="p-6">
    <div class="flex justify-between items-center mt-2 mb-8">
      <h1 class="font-bold text-2xl">Instrument Listing</h1>
      <button @click="showFilterPopup = true"
        class="btn bg-deep-green hover:bg-emerald-900 text-white px-7 py-2 rounded-md flex items-center gap-2">
        Filter
      </button>
    </div>
    <div class="flex items-center gap-3 mb-3" v-if="selectedIds.length > 0">
      <span class="text-sm">{{ selectedIds.length }} selected</span>
      <button class="btn bg-red-400 btn-sm" @click="showDeleteConfirmation" :disabled="isDeleting">Delete</button>
    </div>
    <div class="overflow-x-auto">
      <table class="table text-center text-base">
        <thead>
          <tr class="bg-sky-blue">
            <th class="w-10"><input type="checkbox" :checked="allChecked" @change="toggleAll" /></th>
            <th>Category</th>
            <th>Section</th>
            <th>Serial Model</th>
            <th>Case Number</th>
            <th>Manufacturer</th>
            <th>SI Tech HS ID</th>
            <th>Assigned To</th>
            <th>Condition</th>
            <th>Year of Purchase</th>
            <th>Barcode</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="clickInstrument(instrument.id)" v-for="instrument in instrumentStore.showedInstruments"
            :key="instrument.id" class="cursor-pointer">
            <td><input type="checkbox" @click.stop :value="instrument.id" v-model="selectedIds" /></td>
            <td>{{ instrument.category }}</td>
            <td>{{ instrument.section }}</td>
            <td>{{ instrument.serial_model }}</td>
            <td>{{ instrument.case_number }}</td>
            <td>{{ instrument.manufacturer }}</td>
            <td>{{ instrument.siths_id }}</td>
            <td>
              <div v-for="(assignment, i) in instrument.assignments">
                <div v-if="instrument.assignments?.[i].open">
                  <div v-for="(assignment, index) in instrument.assignments">
                    {{ instrument.assignments?.[index]?.assigned_to }}
                  </div>
                </div>
              </div>
            </td>
            <td>{{ instrument.condition }}</td>
            <td>{{ instrument.year_purchased }}</td>
            <td>{{ instrument.barcode }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showFilterPopup"
      class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50" @click="closePopup">
      <div class="border-2 border-gray-200 bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        @click.stop>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Filter Instruments</h2>
          <button @click="showFilterPopup = false" class="text-gray-600 hover:text-gray-800 hover:cursor-pointer">
            Close
          </button>
        </div>
        <instrumentFilter @close="showFilterPopup = false" />
      </div>
    </div>
    <div v-if="showConfirmModal"
      class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete {{ selectedIds.length }} instrument{{ selectedIds.length > 1 ? 's' : '' }}?
          This action cannot be undone.
        </p>
        <div class="flex justify-end gap-3">
          <button @click="showConfirmModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Cancel
          </button>
          <button @click="confirmDelete"
            class="px-4 py-2 text-sm font-medium bg-red-400 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            :disabled="isDeleting">
            <span v-if="isDeleting">Deleting...</span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useInstrumentStore } from '@/stores/instrumentStore'
import router from "@/routes/index";
import instrumentFilter from './instrumentFilter.vue';

const instrumentStore = useInstrumentStore()
const errorMessage = ref("")
const selectedIds = ref<number[]>([])
const isDeleting = ref(false)
const showConfirmModal = ref(false)
const showFilterPopup = ref(false)

const closePopup = (event: Event) => {
  if (event.target === event.currentTarget) {
    showFilterPopup.value = false
  }
}

const getInstruments = async () => {
  try {
    instrumentStore.getInstruments();
  } catch (err) {
    const error = err as Error;
    errorMessage.value =
      error.message || "An error occurred while fetching instruments";
  }
};



onMounted(() => {
  getInstruments();
});

function clickInstrument(instrumentId: number) {
  router.push({ path: `/instruments/${instrumentId}/details` });
}

const allChecked = computed(() => {
  const list = instrumentStore.showedInstruments
  if (!list || list.length === 0) return false
  return list.every(i => selectedIds.value.includes(i.id))
})

const toggleAll = () => {
  const list = instrumentStore.showedInstruments
  if (!list || list.length === 0) return
  if (allChecked.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = list.map(i => i.id)
  }
}

const showDeleteConfirmation = () => {
  if (selectedIds.value.length === 0) return
  showConfirmModal.value = true
}

const confirmDelete = async () => {
  try {
    isDeleting.value = true
    await instrumentStore.deleteInstruments(selectedIds.value)
    selectedIds.value = []
    showConfirmModal.value = false
  } catch (e) {
    const err = e as Error
    errorMessage.value = err.message
  } finally {
    isDeleting.value = false
  }
}
</script>
