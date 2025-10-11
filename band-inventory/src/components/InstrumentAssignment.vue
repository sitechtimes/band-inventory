<template>
  <div class="mx-8">
    <div class="p-6 flex justify-between mt-6 mr-4">
      <h2 class="text-xl font-bold">Assignments</h2>
      <button class="btn btn-md" @click="addAssignment">
        + Assign Instrument
      </button>
    </div>
    <div
      v-if="instrument?.assignments"
      v-for="(assignment, index) in instrument.assignments"
      class="bg-white border border-gray rounded-md flex flex-row space-x-8 grid grid-cols-8 p-4 md:grid-cols-0"
    >
      <p ref="i" class="place-self-center"> {{ index }} </p>
      <span v-if="assignment.open" class="badge flex flex-col place-self-center col-span-2 bg-green-600">Open</span>
      <span v-else class="badge flex flex-col place-self-center col-span-2 bg-orange-700">Closed</span>
      <div class="space-y-5 col-span-4 lg:flex lg:flex-row lg:space-x-4">
         <p class="flex flex-col self-center"><b>Name</b> {{ assignment.assigned_to }}</p>
        <p class="flex flex-col"><b>Assigned Date</b> {{ assignment.assigned_date }}</p>
        <p class="flex flex-col"><b>Return Date</b> {{ assignment.return_date }}</p>
      </div>
      <button v-if="!assignment.open" disabled class="btn flex-col col-start-7 col-span-2 lg:col-span-1 place-self-center">
        <img src="/trash-svgrepo-com.svg" class= "h-8"/>
      </button>
      <button
        v-else
        class="btn col-start-7 col-span-2 lg:col-span-1 place-self-center"
        onclick="closeAlert.showModal()"
        @click="chosenIndex(index)">
         <img src="/trash-svgrepo-com.svg" class= "h-8"/>
      </button>
    </div>
    
    <div
      v-else
      class="bg-sky-50 border-1 rounded-sm border-gray p-8 text-center space-y-2"
    >
      <p>No current assignments on this instrument</p>
      <p class="font-semibold">
        Adding assignments to your instruments will help you keep track of who
        has the instrument
      </p>
      <button
        class="btn btn-md bg-deep-green text-white"
        @click="addAssignment"
      >
        + Add an assignment
      </button>
    </div>
  </div>
<dialog id="closeAlert" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Are you sure you want to close this assignment?</h3>
    <p class="py-4 text-red-600">This action is cannot be reversed.</p>
    <div class="modal-action">
      <form method="dialog" class="space-x-4">
        <button class="btn">Go Back</button>
        <button type="button" class="btn" @click="confirmCloseAssignment">Confirm</button>
      </form>
    </div>
  </div>
</dialog>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useDetailStore } from "@/stores/detailStore";
import { useInstrumentStore } from "@/stores/instrumentStore";
import { storeToRefs } from "pinia";
import { close } from "fs";
import { ref } from "vue";

const detailStore = useDetailStore();
const instrumentStore = useInstrumentStore()
const instrument = storeToRefs(detailStore).shownInstrument;
const route = useRoute();
const router = useRouter();
const i = ref()

const { id } = route.params as { id: number };

function chosenIndex(index: number) {
  i.value = index;
}

function addAssignment() {
  router.push({ path: `/instruments/${id}/management/assignment` });
}

async function confirmCloseAssignment() {
  if (instrument.value && i.value !== undefined) {
    await detailStore.closeAssignment(
      instrument.value.assignments[i.value].assigned_to,
      instrument.value.assignments[i.value].assigned_date,
      instrument.value.assignments[i.value].return_date,
      id
    );
    const modal = document.getElementById('closeAlert') as HTMLDialogElement;
    modal?.close();
  }
}
</script>

<style></style>
