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
      v-for="assignment in instrument.assignments"
      class="bg-white border border-gray rounded-md flex flex-row space-x-4"
    >
      <p v-if="assignment.open"><b>Status</b> Open</p>
      <p v-else><b>Status</b> Closed</p>
      <p><b>Name</b> {{ assignment.assigned_to }}</p>
      <p><b>Assigned Date</b> {{ assignment.assigned_date }}</p>
      <p><b>Return Date</b> {{ assignment.return_date }}</p>
      <button v-if="!assignment.open" disabled class="btn">
        close assignment
      </button>
      <button
        v-else
        class="btn"
        onclick="openModalAlert.showModal()">
        close assignment
      </button>
      <dialog id="openModalAlert" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Hello!</h3>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn" @click="
            instrumentStore.closeAssignment(
            assignment.assigned_to,
            assignment.assigned_date,
            assignment.return_date,
            id,
          )
        ">Confirm</button>
            </form>
          </div>
        </div>
      </dialog>
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
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useInstrumentStore } from "@/stores/instrumentStore";
import { storeToRefs } from "pinia";
import { close } from "fs";

const instrumentStore = useInstrumentStore();
const instrument = storeToRefs(instrumentStore).idInstrument;
const route = useRoute();
const router = useRouter();
const { id } = route.params as { id: number };

function addAssignment() {
  router.push({ path: `/instruments/${id}/management/assignment` });
}
</script>

<style></style>
