<template>
  <div>
    <div v-if="!detailStore.shownInstrument && !errorMessage">Loading...</div>
    <div v-if="errorMessage" class="text-red-600">{{ errorMessage }}</div>
    <div v-if="detailStore.shownInstrument" class="mx-6 mt-6">
      <RouterLink to="/home" class="text-emerald-600 font-bold">
        🡨 Back to Instruments</RouterLink
      >
      <h1 class="text-2xl font-bold mt-4">Instrument Details</h1>
      <div class="mt-12 border border-gray-300 p-4">
        <h2 class="text-3xl">{{ detailStore.shownInstrument.category }}</h2>
      </div>
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/3">
          <h3
            class="mt-2 italic border border-gray-300 border-b-0 p-2 bg-gray-50"
          >
            Details
          </h3>
          <div
            class="border border-gray-300 p-4 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div>
              <h4 class="font-bold text-gray-400">Section</h4>
              <p>{{ detailStore.shownInstrument.section }}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-400">Manufacturer</h4>
              <p>{{ detailStore.shownInstrument.manufacturer }}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-400">Location</h4>
              <p>{{ detailStore.shownInstrument.location }}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-400">Notes</h4>
              <p>{{ detailStore.shownInstrument.notes }}</p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 mt-4 md:mt-0">
          <h3
            class="mt-2 italic border border-gray-300 border-b-0 p-2 bg-gray-50 md:border-l-0"
          >
            Identifiers
          </h3>
          <div
            class="border border-gray-300 p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 md:border-l-0"
          >
            <div>
              <h4 class="font-bold text-gray-400">Serial Model</h4>
              <p>{{ detailStore.shownInstrument.serial_model }}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-400">Case Number</h4>
              <p>{{ detailStore.shownInstrument.case_number }}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-400">Barcode</h4>
              <p>{{ detailStore.shownInstrument.barcode }}</p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 mt-4 md:mt-0">
          <h3
            class="mt-2 italic border border-gray-300 border-b-0 p-2 bg-gray-50 md:border-l-0"
          >
            Value Details
          </h3>
          <div
            class="border border-gray-300 p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 md:border-l-0"
          >
            <div>
              <h4 class="font-bold text-gray-400">Year Purchased</h4>
              <p>{{ detailStore.shownInstrument.year_purchased }}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-400">Price</h4>
              <p>{{ detailStore.shownInstrument.price }}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-400">Condition</h4>
              <p>{{ detailStore.shownInstrument.condition }}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-400">Retired</h4>
              <p>{{ detailStore.shownInstrument.retired }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h1 class="text-2xl">Instrument Management</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDetailStore } from "@/stores/detailStore";

const route = useRoute();
const detailStore = useDetailStore();
const errorMessage = ref("");

const getDetails = async (id: number) => {
  try {
    await detailStore.getDetails(id);
    await detailStore.getRepairs(id);
    await detailStore.getAllAssignments(id);
  } catch (err) {
    const error = err as Error;
    errorMessage.value =
      error.message ||
      "An error occurred while fetching details about instrument";
  }
};

onMounted(() => {
  const { id } = route.params as { id: number };
  getDetails(id);
});
</script>
