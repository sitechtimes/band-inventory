<template>
  <div class="p-6">
    <h1 class="font-bold my-8 text-xl">Instrument Listing</h1>
    <div class="flex items-center gap-3 mb-3" v-if="selectedIds.length > 0">
      <span class="text-sm">{{ selectedIds.length }} selected</span>
      <button class="btn btn-error btn-sm" @click="onDeleteSelected" :disabled="isDeleting">Delete</button>
    </div>
    <div class="overflow-x-auto">
      <table class="table text-center text-base">
        <thead>
          <tr class="bg-sky-50">
            <th class="w-10"><input type="checkbox" :checked="allChecked" @change="toggleAll" /></th>
            <th>Category</th>
            <th>Section</th>
            <th>Serial Model</th>
            <th>Case Number</th>
            <th>Manufacturer</th>
            <th>SI Tech HS ID</th>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useInstrumentStore } from '@/stores/instrumentStore'
import router from "@/routes/index";

const instrumentStore = useInstrumentStore()
const errorMessage = ref("")
const selectedIds = ref<number[]>([])
const isDeleting = ref(false)

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

const onDeleteSelected = async () => {
  if (selectedIds.value.length === 0) return
  try {
    isDeleting.value = true
    await instrumentStore.deleteInstruments(selectedIds.value)
    selectedIds.value = []
  } catch (e) {
    const err = e as Error
    errorMessage.value = err.message
  } finally {
    isDeleting.value = false
  }
}
</script>
