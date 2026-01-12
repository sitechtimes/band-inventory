<template>
  <div class="m-4">
    <a
      @click="$router.back()"
      class="text-emerald-600 font-bold hover:cursor-pointer hover:underline"
    >
      🡨 Back to Instrument details
    </a>
    <h2 class="font-bold text-2xl my-4">Add Repair</h2>
    <div class="shadow-sm rounded-sm gap-x-4">
      <div class="grid @max-md:grid-rows-2 md:grid-cols-2">
        <div class="flex flex-col m-2 md:ml-4">
          <label>Repair Date</label>
          <input
            type="date"
            class="input w-7/8 focus:border-green"
            v-model="repairData.repair_date"
            required
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label>Repair Needed</label>
          <input
            type="text"
            class="input w-7/8 focus:border-green"
            v-model="repairData.repair_needed"
            placeholder="What type of repair?"
            required
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label>Requested By</label>
          <input
            type="text"
            class="input w-7/8 focus:border-green"
            v-model="repairData.requested_by"
            placeholder="Who requested the repair?"
            required
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label>Repair Notes</label>
          <input
            type="text"
            class="input w-7/8 focus:border-green"
            v-model="repairData.repair_notes"
            placeholder="Description"
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label>Completion Status</label>
          <select
            v-model="repairData.completed"
            class="input w-7/8 focus:border-green"
            required
          >
            <option :value="false">Not Completed</option>
            <option :value="true">Completed</option>
          </select>
        </div>
      </div>
      <div>
        <button
          class="btn mx-2 md:ml-4 my-4 align-self-center bg-deep-green text-white"
          @click="addRepair"
        >
          Add Repair
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
import { reactive } from "vue";
import { useDetailStore } from "@/stores/detailStore";

const props = defineProps<{
  instrumentId: string | number;
}>();

const detailStore = useDetailStore();

const repairData = reactive({
  repair_date: "",
  repair_needed: "",
  requested_by: "",
  repair_notes: "",
  instrument_id: 0,
  completed: false,
});

const addRepair = async () => {
  try {
    repairData.instrument_id =
      typeof props.instrumentId === "string"
        ? parseInt(props.instrumentId)
        : props.instrumentId;

    await detailStore.addRepair(repairData);

    repairData.repair_date = "";
    repairData.repair_needed = "";
    repairData.requested_by = "";
    repairData.repair_notes = "";
    repairData.completed = false;

    window.history.back();
  } catch (error) {
    console.error("Error adding repair:", error);
    alert("Failed to add repair. Please try again.");
  }
};
</script>

<style></style>
