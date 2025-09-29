<template>
  <div class="p-4">
    <h1 class="font-bold my-8 text-xl">Instrument Listing</h1>
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
          <tr
            @click="clickInstrument(instrument.id)"
            v-for="instrument in instrumentStore.showedInstruments"
            :key="instrument.id"
            class="cursor-pointer"
          >
            <td>{{ instrument.category }}</td>
            <td>{{ instrument.section }}</td>
            <td>{{ instrument.serial_model }}</td>
            <td>{{ instrument.case_number }}</td>
            <td>{{ instrument.manufacturer }}</td>
            <td>{{ instrument.id }}</td>
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
import { ref, onMounted } from "vue";
import { useInstrumentStore } from "@/stores/instrumentStore";
import router from "@/routes/index";
import Index from "@/pages/index.vue";

const instrumentStore = useInstrumentStore();
const errorMessage = ref("");

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
</script>
