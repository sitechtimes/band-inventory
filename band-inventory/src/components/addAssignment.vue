<template>
  <div class="m-4">
    <a
      @click="$router.back()"
      class="text-emerald-600 font-bold hover:cursor-pointer hover:underline"
    >
      🡨 Back to Instrument details</a
    >
    <h2 class="font-bold text-2xl my-4">Assign Instrument</h2>
    <div class="shadow-sm rounded-sm gap-x-4">
      <div class="grid @max-md:grid-rows-2 md:grid-cols-2">
        <div class="flex flex-col m-2 md:ml-4">
          <label>Assign to</label>
          <input
            type="text"
            class="input w-7/8 focus:border-green"
            v-model="assigned"
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label>Return Date (optional)</label>
          <input
            type="date"
            class="input w-7/8 focus:border-green"
            v-model="return_date"
          />
        </div>
      </div>
      <div>
        <button
          class="btn mx-2 md:ml-4 my-4 align-self-center bg-deep-green text-white"
          @click="updateAssigned"
        >
          Assign Instrument
        </button>
        <button
          class="btn bg-white border-none hover:shadow-none hover:underline"
          @click="$router.back()"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDetailStore } from "@/stores/detailStore";
import { storeToRefs } from "pinia";

const assigned: Ref<string> = ref("");
const return_date: Ref<Date | undefined> = ref(undefined);
const assigned_date = new Date();
const detailStore = useDetailStore();

const route = useRoute();
const router = useRouter();
const { id } = route.params as { id: number };

async function updateAssigned() {
  try {
    if (assigned.value !== "") {
      await detailStore.addAssignment(
        assigned.value,
        assigned_date,
        return_date.value,
        12345,
      );
      router.push({ path: `/instruments/${id}/details` });
    } else {
      alert("Please enter in an assignment.");
    }
  } catch (error) {
    alert(error);
  }
}
</script>

<style scoped></style>
